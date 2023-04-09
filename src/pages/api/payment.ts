import { Client } from "square";
import { randomUUID } from 'crypto';

const { paymentsApi } = new Client({
  accessToken: process.env.SANDBOX_TOKEN,
  environment: "sandbox" as any,
});


export default async function handler(req:any, res:any) {
  if ( req.method === 'POST' ) {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: 100 as any
      }
    })
    console.log(result);
    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}

