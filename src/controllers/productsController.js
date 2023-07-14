import db from "../database/database.connection.js";

export async function getProducts(req, res) {
    try {
        const products = await db.collection("products").find().toArray();
        return res.send(products);
    } catch(error) {
        return res.status(500).send(error.message);
    }
}