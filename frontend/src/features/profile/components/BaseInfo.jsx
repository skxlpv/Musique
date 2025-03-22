import React from "react";
import { useAuth } from '../../auth/contexts/useAuth'
import {Avatar} from '../../../components/Avatar/Avatar'

export const BaseInfo = () => {
    const {userData} = useAuth();

    return (
        <div className="flex flex-row w-full h-full items-center">
            <div className="w-80">
                <Avatar size={"xl2"} />
            </div>

            <div className="flex flex-col h-full justify-between py-2">
                <div className="">
                    <div className="flex flex-row gap-4 items-end w-full">
                        <h1 className="m-0 text-5xl text-white">{userData.first_name} {userData.last_name}</h1>
                    </div>
                    <div className="m-0 flex flex-row gap-4">
                        <h1 className="m-0 text-base text-zinc-400">Theatre Artist. {userData.pronouns}</h1>
                    </div>
                </div>
                <div>
                    <h1 className="text-zinc-300">{userData.about}</h1>
                </div>
            </div>
        </div>
    )
}
