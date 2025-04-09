import {useEffect} from "react";

export function PageTitle({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
}