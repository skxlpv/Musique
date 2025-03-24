import React from "react";
import {useRecoilState} from "recoil";
import {activeTabState} from "../../recoil/atoms";

export const TabsContainer = ({object}) => {
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div>
            <div className="flex w-full items-center">
                <ul className="gap-1 text-xl flex flex-col items-start">
                    {Object.keys(object).map((tabKey) => (
                        <li
                            key={tabKey}
                            className={`${activeTab === object[tabKey] 
                                ? 'button-card-outlined-invert cursor-pointer' 
                                : 'button-card-outlined cursor-pointer'}`}
                            onClick={() => setActiveTab(object[tabKey])}
                        >
                            {object[tabKey].name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};