import './styles/App.css';
import { Header } from "./components/Header/Header";
import { HomePage } from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth/AuthPage';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <Router>
            <Header />
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth/*" element={<AuthPage />} />
                    {/* Any other routes can be added here */}
                    {/* Optionally, a catch-all route to redirect to home or a 404 page */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
