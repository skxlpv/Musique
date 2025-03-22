import React from "react";
import { routes } from "../../routes/index.js"

export const LeftNavigation = () => {
    return (
        <div className="flex w-1/3">
            <ul className="flex gap-4 text-xl">
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.dictionary_page.url}>Dictionary</a>
                </li>
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Learn</a>
                </li>
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Analyze</a>
                </li>
                <li>
                    <a className="cursor-default button-card-outlined" href={routes.home_page.url}>Discover</a>
                </li>
            </ul>
        </div>
    )
}
