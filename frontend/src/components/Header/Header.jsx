import React from "react"
import "../Header/Header.css"
import mainLogo from "../../assets/logo.ico"
import userAccountIcon from "../../assets/user-account-icon.png"

export const Header = () => {
  return (
    <div className="flex items-center justify-center px-16 h-28 text-center">
        <img src={mainLogo} alt="main-logo" 
        className="h-16 absolute left-14 top-6 rounded-full">
        </img>
        <a className="cursor-default" href="/">
            <h1 className="text-4xl mr-16 tracking-widest h-12">
                Musique
            </h1>
        </a>
        <ul className="flex justify-between gap-8 text-xl p-0">
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
                <a className="cursor-default" href="/auth">Register</a>
            </li>
        </ul>
        <img src={userAccountIcon} alt="main-logo" 
        className="h-10 absolute right-16 top-10 rounded-full">
        </img>
    </div>
  )
}
