import { UploadFile } from "../features/artworks/pages/UploadFile/UploadFile";
import { AuthPage } from "../features/auth/pages/Auth/AuthPage";
import { DictionaryPage } from "../features/dictionary/pages/DictionaryPage/DictionaryPage";
import { ArtistsPage } from "../features/pages/pages/ArtistsPage/ArtistsPage.jsx";
import { HomePage } from "../features/pages/pages/HomePage/HomePage";
import { MyProfile } from "../features/profile/MyProfile/MyProfile";
import { MusicianPage } from "../features/pages/pages/MusicianPage/MusicianPage.jsx";
import {PageTitle} from "../components/atoms/PageTitle/PageTitle.jsx";
import {TheatrePage} from "../features/pages/pages/TheatrePage/TheatrePage.jsx";

export const routes = {
    //BASE
    home_page: {
        url: "/",
        component: (
            <>
                <PageTitle title="Home" />
                <HomePage />
            </>
        ),
        requiresAuth: false
    },
    auth_page: {
        url: "/auth/*",
        component: (
            <>
                <PageTitle title="Authentication" />
                <AuthPage />
            </>
        ),
        requiresAuth: false
    },
    my_profile: {
        url: "/profile",
        component: (
            <>
                <PageTitle title="My Profile" />
                <MyProfile />
            </>
        ),
        requiresAuth: true
    },
    settings: {
        url: "/settings",
        component: (
            <>
                <PageTitle title="Settings" />
                {/* Your settings component here */}
            </>
        ),
        requiresAuth: true
    },
    //PAGES
    dictionary_page: {
        url: "/dictionary",
        component: (
            <>
                <PageTitle title="Dictionary" />
                <DictionaryPage />
            </>
        ),
        requiresAuth: true
    },
    artists_page: {
        url: "/artists",
        component: (
            <>
                <PageTitle title="Artists" />
                <ArtistsPage />
            </>
        ),
        requiresAuth: true
    },
    musicians_page: {
        url: "/musicians",
        component: (
            <>
                <PageTitle title="Musicians" />
                <MusicianPage />
            </>
        ),
        requiresAuth: true
    },
    theatre_artists_page: {
        url: "/theatre",
        component: (
            <>
                <PageTitle title="Theatre Artists" />
                <TheatrePage />
            </>
        ),
        requiresAuth: true
    },
    writers_page: {
        url: "/writers",
        component: (
            <>
                <PageTitle title="Writers" />
            </>
        ),
        requiresAuth: true
    },
    craftspeople_page: {
        url: "/craftsmen",
        component: (
            <>
                <PageTitle title="Craftspeople" />
            </>
        ),
        requiresAuth: true
    },
    //UPLOAD FILE
    upload_file: {
        url: "/upload",
        component: (
            <>
                <PageTitle title="Upload File" />
                <UploadFile />
            </>
        ),
        requiresAuth: true
    },
}