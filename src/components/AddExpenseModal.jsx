import { useState } from "react";
import { Modal } from "./Modal";
import { stepSchemas, initialExpenseValues } from "../schemas/expenseSchemas";
import { ReviewStep } from "./ExpenseFormSteps/ReviewStep";
import { StepOne } from "./ExpenseFormSteps/StepOne";
import { StepTwo } from "./ExpenseFormSteps/StepTwo";
import { Form, Formik } from "formik";

const steps = [StepOne, StepTwo, ReviewStep];
const stepTitles = ["Amount & Category", "Payment Details", "Review & Submit"];

export function AddExpenseModal({ isOpen, onClose, onSubmit, categories }) {

    const [stepIndex, setStepIndex] = useState(0);
    const isLastStep = stepIndex === steps.length - 1;
    const CurrentStepComponent = steps[stepIndex];

    function handleClose() {
        setStepIndex(0);
        onClose();
    }

    async function handleStepSubmit(values, { setSubmitting }) {

        if (isLastStep) {

            await onSubmit(values);
            setSubmitting(false);
            setStepIndex(0);
            onClose();

        } else {

            setStepIndex((prev) => prev + 1);
            setSubmitting(false);
        }
        
    }

    return (

        <Modal isOpen={isOpen} onClose={handleClose} title={stepTitles[stepIndex]}>

            <Formik
                initialValues={initialExpenseValues}
                validationSchema={stepSchemas[stepIndex]}
                onSubmit={handleStepSubmit}
            >
                {(formik) => (
                    <Form>
                        
                        <CurrentStepComponent formik={formik} categories={categories} />

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>

                            {stepIndex > 0 ? (
                                <button type="button" onClick={() => setStepIndex((prev) => prev - 1)}>
                                    Back
                                </button>
                            ) : <span /> }

                            <button type="submit" disabled={formik.isSubmitting}>
                                {isLastStep ? "Submit Expense" : "Next"}
                            </button>

                        </div>

                    </Form>
                )}

            </Formik>

        </Modal>

    );

}