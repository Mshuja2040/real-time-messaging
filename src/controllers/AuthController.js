import AuthService from "../services/AuthService.js";

class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Input validation
      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "Username or email already exists" });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      const { accessToken, refreshToken } = await AuthService.login(req.body);

      res.status(200).json({
        message: "Login successful!",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
      }

      const newAccessToken = await AuthService.refreshToken(refreshToken);
      res.status(200).json({ accessToken: newAccessToken.accessToken });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default AuthController;
