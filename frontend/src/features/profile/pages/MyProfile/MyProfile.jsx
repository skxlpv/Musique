import React, {Suspense} from "react";
import {useRecoilValue} from "recoil";
import {activeTabState} from "../../../../recoil/atoms";
import {BaseInfo} from "../../components/BaseInfo";
import {TabsContainer} from "../../../../components/TabsContainer/TabsContainer";
import {profileOptions} from "../../../../utils/profileTabs";

export const MyProfile = () => {
    const activeTab = useRecoilValue(activeTabState);

    return (
        <div className="flex min-w-full justify-center">
            {/* Main content area with left padding to accommodate sidebar */}
            <div className="flex flex-col min-w-full">
                <div className="card mb-4">
                    <BaseInfo/>
                </div>
                {/* Fixed sidebar container */}
                <div className="w-full flex justify-center">
                    <TabsContainer object={profileOptions}/>
                </div>

                {activeTab?.content && (
                    <Suspense fallback={<div>Loading...</div>}>
                        {activeTab.content}
                    </Suspense>
                )}
            </div>
        </div>
    )
};