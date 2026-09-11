export function FilterPanel({ filters, dispatch, categories }) {

    return (

        <div className="filter-panel">
             
            <div>
            
                <label htmlFor="category-filter">Category</label>
            
                <select id="category-filter"
                        value={filters.category}
                        onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}
                >

                    <option value="All">All</option>

                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}

                </select>
            
            </div>

            <div>

                <label htmlFor="start-date">Form</label>

                <input 
                    id="start-date"
                    type="date"
                    value={filters.startDate}   
                    onChange={(e) => 
                        dispatch({
                            type: "SET_DATE_RANGE",
                            payload: { startDate: e.target.value, endDate: filters.endDate },
                        })
                    } 
                />

            </div>

            <div>

                <label htmlFor="end-date">To</label>

                <input 
                    id="end-date"
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => 
                        dispatch({
                            type: "SET_DATE_RANGE",
                            payload: { startDate: filters.startDate, endDate: e.target.value },
                        })
                    }
                />

            </div>

            <div>

                <label htmlFor="min-amount">Min ₹</label>

                <input 
                    id="min-amount"
                    type="number"
                    value={filters.minAount}
                    onChange={(e) => 
                        dispatch({
                            type: "SET_MIN_AMOUNT",
                            payload: e.target.value
                        })
                    }
                />

            </div>

            <div>

                <label htmlFor="max-amount">Min ₹</label>

                <input 
                    id="max-amount"
                    type="number"
                    value={filters.maxAount}
                    onChange={(e) => 
                        dispatch({
                            type: "SET_MAX_AMOUNT",
                            payload: e.target.value
                        })
                    }
                />

            </div>

            <button type="button" onClick={() => dispatch({ type: "RESET_FILTERS" })}>
                Reset Filters
            </button>
        
        </div>

    );

};