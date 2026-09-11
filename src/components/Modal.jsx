import { useEffect, useRef } from "react";

export function Modal({ isOpen, onClose, title, children }) {

    const modalRef = useRef(null);
    const previouslyFocusedElement = useRef(null);

    useEffect(() => {

        if (!isOpen) return;

        previouslyFocusedElement.current = document.activeElement;

        const modalNode = modalRef.current;
        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = modalNode.querySelectorAll(focusableSelectors);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        firstElement?.focus();

        function handleKeyDown(e) {

            if (e.key === "Escape") {
                onClose();
                return;
            }

            if (e.key === "Tab" && focusableElements,length > 0) {

                if (e.shiftKey && document.activeElement === firstElement) {
                    
                    e.preventDefault();
                    lastElement.focus();

                } else if (!e.shiftKey && document.activeElement === lastElement) {

                    e.preventDefault();
                    firstElement.focus();
                }
            }

        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {

            document.removeEventListener("keydown", handleKeyDown);
            previouslyFocusedElement.current?.focus();

        };

    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (

        <div className="modal-overlay" 
             onClick={onClose}
             style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>

            <div ref={modalRef}
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="modal-title"
                 onClick={(e) => e.stopPropagation()}
                 style={{ background: "white", padding: "2rem", borderRadius: "8px", minWidth: "400px" }}
            >

                <h2 id="modal-title">{title}</h2>
                {children}

            </div>

        </div>

    );

};