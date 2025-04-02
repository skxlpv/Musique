import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { activeProfileTabState } from "../../../recoil/atoms";

export const TabsContainer = ({ object }) => {
    const [_, setActiveTab] = useRecoilState(activeProfileTabState);
    const [focusedTab, setFocusedTab] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setFocusedTab(tab);
    };

    return (
        <div className="flex flex-col w-full navigation-container mb-4">
            <ul className="text-small w-full flex flex-row justify-between items-center">
                {Object.keys(object).map((tabKey) => (
                    <li
                        key={tabKey}
                        className={`navigation-tab cursor-pointer w-52 flex justify-center ${
                            focusedTab === object[tabKey] ? 'navigation-tab-focused' : ''
                        }`}
                        onClick={() => handleTabClick(object[tabKey])}
                        tabIndex="0"
                    >
                        {object[tabKey].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};