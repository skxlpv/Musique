import React, { useEffect, useState } from "react";
import "../HomePage/HomePage.css";

export const HomePage = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // Fetch users when the component mounts
        fetch("http://localhost:8000/api/v1/users/")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <>
            <div className="w-full flex justify-center">
                <h1 className="text-8xl flex text-center h-fit mb-10 py-10">Everything. In a single place</h1>
            </div>
            <div className="container w-full p-10 min-h-screen">
                <div className="bg-cover h-112 items-center flex justify-center">

                </div>
            </div>
        </>
    );
};
