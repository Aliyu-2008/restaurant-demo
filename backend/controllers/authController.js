const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/otpSender');

const register = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, phone, passwordHash });

    const otp = generateOTP();
    sendOTP(phone, otp);

    // Store OTP in memory for demo purposes (in production use Redis or DB)
    user.otp = otp;
    await user.save();

    res.status(201).json({ message: 'User registered, OTP sent', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp === otp) {
      user.verified = true;
      user.otp = null;
      await user.save();
      return res.json({ message: 'User verified' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, verifyOTP };