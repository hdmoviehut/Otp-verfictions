export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { phone, otp } = req.body;

  global.otpStore = global.otpStore || {};

  if (global.otpStore[phone] === otp) {
    delete global.otpStore[phone];
    return res.json({ success: true, message: "OTP Verified!" });
  }

  res.json({ success: false, message: "Invalid OTP" });
}
