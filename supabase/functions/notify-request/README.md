# Guida configurazione notify-request

Questa funzione invia automaticamente una notifica via email (Resend) e WhatsApp (Twilio) quando un utente compila il modulo contatti.

## Prerequisiti
- Supabase CLI installata
- Progetto Supabase collegato
- Chiavi/credenziali per Resend e Twilio

## Variabili ambiente da impostare
- `RESEND_API_KEY`: chiave API Resend
- `RESEND_FROM`: mittente email (es. `noreply@tuodominio.com` oppure `franzegarage@gmail.com`)
- `ADMIN_EMAIL`: email destinatario (es. `franzegarage@gmail.com`)
- `TWILIO_ACCOUNT_SID`: SID account Twilio
- `TWILIO_AUTH_TOKEN`: Auth token Twilio
- `TWILIO_WHATSAPP_FROM`: numero WhatsApp Twilio (formato internazionale), es. `+14155238886` per sandbox
- `ADMIN_WHATSAPP_TO`: tuo numero WhatsApp (formato internazionale), es. `+393295531339`

Nota: la funzione aggiunge automaticamente il prefisso `whatsapp:` quando invia il messaggio.

## Impostazione secrets (CLI)
Esegui questi comandi nella root del progetto:

```
supabase secrets set RESEND_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
supabase secrets set RESEND_FROM=franzegarage@gmail.com
supabase secrets set ADMIN_EMAIL=franzegarage@gmail.com

supabase secrets set TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
supabase secrets set TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
supabase secrets set TWILIO_WHATSAPP_FROM=+14155238886
supabase secrets set ADMIN_WHATSAPP_TO=+393295531339
```

## Deploy funzione
```
supabase functions deploy notify-request
```

## Test rapido
Puoi testare la funzione con:
```
supabase functions invoke notify-request --data '{"formData":{"name":"Mario","phone":"+39 333 1112223","email":"mario@example.com","car_interest":"BMW 320d 2019","message":"Info","request_type":"info"}}'
```

Risposta attesa:
```
{"emailSent":true,"whatsappSent":true,"results":{...}}
```
Se uno dei due canali non è configurato correttamente, vedrai `false` per quel canale.

## Configurazione frontend
Assicurati di impostare:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Il frontend invoca automaticamente `notify-request`; se fallisce, apre WhatsApp ed email precompilati come fallback.

## Note Twilio Sandbox
- Per usare il numero sandbox `+14155238886`, segui le istruzioni Twilio per verificare il tuo numero e inviare il messaggio al canale WhatsApp.
- In produzione, usa un numero WhatsApp Business abilitato da Twilio.

## Deliverability email
- Resend funziona meglio con domini verificati. Se usi un indirizzo Gmail come mittente, le email potrebbero finire nello spam. Consigliato: configurare un dominio email dedicato e verificato su Resend.

