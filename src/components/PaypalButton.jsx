// import "./App.css";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const paypalScriptOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
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

    const paypalbuttonTransactionProps = {
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
            return actions.order.capture({}).then((details) => {
                alert(
                    "Transaction completed by " +
                    (details?.payer?.name?.given_name ?? "No details")
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
