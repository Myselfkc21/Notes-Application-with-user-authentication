import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.get("Authorization"); // Use req.get() for case-insensitivity
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // No token provided
  }

  jwt.verify(token, "8YHXrMwQIMHgYzFeT7ttyqNksgzlBiqA", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token verification failed
    }
    req.user = user;
    console.log(req.user);
    next(); // Proceed to the next middleware or route handler
  });
}

export default authenticateToken;
