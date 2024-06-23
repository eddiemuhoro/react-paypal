// import "./App.css";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
  } from "@paypal/react-paypal-js";
  import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
  import { PayPalButtonsComponent } from "@paypal/paypal-js/types/components/buttons";
  
  const paypalScriptOptions: PayPalScriptOptions = {
    "clientId":
    import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD"
  };
  function Button() {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps: PayPalButtonsComponent = {
      style: { layout: "vertical" },
      createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "0.01"
              }
            }
          ]
        });
      },
      onApprove(data, actions) {
        /**
         * data: {
         *   orderID: string;
         *   payerID: string;
         *   paymentID: string | null;
         *   billingToken: string | null;
         *   facilitatorAccesstoken: string;
         * }
         */
        return actions.order.capture({}).then((details) => {
          alert(
            "Transaction completed by" +
              (details?.payer.name.given_name ?? "No details")
          );
  
          alert("Data details: " + JSON.stringify(data, null, 2));
        });
      }
    };
    return (
      <>
        {isPending ? <h2>Load Smart Payment Button...</h2> : null}
        <PayPalButtons {...paypalbuttonTransactionProps} />
      </>
    );
  }
  export default function PaypalComponent() {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <section className="w-3/4 md:w-1/2 p-2 bg-slate-100">
        <PayPalScriptProvider options={paypalScriptOptions}>
          <Button />
        </PayPalScriptProvider>
        </section>
      </div>
    );
  }
  