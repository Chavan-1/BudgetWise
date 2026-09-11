import * as Yup from "yup";

export const stepSchemas = [

    Yup.object({
        amount: Yup.number()
            .typeError("Amount must be a number")
            .positive("Amount must be greater than 0")
            .required("Amount is required"),
        category: Yup.string()
            .required("Category is required"),
        date: Yup.date()
            .required("Date is required")
            .max(new Date(), "Date cannot be in the future"),
    }),

    Yup.object({
        paymentMethod: Yup.string()
            .required("Payment menthod is required"),
        notes: Yup.string()
            .max(200, "Notes must be under 200 characters"),
            recurring: Yup.boolean(),
    }),

    Yup.object({}),

];

export const initialExpenseValues = {

    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    notes: "",
    recurring: false,
    
};