import db from "../database/database.connection.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export async function signup(req, res){
    const {fullName, email, password, subscription} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    try{
        const resp = await db.collection('users').findOne({email: email});
        if(resp)
            return res.status(409).send("Email already registered");
        await db.collection('users').insertOne({
            name: fullName,
            email: email,
            password: hash,
            subscription
        });
        return res.sendStatus(201);
    }catch(err){
        console.log(err.message);
        return res.status(500).send("Internal server error");
    }  
};

export async function signin(req, res){
    const {email, password} = req.body;
    try{
        const user = await db.collection('users').findOne({email: email});
        if(!user)
            return res.status(404).send("Email not registered");
        const correctPassword = bcrypt.compareSync(password, user.password);
        if(!correctPassword)
            return res.status(401).send("Invalid password");
        await db.collection("sessions").deleteMany({userId: user._id});
        const token = uuid();
        await db.collection('sessions').insertOne({token, userId: user._id});
        res.status(200).send({token, name: user.name});
    }catch(err){
        console.log(err.message);
        return res.status(500).send("Internal server error");
    }
};