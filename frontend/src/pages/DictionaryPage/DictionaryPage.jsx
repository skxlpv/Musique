import React, { useEffect, useMemo } from "react";
import { GuitarChord } from "../../components/GuitarChord/GuitarChord";
import axios from "axios";
import {
chordExtensionList,
chordQualityObject,
} from "../../utils/textObjects";
import { Button } from "../../components/Button/Button";
import { rootNoteState, chordQualityState, chordExtensionState, chordsDataState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export const DictionaryPage = () => {
    const rootNotesList = [
        "C","C#","D","D#","E","F","F#","G","G#","A","A#","B",
    ];

    const [data, setData] = useRecoilState(chordsDataState);
    const [rootNote, setRootNote] = useRecoilState(rootNoteState);
    const [chordQuality, setChordQuality] = useRecoilState(chordQualityState);
    const [chordExtension, setChordExtension] = useRecoilState(chordExtensionState);

    // Utility to toggle state
    const toggleState = (current, value) => (current === value ? "" : value);

    // Handlers
    const handleRootNoteClick = (note) => setRootNote((prev) => toggleState(prev, note));
    const handleChordQualityClick = (quality) => setChordQuality((prev) => toggleState(prev, quality));
    const handleChordExtensionClick = (extension) => setChordExtension((prev) => toggleState(prev, extension));

    // Fetch data
    useEffect(() => {
        if (!rootNote || rootNote === "Choose") {
            setData(null);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                `http://127.0.0.1:8000/api/v1/chords/${encodeURIComponent(rootNote)}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [rootNote, chordQuality, setData]);

    // Memoized list of filtered chord extensions
    const filteredExtensions = useMemo(() => {
        return chordExtensionList.filter((value) => {
        if (chordQuality === "m")
            return value.startsWith("m") && !value.startsWith("maj");
        if (chordQuality === "maj") return value.startsWith("maj");
        return value.startsWith(chordQuality);
        });
    }, [chordQuality]);

    // Auto-select single extension
    useEffect(() => {
        if (filteredExtensions.length === 1 && chordExtension !== filteredExtensions[0]) {
          setChordExtension(filteredExtensions[0]);
        }
      }, [filteredExtensions, chordExtension, setChordExtension]);

    return (
        <div className="place-items-center">
        <div className="flex items-center w-fit mx-10">
            <h1 className="text-header">DICTIONARY</h1>
        </div>

        <div className="flex flex-col text-center mb-10">
            <div className="flex flex-col items-center">
            <h1 className="medium-header">Delve Into The Chord</h1>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-2 mt-20">
            {rootNotesList.map((note) => {
                let topBoxStyle = "";
                if (note.includes("#")) {
                topBoxStyle = "relative -top-8 rounded-t-lg";
                }
                return (
                <button
                    onClick={() => handleRootNoteClick(note)}
                    key={note}
                    className={`${topBoxStyle} h-16 w-16 flex items-center justify-center
                                            shadow-neutral-400 shadow-sm 
                                            hover:duration-200
                                            ${
                                            rootNote === note
                                                ? "bg-neutral-200 text-black outline outline-black -outline-offset-4 shadow-inner"
                                                : "bg-neutral-950 hover:bg-neutral-900"
                                            }`}
                >
                    <h1 className="text-4xl">{note}</h1>
                </button>
                );
            })}
            </div>
        </div>

        <div className="my-10 text-center">
            {rootNote && (
            <>
                <h1 className="text-4xl my-10">Chords Quality</h1>
                <div className="flex gap-5 justify-center flex-wrap mb-5">
                    {Object.keys(chordQualityObject)
                    .filter((key) => isNaN(chordQualityObject[key]))
                    .map((key) => (
                        <Button
                        key={key}
                        label={chordQualityObject[key]}
                        isActive={chordQuality === key}
                        onClick={() => handleChordQualityClick(key)}
                        />
                    ))}
                </div>
                <div className="flex gap-10 justify-center flex-wrap">
                    {Object.keys(chordQualityObject)
                    .filter((key) => !isNaN(chordQualityObject[key]))
                    .map((key) => (
                        <Button
                        key={key}
                        label={chordQualityObject[key]}
                        isActive={chordQuality === key}
                        onClick={() => handleChordQualityClick(key)}
                        />
                    ))}
                </div>
            </>
            )}
        </div>

        <div className="my-10 flex flex-col place-items-center">
            {chordQuality && rootNote && (
            <>
                <h1 className="text-4xl my-10">Chords Extension</h1>
                <div className="flex gap-5 flex-wrap justify-center w-3/4">
                {filteredExtensions.map((value) => (
                    <Button
                    key={value}
                    label={value}
                    isActive={chordExtension === value}
                    onClick={() => handleChordExtensionClick(value)}
                    />
                ))}
                </div>
            </>
            )}
        </div>

        <div className="flex flex-wrap justify-center">
            {chordQuality &&
            rootNote &&
            chordExtension &&
            data &&
            data
                .filter((object) => object.name === `${rootNote} ${chordExtension}` && object.alternative === 1)
                .map((object) => (
                <div className="flex flex-col text-center" key={object.id}>
                    <h1 className="medium-header">Basic Chord</h1>
                    <GuitarChord chord={object} />
                    <h1 className="medium-header">Show More</h1>
                </div>
                ))}
        </div>
        </div>
    );
};
