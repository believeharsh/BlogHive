import { useEffect } from "react";

const useOutSideClick = (ref, handler, toggleButtonRef) => {
    useEffect(() => {
        const listener = (event) => {
            if ( 
                !ref.current || 
                ref.current.contains(event.target) || 
                (toggleButtonRef.current && toggleButtonRef.current.contains(event.target))) {
                return;
            }
            handler(event);
            setTimeout(() => handler(event), 0);
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };

    }, [ref, handler]); 
};

export default useOutSideClick;
