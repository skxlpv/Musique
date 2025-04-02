import React from "react";
import { routes } from "../../../routes/index.jsx"

export const LeftNavigation = () => {
    return (
        <div className="flex">
            <ul className="flex text-xl gap-4">
                <li>
                    <a className="body-small btn-small" href={routes.dictionary_page.url}>Dictionary</a>
                </li>
                <li>
                    <a className="body-small btn-small" href={routes.home_page.url}>Learn</a>
                </li>
                <li>
                    <a className="body-small btn-small" href={routes.home_page.url}>Analyze</a>
                </li>
                <li>
                    <a className="body-small btn-small" href={routes.home_page.url}>Discover</a>
                </li>
            </ul>
        </div>
    )
}
