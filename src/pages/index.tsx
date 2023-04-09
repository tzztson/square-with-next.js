// import styles from '../styles/Home.module.css'
// import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <PaymentForm
//         applicationId="sandbox-sq0idb-PMvdHBKEW8Td8_tKADJRLA"
//         cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
//           const response = await fetch("/api/payment", {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json",
//             },
//             body: JSON.stringify({
//               sourceId: token.token,
//             }),
//           });
//           console.log(await response.json());
//         }}
//         locationId="LJVXG7MNF72R7"
//       >
//         <CreditCard buttonProps={{
//           css: {
//             backgroundColor: "#4caf50",
//             fontSize: "14px",
//             color: "#fff",
//             "&:hover": {
//               backgroundColor: "#4caf50",
//             },
//           },
//         }} />
//       </PaymentForm>
//     </div>
//   )
// }

// import React, { useState } from 'react';
// import { SquarePaymentForm, createPayment } from 'react-square-payment-form';

// const APPLICATION_ID = '<your-application-id>';
// const LOCATION_ID = '<your-location-id>';
// const ACCESS_TOKEN = '<your-sandbox-access-token>';

// const SquarePayment = () => {
//   const [amount, setAmount] = useState('');
//   const [cardNonce, setCardNonce] = useState(null);
//   const [errorMessages, setErrorMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const onAmountChange = (event) => {
//     setAmount(event.target.value);
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     const { cardNonce: nonce, errorMessages: errors } = await createPayment({
//       applicationId: APPLICATION_ID,
//       locationId: LOCATION_ID,
//       accessToken: ACCESS_TOKEN,
//       amount,
//     });
//     if (errors.length > 0) {
//       setErrorMessages(errors);
//       setIsLoading(false);
//     } else {
//       setCardNonce(nonce);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <label>
//           Amount:
//           <input type="number" value={amount} onChange={onAmountChange} />
//         </label>
//         <button type="submit" disabled={isLoading}>
//           Submit
//         </button>
//       </form>
//       {cardNonce && (
//         <div>
//           Payment successful! Card nonce: {cardNonce}
//         </div>
//       )}
//       {errorMessages.length > 0 && (
//         <div>
//           {errorMessages.map((errorMessage) => (
//             <div key={errorMessage}>{errorMessage}</div>
//           ))}
//         </div>
//       )}
//       <SquarePaymentForm
//         applicationId={APPLICATION_ID}
//         locationId={LOCATION_ID}
//         accessToken={ACCESS_TOKEN}
//         cardNonceResponseReceived={(cardNonce) => {
//           setCardNonce(cardNonce);
//         }}
//       />
//     </div>
//   );
// };

// export default SquarePayment;

import * as React from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

const MyPaymentForm = () => (
  <PaymentForm
    /**
     * Identifies the calling form with a verified application ID generated from
     * the Square Application Dashboard.
     */
    applicationId="sq0idp-sxBSrauDP20vdRc-8dIZLQ"
    /**
     * Invoked when payment form receives the result of a tokenize generation
     * request. The result will be a valid credit card or wallet token, or an error.
     */
    cardTokenizeResponseReceived={(token, buyer) => {
      console.info({ token, buyer });
    }}
    /**
     * This function enable the Strong Customer Authentication (SCA) flow
     *
     * We strongly recommend use this function to verify the buyer and reduce
     * the chance of fraudulent transactions.
     */
    createVerificationDetails={() => ({
      amount: '1.00',
      /* collected from the buyer */
      billingContact: {
        addressLines: ['123 Main Street', 'Apartment 1'],
        familyName: 'Doe',
        givenName: 'John',
        countryCode: 'GB',
        city: 'London',
      },
      currencyCode: 'GBP',
      intent: 'CHARGE',
    })}
    /**
     * Identifies the location of the merchant that is taking the payment.
     * Obtained from the Square Application Dashboard - Locations tab.
     */
    locationId="L2TW24NAV6J6Q"
  >
    <CreditCard />
  </PaymentForm>
);

export default MyPaymentForm;