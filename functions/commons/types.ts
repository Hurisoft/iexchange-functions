export enum CollectionNames {
  Reward = "Order",
  Config = "Config",
  Offer = "Offer",
  Lock = "Lock",
  Token = "Token",
}

enum KYCLevel {
  level0,
  level1,
  level2,
  level3,
}

export type MegaLedger = Map<string, Map<string, number>>; // the address -> address -> amount
export type TokenSymbol = Map<string, string>; // key is symbol of token and value is address of token, native tokens have 0 address
export type Merchant = {
  kycLevel: KYCLevel;
  reputation: number;
};
export type MerchantStake = MegaLedger; // value staked per token
export type MerchantOrders = MegaLedger; // value of orders in progress per token

export type Trader = {
  hasKYC: boolean;
  reputation: number;
};

export type Settler = {
  kycLevel: KYCLevel;
  reputation: number;
};
export type SettlerStake = MegaLedger; // value staked per token
export type SettlerSettlements = MegaLedger; // value of settlements in progress per token

export enum TradeType {
  buy,
  sell,
}

export type PaymentMethod = string;

export type Offer = {
  rate: number; // currency rate of token
  token: string; // symbol
  minOrder: number; // minimum order that trader can place
  maxOrder: number; // maximum order that trader can place
  currency: string; // symbol of currency that merchant can settle, only one currency for now
  paymentMethod: PaymentMethod;
  depositAddress: string; // address tokens should be deposited to 0 address in case of sell
  accountName: string;
  accountNumber: string;
  merchant: string; // address of merchant
  offerType: TradeType;
};

export type LightOffer = Omit<Offer, "accountName" | "accountNumber"> & {
  accountHash: string; // hash(accountName+accountNumber)
};

export enum OrderState {
  pending,
  accepted,
  paid,
  appealed,
  released,
  cancelled,
}

export type Order = {
  offer: number; // id of offer the order is referring to
  quantity: number; // quantity of tokens being ordered
  depositAddress: string; // address tokens should be deposited to 0 address in case of sell
  trader: string; // address of trader
  orderType: TradeType;
  appeal: number; // appeal id if there is any, otherwise 0
};

export type PaymentDetails = {
  paymentMethod: PaymentMethod;
  accountName: string;
  accountNumber: string;
  currency: string; // symbol of currency that merchant can settle, only one currency for now
};

export type Appeal = {
  orderid: number; // id of offer being appealed
  reason: string; // short explanation of why
  votes: AppealVote[];
  appealer: string; // address of the apealing party
};

export enum AppealDecision {
  release,
  cancel,
  unvoted,
}

export type AppealVote = {
  settler: string;
  settlerVote: AppealDecision; //
  settled: boolean;
  merchantVote: AppealDecision;
  traderVote: AppealDecision;
};

export type AppConfig = {
  offerFee: string; // fee charged for creating an offer
  contractAddress: string; // p2p contract address
  paymentMethods: string[]; // list of supported payment methods
  tradeTokens: { address: string; symbol: string }[]; // list of supported trade tokens
  currencies: string[]; // list of supported currencies
};