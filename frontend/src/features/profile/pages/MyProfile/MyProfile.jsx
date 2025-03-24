import React, {Suspense} from "react";
import {useRecoilValue} from "recoil";
import {activeTabState} from "../../../../recoil/atoms";
import {BaseInfo} from "../../components/BaseInfo";
import {GradientCard} from '../../../../components/GradientCard/GradientCard'

export const MyProfile = () => {
    const activeTab = useRecoilValue(activeTabState);

    return (
        <>
            <GradientCard>
                <BaseInfo/>
            </GradientCard>
            {activeTab?.content && (
                <Suspense fallback={<div>Loading...</div>}>
                    {activeTab.content}
                </Suspense>
            )}
        </>
    )
};