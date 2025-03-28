import React from "react";
import {useAuth} from '../../auth/contexts/useAuth'
import {Avatar} from '../../../components/Avatar/Avatar'
import {TabsContainer} from "../../../components/TabsContainer/TabsContainer";
import {profileOptions} from "../../../utils/profileTabs";

export const BaseInfo = () => {
    const {userData} = useAuth();

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-start pt-4">
                <div className="pl-6">
                    <Avatar size="xl"/>
                </div>
                <div className="flex flex-col justify-start pl-6">
                    <div className="w-full">
                        <div className="flex flex-row gap-4 items-end w-full">
                            <p className="text-h">
                                {userData.first_name} {userData.last_name}
                            </p>
                        </div>
                        <div className="m-0 flex flex-row gap-4">
                            <p className="text-small">
                                Theatre Artist. {userData.pronouns}
                            </p>
                        </div>
                    </div>
                    <hr className="border-neutral-600 my-1 w-11/12"/>
                    <div className="flex flex-col">
                        <p className="text-body">Email:
                            <p className="inline text-zinc-400"> {userData.email}</p>
                        </p>
                        <p className="text-body">Phone Number:
                            <p className="inline text-zinc-400">+380965639681</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};