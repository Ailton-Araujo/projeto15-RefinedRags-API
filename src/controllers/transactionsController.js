import db from "../database/database.connection.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function postPurchase(req, res) {
  const { user } = res.locals;
  const { buyerInfo, addressInfo, productInfo } = req.body;
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

    const msg = {
      to: buyerInfo,
      from: "refined_rags@outlook.com",
      subject: "Confirmation of Purchase",
      text: "Thank you for supporting my online store! Purchases both big and small help us keep our dream of providing the best quality products to our customers.",
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }

    return res.status(201).send("Purchase Complete");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function postCart(req, res) {}

export async function getCart(req, res) {}
