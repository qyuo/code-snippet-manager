const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function protectRoute(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authentication required. Please log in." });
  }

  const extractedToken = token.split(" ")[1];
  jwt.verify(extractedToken, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token. Please log in." });
    }
    req.user = decodedToken;
    next();
  });
}

module.exports = protectRoute;
