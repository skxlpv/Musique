import React from "react";
import {useRecoilState} from "recoil";
import {activeTabState} from "../../recoil/atoms";

export const TabsContainer = ({object}) => {
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div className="flex flex-col w-full">
            <ul className="text-xl w-full flex flex-row  justify-between">
                {Object.keys(object).map((tabKey) => (
                    <li
                        key={tabKey}
                        className={`${activeTab === object[tabKey] 
                            ? 'text-h4 btn-secondary cursor-pointer' 
                            : 'text-h4 btn-outline cursor-pointer'} 
                            my-1.5 w-52 flex justify-center `}
                        onClick={() => setActiveTab(object[tabKey])}
                    >
                        {object[tabKey].name}
                    </li>
                ))}
            </ul>
            <hr className="mb-4 mt-2 border-t-zinc-600" />
        </div>
    );
};