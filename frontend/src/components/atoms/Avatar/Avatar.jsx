import {useMemo} from "react";
import { useAuth } from "../../../features/auth/contexts/useAuth.jsx";
import { BASE_URL, MEDIA_AVATARS } from "../../../services/api";

const SIZE_CLASSES = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-32 w-32",
    xl2: "h-40 w-40",
    xl3: "h-52 w-52",
};

export const Avatar = ({ size = "md" }) => {
    const { userData } = useAuth();
    const DEFAULT_AVATAR_PATH = MEDIA_AVATARS+"default.jpg"

    const imageSizeStyle = useMemo(() => (
        SIZE_CLASSES[size] || SIZE_CLASSES.md
    ), [size]);

    const imageSource = useMemo(() => {
        if (!userData?.avatar) return DEFAULT_AVATAR_PATH;
        return userData.avatar.startsWith("http")
            ? userData.avatar
            : `${BASE_URL}${userData.avatar}`;
    }, [userData?.avatar, DEFAULT_AVATAR_PATH]);

    return (
        <img
            src={imageSource? imageSource : DEFAULT_AVATAR_PATH}
            alt={`${userData?.username || "User"} avatar`}
            className={`max-w-none rounded-full object-cover flex-nowrap ${imageSizeStyle}`}
        />
    );
};
