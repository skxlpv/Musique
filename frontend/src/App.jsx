import './styles/App.css';
import { Header } from "./components/Header/Header";
import { HomePage } from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Registration } from './pages/Registration/Registration';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <Router>
            <Header/>
                <div className="App">
                    <Routes>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/registration' element={<Registration/>} />
                    </Routes>
                </div>
            <Footer/>
        </Router>
    );
}

export default App;
