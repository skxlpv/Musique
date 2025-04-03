import { UploadFile } from "../features/artworks/pages/UploadFile/UploadFile";
import { AuthPage } from "../features/auth/pages/Auth/AuthPage";
import { DictionaryPage } from "../features/dictionary/pages/DictionaryPage/DictionaryPage";
import { ArtistsPage } from "../features/pages/pages/ArtistsPage/ArtistsPage.jsx";
import { HomePage } from "../features/pages/pages/HomePage/HomePage";
import { MyProfile } from "../features/profile/MyProfile/MyProfile";
import ErrorBoundary from "../components/atoms/ErrorBoundary/ErrorBoundary.jsx";

export const routes = {
    //BASE
    home_page: {
        url: "/", component: <HomePage/>, requiresAuth: false
    },
    auth_page: {
        url: "/auth/*", component: <AuthPage/>, requiresAuth: false
    },
    my_profile: {
        url: "/profile", component: <ErrorBoundary><MyProfile/></ErrorBoundary>, requiresAuth: true
    },
    settings: {
        url: "/settings", component: null, requiresAuth: true
    },
    //PAGES
    dictionary_page: {
        url: "/dictionary", component: <DictionaryPage/>, requiresAuth: true
    },
    artists_page: {
        url: "/artists", component: <ArtistsPage/>, requiresAuth: true
    },
    musicians_page: {
        url: "/musicians", component: null, requiresAuth: true
    },
    theatre_artists_page: {
        url: "/theatre", component: null, requiresAuth: true
    },
    writers_page: {
        url: "/writers", component: null, requiresAuth: true
    },
    craftspeople_page: {
        url: "/craftsmen", component: null, requiresAuth: true
    },
    //UPLOAD FILE
    upload_file: {
        url: "/upload", component: <UploadFile/>, requiresAuth: true
    },
}