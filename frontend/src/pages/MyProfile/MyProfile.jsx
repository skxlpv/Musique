import { Fragment } from "react"
import { BoxContainer } from "../../components/BoxContainer/BoxContainer"
import user from "../../assets/user.jpg"
import settings_icon from "../../assets/settings_icon.png"
import notification_icon from "../../assets/notification_icon.png"
import exit_icon from "../../assets/exit_icon.png"

export const MyProfile = () => {
    return(
        <div className="w-[80rem] h-[40rem] flex">
            <div className="w-1/3 h-full rounded-[10px] flex flex-col items-center px-6">
                <img src={user} alt="user_profile_img" className="w-[200px] h-[200px] mb-2 object-cover rounded-full"></img>
                <h1 className="text-neutral-300 text-4xl">Pablo Ezkabaro</h1>
                <p className="text-left italic">I’d like to know what this whole show is all about before it’s out</p>
                <hr className="mb-2 w-full"/>

                <p className="self-start flex items-center">
                    <img src={settings_icon} alt="settings icon" className="w-[20px] h-[20px] mr-2"></img>
                    Manage Setting
                </p>
                <p className="self-start flex items-center">
                    <img src={notification_icon} alt="notification icon" className="w-[20px] h-[20px] mr-2"></img>
                    Notifications
                </p>
                <p className="self-start flex items-center">
                    <img src={exit_icon} alt="change account icon" className="w-[20px] h-[20px] mr-2"></img>
                    Change Account
                </p>
            </div>
            
            <div className="w-full ml-20">
                <BoxContainer
                    containerHeader = {"About"}
                    fragments = {
                        <Fragment>
                            <p>
                                Born in 1983 in San Sebastián, Spain. Now in my early forties, 
                                I’m known as one of the leading writers of my generation, with 
                                a body of work that includes novels, essays, and reflections on 
                                human nature, identity, and the search for meaning.
                            </p>
                        </Fragment>
                    }
                />
                <BoxContainer
                    containerHeader={"Creations"}
                />
            </div>
        </div>
    )
}
