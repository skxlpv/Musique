import React, { useEffect, useState } from "react";
import { GuitarChord } from "../../components/GuitarChord/GuitarChord";
import axios from "axios";
import { DropDown } from "../../components/DropDown/DropDown";

export const DictionaryPage = () => {
    const [data, setData] = useState(null);
    const [rootNote, setRootNote] = useState("C")
    const [chordType, setChordType] = useState("maj")

    useEffect(() => {
            axios.get(`http://127.0.0.1:8000/api/v1/chords/${rootNote}`)
            .then((data) => {
                setData(data);
                console.log(data.data.filter((object) => object.type === chordType))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [rootNote, chordType]);

    return (
        <div>
            <div className="flex items-center justify-items-center mx-10">
                <h1 className="text-header">DICTIONARY</h1>
                    <div className="ml-20 w-full flex items-baseline">
                        <div className="text-white button-card">
                            <DropDown
                                dropDownData={["C", "D", "E", "F", "G", "A", "B"]}
                                isRoot={true}
                                onChange={(e) => setRootNote(e.target.value)}
                            />
                        </div>
                        <div className="button-card">
                            <DropDown
                                dropDownData={["maj","m","dim","aug","sus2","sus4",
                                    "majb5","m #5","m bb5","sus4#5","sus2b5","sus2#5",
                                    "7","m7","maj7","m(maj7)","dim7","aug7","aug(maj7)",
                                    "7b5","maj7b5","m7b5","m7#5","m7b9","6","m6","6b5",
                                    "6/9","m6/9","9","m9","maj9","m(maj9)","9b5","aug9",
                                    "9sus4","7#9","7#9b5","aug(maj9)","11","m11","maj11",
                                    "m(maj11)","maj#11","13","m13","maj13","m(maj13)","7sus2",
                                    "maj7sus2","7sus4","maj7sus4","7sus2#5","7sus4#5","maj7sus4#5",
                                    "sus2sus4","7sus2sus4","maj7sus2sus4","5","add9"]}
                                onChange={(e) => setChordType(e.target.value)}
                            />
                        </div>
                    </div>
            </div>
            <div className="flex justify-center">
                {rootNote == null ? <h1>There Will Be Chords...</h1> : ""}
            </div>
            <div className="grid grid-cols-4">
                {data && data.data
                .filter((object) => object.type === chordType) // Filter based on chord type
                .map((object) => (
                    <GuitarChord chord={object} key={object.id} />
                ))}
            </div>
        </div>
    );
};