import './styles/App.css';
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage"
import { AuthPage } from "./pages/Auth/AuthPage"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className='bg-white'>
                <div className='bg-black w-full h-full flex flex-col'>
                    <Header />

                    <div className="flex-1 items-center flex flex-col px-48 pt-20 text-xl mt-24">
                        <Routes>
                            <Route element={<HomePage />} path='/' exact />
                            <Route element={<AuthPage />} path='/auth/*' />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;