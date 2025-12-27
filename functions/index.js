const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success!" });
});

app.post("/payment/create", async (req, res) => {
  // 1. Convert to integer (ParseInt)
  const total = parseInt(req.query.total);

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Stripe needs an integer
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      // 2. Log and handle Stripe errors
      logger.error("Stripe Error:", error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

// Set global options BEFORE exporting the API
setGlobalOptions({ maxInstances: 10 });
exports.api = onRequest(app);
