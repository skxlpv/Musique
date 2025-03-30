import {BaseTab} from "./BaseTab";
import {useAuth} from "../../../auth/contexts/useAuth";

export const ExpertiseTab = () => {
    const {userData} = useAuth();

    return (
        <BaseTab tabTitle="Expertise">
            {userData.sub_profiles.map((obj, index) => {
                return (
                    <div key={index}
                    className="card">
                        {Object.entries(obj.content).map(([key, value]) => {
                            return (
                                <h1 key={key}>{key} {value}</h1>
                            )
                        })}
                    </div>
                )
            })}
        </BaseTab>
    )
}