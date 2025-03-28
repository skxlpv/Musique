import React from "react";
import { routes } from "../../routes"

export const LeftNavigation = () => {
    return (
        <div className="flex">
            <ul className="flex text-xl gap-4">
                <li>
                    <a className="text-small btn-secondary" href={routes.dictionary_page.url}>Dictionary</a>
                </li>
                <li>
                    <a className="text-small btn-secondary" href={routes.home_page.url}>Learn</a>
                </li>
                <li>
                    <a className="text-small btn-secondary" href={routes.home_page.url}>Analyze</a>
                </li>
                <li>
                    <a className="text-small btn-secondary" href={routes.home_page.url}>Discover</a>
                </li>
            </ul>
        </div>
    )
}
