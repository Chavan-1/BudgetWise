import { ErrorMessage, Field } from "formik";

export function StepOne({ categories }) {

    return (

        <div>
            
            <div>
                <label htmlFor="amount">Amount</label>
                
                <Field id="amount" name="amount" type="number" />
                
                <ErrorMessage name="amount" component="p" className="field-error" />
            </div>
           
            <div>
                
                <label htmlFor="category">Category</label>
                
                <Field id="category" name="category" as="select">
                
                    <option value="">Select a category</option>
                
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                
                </Field>

                <ErrorMessage name="category" component="p" className="field-error" />
            
            </div>

            <div>
                <label htmlFor="date">Date</label>
                
                <Field id="date" name="date" type="date" />
                
                <ErrorMessage name="date" component="p" className="field-error" />
            </div>

        </div>

    );

};