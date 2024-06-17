# Summary

This api supports the Optimistic p2p contract especially since not all info is stored on the smart contract.
It facilitates storing bulk of the date off-chain.

## APIs

```env
baseUrl=
```

[Postman collection](DexRamp.postman_collection.json)

### GET /config
- Returns config of the application

```typescript
type Config = {
  offerFee: string; // fee charged for creating an offer
  contractAddress: string; // p2p contract address
  paymentMethods: string[]; // list of supported payment methods
  tradeTokens: { address: string; symbol: string }[]; // list of supported trade tokens
  currencies: string[]; // list of supported currencies
};
```

### GET /offers
- Returns a list of offers available
- Takes the following url params for filtering

```json
{
  "token": "0x...",
  "currency": "GHS",
  "paymentMethod": "MTN",
  "rate": 12.5,
  "minOrder": 20,
  "maxOrder": 100,
  "active": true,
  "offerType": "buy"
}
```

```typescript
enum TradeType {
  buy,
  sell,
}
type Offer = {
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
  offerId: number;
};
type LightOffer = Omit<Offer, "accountName" | "accountNumber"> & {
  accountHash: string; // hash(accountName+accountNumber)
};
type offers = LightOffer[];
```

### GET /offer/:offerId
- Get detailed offer


### GET /orders
- Returns a list of orders available
- Takes the following url params for filtering

```json
{
  "trader": "0x...",
  "status": "pending",
  "orderType": "sell"
}
```

```typescript
enum OrderState {
  pending,
  accepted,
  paid,
  appealed,
  released,
  cancelled,
}
type Order = {
  orderId: number;
  offerId: number; // id of offer the order is referring to
  quantity: number; // quantity of tokens being ordered
  depositAddress: string; // address tokens should be deposited to 0 address in case of sell
  trader: string; // address of trader
  orderType: TradeType;
  appeal: number; // appeal id if there is any, otherwise 0
  accountName: string;
  accountNumber: string;
};
type LightOrder = Omit<Order, "accountName" | "accountNumber"> & {
  accountHash: string; // hash(accountName+accountNumber)
};
type orders = LightOrder[];
```

### GET /orders/:orderId
- Get detailed order


### GET /appeals
- Returns a list of appeals available
- - Takes the following url params for filtering

```json
{
  "appealDecision": "unvoted"
}
```

```typescript
enum AppealDecision {
  release,
  cancel,
  unvoted,
}
type AppealVote = {
  settler: string;
  settlerVote: AppealDecision; //
  settled: boolean;
  merchantVote: AppealDecision;
  traderVote: AppealDecision;
};
type Appeal = {
  appealId: number;
  orderId: number; // id of offer being appealed
  reason: string; // short explanation of why
  votes: AppealVote[];
  appealer: string; // address of the apealing party
  daoVote: AppealDecision; // vote of the dao if necessary
  appealDecision: AppealDecision; // final decision of the appeal
};

type LightAppeal = Omit<Appeal, "votes">;

type appeals = LightAppeal[];
```

### GET /appeals/:appealId
- Get detailed appeal


### POST /order
- Create an order
- Takes CreateOrder as body

```typescript
type CreateOrder = Omit<Order, "orderId">;
```
- returns OrderIntent

```typescript
type OrderIntent = Omit<LightOrder, "orderId">
```
- Order is not recorded in DB until verified to be created on the smart contract.
- Client must submit OrderIntent to smart contract to create the order.


### POST /offer
- Create an offer
- Takes CreateOffer as body

```typescript
type CreateOffer = Omit<Offer, "offerId">;
```
- returns OfferIntent

```typescript
type OfferIntent = Omit<LightOffer, "offerId">
```
- Offer is not recorded in DB until verified to be created on the smart contract.
- Client must submit OfferIntent to smart contract to create the offer.


### POST /appeal
- Create an appeal
- Takes CreateAppeal as body

```typescript
type CreateAppeal = Omit<Appeal, "appealId">;
```
- returns AppealIntent

```typescript
type AppealIntent = Omit<LightAppeal, "appealId">
```
- Appeal is not recorded in DB until verified to be created on the smart contract.
- Client must submit AppealIntent to smart contract to create the appeal.