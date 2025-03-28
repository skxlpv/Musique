import { Link } from "react-router-dom";
import "../SubHeader/SubHeader.css"

export const SubHeader = ({additionalStyle, object}) => {
    return (
        <div className={`flex w-full items-center justify-center h-0 ${additionalStyle}`}>
            <ul className="gap-4 text-xl flex flex-row items-center">
                {Object.keys(object).map((item, key) => {
                    return(
                        <li className="text-small btn-secondary pr-1" key={key}>
                            <Link to={object[item].link}>
                                {object[item].name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};
