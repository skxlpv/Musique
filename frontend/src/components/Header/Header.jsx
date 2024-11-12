import React from "react"
import "../Header/Header.css"
import { SubHeader } from "../SubHeader/SubHeader"

export const Header = () => {
  return (
    <div className="">
        <div className="flex w-full items-center shadow-md shadow-neutral-950 bg-black px-16 h-20 fixed">
            <div className="flex w-1/3">
                <ul className="flex gap-8 text-xl">
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/">Dictionary</a>
                    </li>
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/">Learn</a>
                    </li>
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/">Analyze</a>
                    </li>
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/auth">Discover</a>
                    </li>
                </ul>
            </div>

            <div className="w-1/3 flex justify-center">
                <a className="cursor-default" href="/">
                    <div className="group relative h-12 flex items-center justify-center">
                        <h1 className="absolute text-4xl tracking-widest transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-0.5 group-hover:text-blue-950">
                        Musique
                        </h1>
                        <h1 className="absolute text-4xl tracking-widest transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-0.5 group-hover:text-red-950">
                        Musique
                        </h1>
                        <h1 className="absolute text-4xl tracking-widest transition-all duration-500">
                        Musique
                        </h1>
                    </div>
                </a>
            </div>
            
            <div className="w-1/3">
                <ul className="flex gap-8 text-xl p-0 justify-end">
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/">Resourses</a>
                    </li>
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/">About</a>
                    </li>
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/">Contacts</a>
                    </li>
                    <li className="list-item-hover">
                        <a className="cursor-default" href="/auth">My Profile</a>
                    </li>
                </ul>
            </div>
        </div>

        <SubHeader/>
    </div>
  )
}
