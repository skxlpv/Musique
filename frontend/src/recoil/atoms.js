import { atom } from "recoil";
import {profileOptions} from "../utils/profileTabs";

export const rootNoteState = atom({
    key: "rootNoteState",
    default: ""
})

export const chordQualityState = atom({
    key: "chordQuality",
    default: ""
})

export const chordExtensionState = atom({
    key: "chordExtensionState",
    default: ""
})

export const chordsDataState = atom({
    key: "chordsDataState",
    default: null,
});

export const fileState = atom({
    key: "fileState",
    default: null,
})

export const authState = atom({
    key: "authState",
    default: {
        isAuthenticated: false,
        username: null,
        email: null
    },
});

export const activeProfileTabState = atom({
    key: "activeTabState",
    default: profileOptions.artworks
});