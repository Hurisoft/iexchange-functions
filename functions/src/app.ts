import * as express from "express";
import {rateLimit} from "express-rate-limit";
import { appeal, appeals, config, createAppeal, createOffer, createOrder, offer, offers, order, orders } from "./controllers";
import * as cors from "cors";
import { AppErrors } from "./error";

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(cors());

app.use(async (req, res, next) => {
  try {
    const authToken: string | undefined = req.headers['x-signature'] as string;
    console.log(authToken);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
});

app.get("", (_req, res) => res.send("DexRamp Systems Online"));
app.get("/config", config);
app.get("/offers", offers);
app.get("/offers/:offerId", offer);
app.get("/orders", orders);
app.get("/orders/:orderId", order);
app.get("/appeals", appeals);
app.get("/appeals/:appealId", appeal);
app.post("/order", createOrder);
app.post("/offer", createOffer);
app.post("/appeal", createAppeal);

export default app;
