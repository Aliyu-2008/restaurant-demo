const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

const sendOTP = (phone, otp) => {
  console.log(`Sending OTP ${otp} to phone ${phone}`);
  // In production, integrate SMS provider (Twilio, Africa’s Talking, etc.)
};

module.exports = { generateOTP, sendOTP };