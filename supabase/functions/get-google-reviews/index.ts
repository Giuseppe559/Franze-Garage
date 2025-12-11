import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

type ReviewOut = {
  name: string;
  rating: number;
  text: string;
  date: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("", { status: 200, headers });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }

  let payload: unknown = null;
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  const body = (payload as { placeId?: string }) ?? {};

  const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
  const envPlaceId = Deno.env.get("GOOGLE_PLACE_ID");
  const placeId = body.placeId || envPlaceId;

  if (!apiKey || !placeId) {
    return new Response(
      JSON.stringify({
        error: "Missing configuration",
        hint: "Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in Supabase Edge function environment",
      }),
      { status: 500, headers },
    );
  }

  try {
    const fields = [
      "name",
      "rating",
      "user_ratings_total",
      "reviews",
    ].join(",");
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&reviews_no_translations=true&reviews_sort=newest&key=${apiKey}`;
    const resp = await fetch(url);
    const json = await resp.json();

    if (!resp.ok || json.status && json.status !== "OK") {
      return new Response(JSON.stringify({ error: "Google API error", details: json }), { status: 500, headers });
    }

    const result = json.result ?? {};
    const reviewsRaw: Array<{ author_name?: string; rating?: number; text?: string; time?: number; relative_time_description?: string; }> = result.reviews ?? [];

    const reviews: ReviewOut[] = reviewsRaw.slice(0, 6).map((r) => {
      const dateStr = r.relative_time_description
        ? r.relative_time_description
        : (r.time ? new Date(r.time * 1000).toLocaleDateString("it-IT", { year: "numeric", month: "long" }) : "");
      return {
        name: String(r.author_name || ""),
        rating: Number(r.rating || 0),
        text: String(r.text || ""),
        date: dateStr,
      };
    }).filter((r) => r.text.length > 0);

    return new Response(
      JSON.stringify({
        place: {
          name: String(result.name || ""),
          rating: Number(result.rating || 0),
          total: Number(result.user_ratings_total || 0),
        },
        reviews,
      }),
      { status: 200, headers },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unexpected error", details: String(e) }), { status: 500, headers });
  }
});

