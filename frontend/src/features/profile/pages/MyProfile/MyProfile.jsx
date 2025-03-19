import { Fragment, useEffect, useState } from "react";
import { BoxContainer } from "../../../dictionary/components/BoxContainer/BoxContainer";
import settings_icon from "../../../../assets/settings_icon.png";
import notification_icon from "../../../../assets/notification_icon.png";
import exit_icon from "../../../../assets/exit_icon.png";
import profile_photo from "../../../../assets/user.jpg";
import api from "../../../../services/api";

export const MyProfile = () => {
    const [profileData, setProfileData] = useState({});

    const fetchUserProfileData = async () => {
        try {
            const response = await api.get(
                "http://127.0.0.1:8000/api/v1/user_profile/", 
            );
            setProfileData(response.data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchUserProfileData();
    }, []);

    const handleSaveAbout = async (newContent) => {
        try {
            setProfileData({
                ...profileData,
                about: newContent
            });

            await api.patch(
                "http://127.0.0.1:8000/api/v1/user_profile/",
                { about: newContent },
            );

            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            fetchUserProfileData();
        }
    };


    return(
        <div className="w-[80rem] h-[40rem] flex">
            <div className="w-1/3 h-full rounded-[10px] flex flex-col items-center px-6">
                <img src={profile_photo} alt="user_profile_img" className="w-[200px] h-[200px] mb-2 object-cover rounded-full"></img>
                <h1 className="text-neutral-300 text-4xl">{profileData?.username || ""}</h1>
                <p className="text-left italic">{profileData?.status || "No status"}</p>
                <hr className="mb-2 w-full"/>

                <p className="self-start flex items-center">
                    <img src={settings_icon} alt="settings icon" className="icon"></img>
                    Manage Setting
                </p>
                <p className="self-start flex items-center">
                    <img src={notification_icon} alt="notification icon" className="icon"></img>
                    Notifications
                </p>
                <p className="self-start flex items-center">
                    <img src={exit_icon} alt="change account icon" className="icon"></img>
                    Change Account
                </p>
            </div>
            
            <div className="w-full ml-20">
                <BoxContainer
                    containerHeader={"About"}
                    fragments={
                        <Fragment>
                            <p>
                                {profileData?.about !== "" ? profileData.about : "User hasn't wrote about themselves yet!"}
                            </p>
                        </Fragment>
                    }
                    onContentSave={handleSaveAbout}
                />
                <BoxContainer
                    containerHeader={"Creations"}
                    fragments={
                        <Fragment>
                            <p>
                                {profileData?.creations && profileData.creations.length > 0 
                                    ? profileData.creations.join(", ") 
                                    : "No creations yet!"}
                            </p>
                        </Fragment>
                    }
                    onContentSave={(content) => {
                        // Handle saving creations if needed
                        console.log("Saving creations:", content);
                    }}
                />
            </div>
        </div>
    );
};