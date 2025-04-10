import { UploadFile } from "../features/artworks/pages/UploadFile/UploadFile";
import { AuthPage } from "../features/auth/pages/Auth/AuthPage";
import { DictionaryPage } from "../features/dictionary/pages/DictionaryPage/DictionaryPage";
import { ArtistsPage } from "../features/pages/pages/ArtistsPage.jsx";
import { HomePage } from "../features/pages/pages/HomePage";
import { MyProfile } from "../features/profile/MyProfile/MyProfile";
import { MusicianPage } from "../features/pages/pages/MusicianPage.jsx";
import {PageTitle} from "../components/atoms/PageTitle/PageTitle.jsx";
import {TheatrePage} from "../features/pages/pages/TheatrePage.jsx";
import {WritersPage} from "../features/pages/pages/WritersPage.jsx";

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
        url: "/art-gallery",
        component: (
            <>
                <PageTitle title="Artists" />
                <ArtistsPage />
            </>
        ),
        requiresAuth: true
    },
    musicians_page: {
        url: "/music-gallery",
        component: (
            <>
                <PageTitle title="Musicians" />
                <MusicianPage />
            </>
        ),
        requiresAuth: true
    },
    theatre_artists_page: {
        url: "/theatrical-gallery",
        component: (
            <>
                <PageTitle title="Theatre Artists" />
                <TheatrePage />
            </>
        ),
        requiresAuth: true
    },
    writers_page: {
        url: "/writings-gallery",
        component: (
            <>
                <PageTitle title="Writers" />
                <WritersPage/>
            </>
        ),
        requiresAuth: true
    },
    craftspeople_page: {
        url: "/craftspeople-gallery",
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