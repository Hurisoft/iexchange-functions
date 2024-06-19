import { Response, Request } from "express";
import { AppErrors } from "./error";
import { AccountDetails } from "../commons/types";
import { AccountStore } from "./store";

export const storeAccountDetails = async (req: Request, res: Response) => {
  try {
    const account: AccountDetails = req.body as AccountDetails;
    const accountHash = await AccountStore.storeAccount(account);
    res.status(200).send({ accountHash });
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const getAddressAccounts = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const accounts = await AccountStore.getAddressAccounts(address);
    res.status(200).send(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};

export const getHashAccount = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const account = await AccountStore.getHashAccount(hash);
    res.status(200).send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send(AppErrors.serverError);
  }
};
