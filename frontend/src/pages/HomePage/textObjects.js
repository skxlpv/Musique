const instruments = {
    'Dictionary': {
        "description": "Search any chord, explore its variations and discover new ways",
        "color": "darkgreen",
        "link": "/dictionary",
    },
    'Analyze': {
        "description": "Dive deep into frequency composition, get AI recommendations",
        "color": "darkviolet",
        "link": "analyze",
    },
    'Learn': {
        "description": "Boost your musical ear and master new sounds like never before",
        "color": "darkblue",
        "link": "learn",
    },
    'Discover': {
        "description": "Find artists similar to yours favorite, discover absolutely new worlds",
        "color": "darkgray",
        "link": "discover",
    }
};

const resourses = {
    'Artists Page': {},
    'Musicians Page': {},
    'Writers Page': {},
    'Craftspeople Page': {},
}

const quality = {   
    "maj":"Major",
    "m":"Minor",
    "dim":"Diminished",
    "aug":"Augmented",
    "sus":"Suspended",
    "add9": "Added 9",
    "5":"5",
    "6":"6",
    "7":"7",
    "9":"9",
    "11":"11",
    "13":"13",

}

const extension = ["maj", "m", "dim", "aug","sus2","sus4",
                "majb5","m #5","m bb5","sus4#5","sus2b5","sus2#5",
                "7","m7","maj7","m(maj7)","dim7","aug7","aug(maj7)",
                "7b5","maj7b5","m7b5","m7#5","7b9","6","m6","6b5",
                "6/9","m6/9","9","m9","maj9","m(maj9)","9b5","aug9",
                "9sus4","7#9","7#9b5","aug(maj9)","11","m11","maj11",
                "m(maj11)","maj#11","13","m13","maj13","m(maj13)","7sus2",
                "maj7sus2","7sus4","maj7sus4","7sus2#5","7sus4#5","maj7sus4#5",
                "sus2sus4","7sus2sus4","maj7sus2sus4","5","add9"]

export const instrumentsObject = instruments, resoursesObject = resourses, chordQualityObject = quality, chordExtensionList = extension;