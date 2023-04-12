import styles from '../styles/Home.module.css'
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

export default function Home() {
  return (
    <div className={styles.container}>
      <PaymentForm
        applicationId=""
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              sourceId: token.token,
            }),
          });
          console.log(await response.json());
        }}
        locationId=''
      >
        <CreditCard />
      </PaymentForm>
    </div>
  )
}