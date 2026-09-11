export function LiveAnnouncer({ message }) {

    return (

        <div 
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                whiteSpace: "nowrap",
            }}
        >
            {message}
        </div>

    );

};