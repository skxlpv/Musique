import React from "react";
import {useRecoilState} from "recoil";
import {activeTabState} from "../../recoil/atoms";

export const TabsContainer = ({object}) => {
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div className="flex flex-col w-full mt-8">
            <ul className="text-small w-full flex flex-row justify-between">
                {Object.keys(object).map((tabKey) => (
                    <li
                        key={tabKey}
                        className={`${activeTab === object[tabKey] 
                            ? 'btn-secondary cursor-pointer' 
                            : 'btn-secondary cursor-pointer'} 
                            mt-1.5 w-52 flex justify-center `}
                        onClick={() => setActiveTab(object[tabKey])}
                    >
                        {object[tabKey].name}
                    </li>
                ))}
            </ul>
            <hr className="border-white" />
        </div>
    );
};