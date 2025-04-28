import { UploadFile } from "../features/artworks/pages/UploadFile/UploadFile";
import { AuthPage } from "../features/auth/pages/Auth/AuthPage";
import { DictionaryPage } from "../features/dictionary/pages/DictionaryPage/DictionaryPage";
import { ArtistsPage } from "../features/pages/ArtistsPage.jsx";
import { HomePage } from "../features/pages/HomePage.jsx";
import { MyProfile } from "../features/profile/MyProfile/MyProfile";
import { MusicianPage } from "../features/pages/MusicianPage.jsx";
import {PageTitle} from "../components/atoms/PageTitle/PageTitle.jsx";
import {TheatrePage} from "../features/pages/TheatrePage.jsx";
import {WritersPage} from "../features/pages/WritersPage.jsx";
import {CraftspeoplePage} from "../features/pages/CraftspeoplePage.jsx";
import DetailPage from "../features/pages/DetailPage.jsx";

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
                <CraftspeoplePage />
            </>
        ),
        requiresAuth: true
    },

    artist_detail: {
        url: "/art-gallery/:slug",
        component: (
            <>
                <PageTitle title="Artist Details" />
                <DetailPage type="artist" />
            </>
        ),
        requiresAuth: true
    },
    musician_detail: {
        url: "/music-gallery/:slug",
        component: (
            <>
                <PageTitle title="Musician Details" />
                <DetailPage type="musician" />
            </>
        ),
        requiresAuth: true
    },
    writer_detail: {
        url: "/writings-gallery/:slug",
        component: (
            <>
                <PageTitle title="Writer Details" />
                <DetailPage type="writer" />
            </>
        ),
        requiresAuth: true
    },
    theatre_detail: {
        url: "/theatrical-gallery/:slug",
        component: (
            <>
                <PageTitle title="Theatre Artist Details" />
                <DetailPage type="theatre" />
            </>
        ),
        requiresAuth: true
    },
    craftspeople_detail: {
        url: "/craftspeople-gallery/:slug",
        component: (
            <>
                <PageTitle title="Craftsperson Details" />
                <DetailPage type="craftsperson" />
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