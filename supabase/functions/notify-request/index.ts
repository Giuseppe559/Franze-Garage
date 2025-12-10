import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
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
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
  }

  type ContactData = {
    name?: string;
    phone?: string;
    email?: string;
    car_interest?: string;
    message?: string;
    request_type?: string;
  };
  type ContactPayload = { formData?: ContactData } & ContactData;
  const body = (payload as ContactPayload) ?? {};
  const form: ContactData = body.formData ?? body ?? {};
  const s = (v: unknown) => (typeof v === "string" && v.length ? v : "-");
  const text = `Nuova richiesta\nNome: ${s(form.name)}\nTelefono: ${s(form.phone)}\nEmail: ${s(form.email)}\nAuto: ${s(form.car_interest)}\nTipo: ${s(form.request_type)}\nMessaggio: ${s(form.message)}`;
  const subject = "Nuova richiesta Franzè Garage";

  let emailSent = false;
  let whatsappSent = false;
  const results: Record<string, unknown> = {};

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const resendFrom = Deno.env.get("RESEND_FROM");
  const adminEmail = Deno.env.get("ADMIN_EMAIL");
  if (resendKey && resendFrom && adminEmail) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: resendFrom, to: adminEmail, subject, text }),
      });
      const data = await r.json();
      results.email = data;
      emailSent = r.ok;
    } catch (e) {
      results.emailError = String(e);
    }
  }

  const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twilioToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const whatsappFrom = Deno.env.get("TWILIO_WHATSAPP_FROM");
  const whatsappTo = Deno.env.get("ADMIN_WHATSAPP_TO");
  if (twilioSid && twilioToken && whatsappFrom && whatsappTo) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const body = new URLSearchParams({
        From: `whatsapp:${whatsappFrom}`,
        To: `whatsapp:${whatsappTo}`,
        Body: text,
      });
      const r = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${twilioSid}:${twilioToken}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      const data = await r.json();
      results.whatsapp = data;
      whatsappSent = r.ok;
    } catch (e) {
      results.whatsappError = String(e);
    }
  }

  return new Response(
    JSON.stringify({ emailSent, whatsappSent, results }),
    { status: 200, headers },
  );
});
