# Reminder — SMS OTP Delivery (TODO)

## What to do later
Enable real SMS so the phone-number OTP is actually texted to the user
(instead of demo mode where the OTP is shown in the UI / server console).

## Steps
1. Pick a provider and get an API key:
   - **Twilio** (already supported, no code change):
     - Sign up at https://www.twilio.com/try-twilio
     - Copy **Account SID** and **Auth Token** from the dashboard
     - Buy a phone number (Phone Numbers -> Buy a Number)
   - **Fast2SMS** (free, +91): https://www.fast2sms.com -> Dev/API -> Generate API Key
   - **MSG91** (free trial, +91): https://msg91.com -> copy Auth Key
2. Fill in `server/.env`:
   ```
   SMS_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_FROM=+15017122661
   ```
   (For Fast2SMS/MSG91, code changes in `server/src/services/sms.service.ts` are needed too.)
3. Restart the server: `npm run dev --workspace server`
4. Test: register a new account -> verify the mobile number -> OTP should arrive by SMS.

## Notes
- Twilio trial accounts only send SMS to phone numbers verified in the Twilio console.
- Current code assumes Indian (+91) numbers and a 10-digit format.
- The flow is already implemented end-to-end; this is only about the delivery provider.
