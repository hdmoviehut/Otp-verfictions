import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") 
    return res.status(405).json({ message: "Method Not Allowed" });

  const { phone } = req.body;

  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
  );

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP temporarily (Vercel: 1 request = new instance → use DB for production)
  global.otpStore = global.otpStore || {};
  global.otpStore[phone] = otp;

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_NUMBER,
      to: phone
    });

    res.json({ success: true, message: "OTP sent!" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}
