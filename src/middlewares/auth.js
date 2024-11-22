import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token presence
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token expiration or invalid token
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Token has expired" });
    }
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
