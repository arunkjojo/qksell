import { PaymentStatusResponse } from "@common/types";
import Swal from 'sweetalert2';

export function displayStatus(statusResponse: PaymentStatusResponse, redirectUrl: string): void {
    const data = statusResponse.data;

    if (
        data &&
        data.merchantTransactionId &&
        data.transactionId &&
        data.paymentInstrument?.utr &&
        redirectUrl
    ) {
        Swal.fire({
            title: `<span style='font-weight: bold; color: red;'>${statusResponse.code.replace(/[^a-zA-Z0-9 ]/g, ' ')}</span>`,
            html: `<div>
            <b>${statusResponse.message}</b>
            <hr />
            <p>Payment Order Id: ${data.merchantTransactionId}</p>
            <p>Reference UTR Number: ${data.paymentInstrument.utr}</p>
          </div>`,
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            window.location.href = redirectUrl;
        });
    }
}
  