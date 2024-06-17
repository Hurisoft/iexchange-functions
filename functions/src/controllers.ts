import { Response, Request } from "express";
import { AppErrors } from "./error";
import { ConfigStore } from "./store";

export const config = async (req: Request, res: Response) => {
  try {
    const config = await ConfigStore.config();

    if (config) {
      res.status(200).send(config);
    } else {
      res.status(500).send(AppErrors.serverError);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const offers = async (req: Request, res: Response) => {
  try {
    res.status(200).send([]);
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const offer = async (req: Request, res: Response) => {
  try {
    const { offerId } = req.params;
    res.status(200).send({ offerId });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const createOffer = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const orders = async (req: Request, res: Response) => {
  try {
    res.status(200).send([]);
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const order = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    res.status(200).send({ orderId });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    res.status(200).send({  });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const appeals = async (req: Request, res: Response) => {
  try {
    res.status(200).send([]);
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const appeal = async (req: Request, res: Response) => {
  try {
    const { appealId } = req.params;
    res.status(200).send({ appealId });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const createAppeal = async (req: Request, res: Response) => {
  try {
    res.status(200).send({  });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};
