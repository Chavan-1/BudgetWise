export const initialFilterState = {

    category: "All",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",

};

export function filterReducer(state,action) {

    switch (action.type) {

        case "SET_CATEGORY":
            return { ...state, category: action.payload };

        case "SET_DATE_RANGE":
            return { ...state, startDate: action.payload.startDate, endDate: action.payload.endDate };

        case "SET_MIN_AMOUNT":
            return { ...state, minAmount: action.payload };

        case "SET_MAX_AMOUNT":
            return { ...state, maxAmount: action.payload };

        case "RESET_FILTERS":
            return initialFilterState;
        
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}