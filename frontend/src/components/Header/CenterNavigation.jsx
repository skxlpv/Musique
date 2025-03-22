import React from "react";

export const CenterNavigation = () => {
    return (
        <div className="w-1/3 flex justify-center mt-2">
            <a href="/">
                <div className="group relative h-12 flex items-center justify-center">
                    <h1 className="absolute text-4xl tracking-widest transition-all duration-1000 group-hover:-translate-x-2 group-hover:-translate-y-0.5 group-hover:text-blue-900">
                        МУР
                    </h1>
                    <h1 className="absolute text-4xl tracking-widest transition-all duration-1000 group-hover:translate-x-2 group-hover:translate-y-0.5 group-hover:text-red-900">
                        МУР
                    </h1>
                    <h1 className="absolute text-4xl tracking-widest transition-all duration-500">
                        МУР
                    </h1>
                </div>
                <div>
                    <p>Мистецький Універсальний Ресурс</p>
                </div>
            </a>
        </div>
    )
}
