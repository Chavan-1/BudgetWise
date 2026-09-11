import { ErrorMessage, Field } from "formik";

export function StepTwo() {

    return (

        <div>

            <div>

                <label htmlFor="paymentMethod">Payment Method</label>

                <Field id="paymentMethod" name="paymentMethod" as="select">

                    <option value="">Select Method</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>

                </Field>

                <ErrorMessage name="paymentMethod" component="p" className="field-error" />

            </div>

            <div>

                <label htmlFor="notes">Notes</label>
                
                <Field id="notes" name="notes" as="textarea" rows="3" />
                
                <ErrorMessage name="notes" component="p" className="field-error" />
            </div>

            <div>

                <label htmlFor="recurring">
                    <Field id="recurring" name="recurring" type="checkbox" /> Recurring expense
                </label>

            </div>

        </div>

    );

}

export default StepTwo;