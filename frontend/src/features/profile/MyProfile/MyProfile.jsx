import React, {Suspense} from "react";
import {useRecoilValue} from "recoil";
import {activeProfileTabState} from "../../../recoil/atoms";
import {BaseInfo} from "../components/BaseInfo";
import {TabsContainer} from "../../../components/molecules/TabsContainer/TabsContainer";
import {profileOptions} from "../../../utils/profileTabs";

export const MyProfile = () => {
    const activeTab = useRecoilValue(activeProfileTabState);

    return (
        <div className="flex min-w-full justify-center">
            <div className="flex flex-col min-w-full">
                <BaseInfo/>
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