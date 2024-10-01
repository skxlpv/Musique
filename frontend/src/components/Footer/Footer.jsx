import "../Footer/Footer.css"
import logo from "../../assets/logo.ico"

export const Footer = () => {
    return(
        <div className="footer-container">
            <div className="footer-upper">
                <div className="logo-container">
                    <h1><img src={logo} alt="logo" />MUSIQUE</h1>
                    <p>
                        Everything you need
                    </p>
                </div>
                <div className="items-container">
                    <ul>
                        <li>ONE</li>
                        <li>TWO</li>
                        <li>THREE</li>
                    </ul>
                    <ul>
                        <li>ONE</li>
                        <li>TWO</li>
                        <li>THREE</li>
                    </ul>
                    <ul>
                        <li>ONE</li>
                        <li>TWO</li>
                        <li>THREE</li>
                    </ul>
                    <ul>
                        <li>ONE</li>
                        <li>TWO</li>
                        <li>THREE</li>
                    </ul>
                </div>
            </div>

            <hr/>

            <div className="footer-down">
                <p className="copyright">©Oleksandr Tymchenko 2024. All rights reserved</p>
            </div>

        </div>
    )
}