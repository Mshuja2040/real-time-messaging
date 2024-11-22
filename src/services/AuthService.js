import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";

class AuthService {
  static async register(userData) {
    const { username, email, password } = userData;

    // Password strength validation
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  static async login({ username, password }) {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("Invalid username or password");
  
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) throw new Error("Invalid username or password");
  
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  
    return { accessToken, refreshToken };
  }
  

  static async refreshToken(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const newAccessToken = jwt.sign(
        { id: payload.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}

export default AuthService;
