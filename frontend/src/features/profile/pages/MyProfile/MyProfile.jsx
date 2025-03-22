import { useEffect, useState } from "react";
import api from "../../../../services/api";

export const MyProfile = () => {
    const [profileData, setProfileData] = useState({});

    const fetchUserProfileData = async () => {
        try {
            const response = await api.get(
                "http://127.0.0.1:8000/api/v1/users/me",
            );
            setProfileData(response.data);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchUserProfileData();
    }, []);


    return(
        <div className="w-[80rem] h-[40rem] flex">
            <h1>Profile</h1>
        </div>
    );
};
