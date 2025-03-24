import React from "react";
import {useAuth} from '../../auth/contexts/useAuth'
import {Avatar} from '../../../components/Avatar/Avatar'
import {TabsContainer} from "../../../components/TabsContainer/TabsContainer";
import {profileOptions} from "../../../utils/profileTabs";

export const BaseInfo = () => {
    const {userData} = useAuth();

    return (
        <div className="flex flex-row w-full h-full items-center justify-between">
            <div className="flex flex-row items-center">
                <Avatar size="xl3"/>
                <div className="flex flex-col justify-start pl-6 pt-4 px-8">
                    <div className="w-full">
                        <div className="flex flex-row gap-4 items-end w-full">
                            <h1 className="m-0 text-5xl text-white">
                                {userData.first_name} {userData.last_name}
                            </h1>
                        </div>
                        <div className="m-0 flex flex-row gap-4">
                            <h1 className="m-0 text-base text-zinc-400">
                                Theatre Artist. {userData.pronouns}
                            </h1>
                        </div>
                    </div>
                    <hr className="border-neutral-600 my-1 w-11/12"/>
                    <div>
                        <h1 className="text-zinc-300 w-11/12">{userData.about}</h1>
                    </div>
                    <div className="flex flex-col">
                        <h1>Email:
                            <p className="inline text-zinc-400"> {userData.email}</p>
                        </h1>
                        <h1>Phone Number:
                            <p className="inline text-zinc-400">+380965639681</p>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="flex items-center h-full">
                <div className="border-l-[1px] border-neutral-600 h-full mr-4"></div>
                <div className="h-full w-fit">
                    <TabsContainer object={profileOptions}/>
                </div>
            </div>
        </div>
    )
};