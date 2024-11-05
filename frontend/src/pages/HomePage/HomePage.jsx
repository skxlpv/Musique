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
                <div className="bg-cover h-112 items-center flex justify-center bg-[url('https://img.freepik.com/free-vector/gradient-black-technology-background_23-2149209060.jpg?t=st=1730820393~exp=1730823993~hmac=c9c7e06f05e9765ef09fcba51a52b33feb2d095e5c74906a52e46af3dd662ed3&w=1380')]">
                    <div className="text-white text-center">
                        <h2 className="text-4xl mb-4">Users</h2>
                        {users.length > 0 ? (
                            <ul>
                                {users.map((user) => (
                                    <div>
                                        <li key={user.id} className="mb-2">
                                            {user.id} | {user.username} - {user.email}
                                        </li>
                                    </div>
                                    
                                ))}
                            </ul>
                        ) : (
                            <p>Loading users...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
