import { Button } from "../../components/Button/Button"
import NewsComponent from "./NewsComponent"
import "./styles/HomePage.css"

export const HomePage = () =>{
    return(
        <>
            <div className="content-container">
                <div className="homepage-container">
                    <h2>
                        EVERYTHING <br/>
                        YOU NEED IN A <br/>
                        SINGLE PLACE
                    </h2>
                    <div className="buttons-container">
                        <Button 
                        buttonTitle={"VIEW CHORDS"}
                        boxShadowColor={"#55FF00"}
                        shadowIntensity={10}
                        />
                        <Button 
                        buttonTitle={"ANALYZE SPECTRUM"}
                        boxShadowColor={"#E6AFFF"}
                        shadowIntensity={10}
                        />
                        <Button 
                        buttonTitle={"LEARN HARMONY"}
                        boxShadowColor={"#004DFF"}
                        shadowIntensity={10}
                        />
                    </div>
                </div>
            </div>

            <div className="content-container">
                <NewsComponent/>
            </div>
        </>
    )
}