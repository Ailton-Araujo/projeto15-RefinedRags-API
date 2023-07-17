import db from "../database/database.connection.js";

export async function postPurchase(req, res) {
  const { user } = res.locals;
  const { addressInfo, productInfo } = req.body;
  try {
    const purchase = db
      .collection("purchases")
      .insertOne({ userId: user.userId, productInfo });
    const address = db
      .collection("addresses")
      .insertOne({ userId: user.userId, addressInfo });

    await purchase;
    await address;

    productInfo.forEach(async (element) => {
      const { id, size, quantity } = element;
      const parameter = `inventory.${size}`;
      try {
        await db
          .collection("products")
          .updateOne(
            { productId: Number(id) },
            { $inc: { [parameter]: -quantity } }
          );
      } catch (error) {
        return res.status(500).send(error.message);
      }
    });

    return res.status(201).send("Purchase Complete");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function postCart(req, res) {}

export async function getCart(req, res) {}
