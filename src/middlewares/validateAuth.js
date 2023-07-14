import { ObjectId } from "mongodb";
import db from "../database/database.connection.js";

export default async function validateAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.collection("sessions").findOne({ _id: new ObjectId(session.sessionId) });
    if (!user) return res.sendStatus(401);
    delete user.password;
    res.locals.user = user;
  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
}
