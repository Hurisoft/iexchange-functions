import { Response, Request } from "express";
import { AppErrors } from "./error";


export const storeAccountDetails = async (req: Request, res: Response) => {
  try {
    res.status(200).send([]);
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

