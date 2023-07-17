import db from "../database/database.connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function signup(req, res) {
  const { fullName, email, password, subscription } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    const resp = await db.collection("users").findOne({ email: email });
    if (resp) return res.status(409).send("Email already registered");
    await db.collection("users").insertOne({
      name: fullName,
      email: email,
      password: hash,
      subscription,
    });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal server error");
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email: email });
    if (!user) return res.status(404).send("Email not registered");
    const correctPassword = bcrypt.compareSync(password, user.password);
    if (!correctPassword) return res.status(401).send("Invalid password");
    await db.collection("sessions").deleteMany({ userId: user._id });
    const session = await db
      .collection("sessions")
      .insertOne({ userId: user._id });
    delete user.password;
    const token = jwt.sign(
      { sessionId: session.insertedId },
      process.env.JWT_SECRET
    );
    res.status(200).send(token);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal server error");
  }
}

export async function getUser(req, res) {
  const { user } = res.locals;
  try {
    const data = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user.userId) });
    delete data._id;
    delete data.password;
    delete data.subscription;
    res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
