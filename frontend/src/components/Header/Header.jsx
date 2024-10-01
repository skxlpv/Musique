import React from "react"
import user_profile from "../../assets/user.png"
import "../Header/Header.css"
import { HeaderButton } from "../HeaderButton/HeaderButton"
import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div className='header-div'>
        <header>
            <p className='logo'>
                <Link to="/">
                    MUSIQUE
                </Link>
            </p>
            <ul>
                <HeaderButton 
                buttonTitle={"DICTIONARY"}
                boxShadowColor={"#55FF00"}
                shadowIntensity={15}
                pageLink={"/"}
                />
                <HeaderButton 
                buttonTitle={"LEARN"}
                boxShadowColor={"#004DFF"}
                shadowIntensity={15}
                pageLink={"/"}
                />
                <HeaderButton 
                buttonTitle={"DISCOVER"}
                boxShadowColor={"#FFFFFF"}
                shadowIntensity={15}
                pageLink={"/"}
                />
                <HeaderButton 
                buttonTitle={"REGISTER"}
                boxShadowColor={"#E6AFFF"}
                shadowIntensity={15}
                pageLink={"/registration"}
                />
                <li><img src={user_profile} alt="user_profile_icon"></img></li>
            </ul>
        </header>
    </div>
  )
}