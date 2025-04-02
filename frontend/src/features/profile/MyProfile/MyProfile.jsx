import React, {Suspense} from "react";
import {useRecoilValue} from 'recoil';
import {activeProfileTabState} from "../../../recoil/atoms";
import {BaseInfo} from "../components/BaseInfo";
import {TabsContainer} from "../../../components/molecules/TabsContainer/TabsContainer";
import {profileOptions} from "../../../utils/profileTabs.jsx";

export const MyProfile = () => {
    const activeTab = useRecoilValue(activeProfileTabState);

    const renderTabContent = () => {
        if (!activeTab) {
            return <div className="p-4 text-center">No tab selected</div>;
        }

        if (!activeTab.content) {
            return <div className="p-4 text-center">No content available for this tab</div>;
        }

        return (
            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                {activeTab.content}
            </Suspense>
        );
    };

    return (
        <div className="flex min-w-full justify-center">
            <div className="flex flex-col min-w-full">
                <BaseInfo />
                <div className="w-full flex justify-center">
                    <TabsContainer object={profileOptions} />
                </div>

                {renderTabContent()}
            </div>
        </div>
    );
};