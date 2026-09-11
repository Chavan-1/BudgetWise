export function ReviewStep({ formik }) {

    const { values } = formik;

    return (

        <div>
            <p><strong>Amount:</strong> {values.amount}</p>
            <p><strong>Category:</strong> {values.category}</p>
            <p><strong>Date:</strong> {values.date}</p>
            <p><strong>Payment Method:</strong> {values.paymentMethod}</p>
            <p><strong>Notes:</strong> {values.notes || "-"}</p>
            <p><strong>Recurring:</strong> {values.recurring ? "Yes" : "No"}</p>
        </div>

    );

}; 