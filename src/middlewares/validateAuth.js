import db from "../database/database.connection.js";

export default async function validateAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = user;
  } catch (err) {
    res.sendStatus(401);
  }
  next();
}
