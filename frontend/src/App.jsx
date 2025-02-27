import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import routesObject from './utils/routes_data';

import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { AuthPage } from "./pages/Auth/AuthPage";
import { MyProfile } from './pages/MyProfile/MyProfile';
import { DictionaryPage } from './pages/DictionaryPage/DictionaryPage';
import { ArtistsPage } from './pages/ArtistsPage/ArtistsPage';
import { UploadFile } from './pages/ArtistsPage/UploadFile';
import { AuthProvider } from './contexts/useAuth';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <RecoilRoot>
            <Router>
                <div className='bg-white'>
                    <div className='bg-black w-full h-full flex flex-col'>
                        <Header />
                        <div className="flex-1 items-center flex flex-col px-60 pt-20 text-xl mt-24 !scroll-smooth">
                            <AuthProvider>
                                <Routes>
                                    <Route element={<AuthPage />} path={routesObject.AuthPage} />

                                    <Route element={<HomePage />} path={routesObject.HomePage} exact />
                                    <Route element={<PrivateRoute><MyProfile /></PrivateRoute>} path={routesObject.MyProfile} />
                                    <Route element={<PrivateRoute><DictionaryPage /></PrivateRoute>} path={routesObject.DictionaryPage} />

                                    {/* SUBHEADER PAGES */}
                                    <Route element={<PrivateRoute><ArtistsPage /></PrivateRoute>} path={routesObject.ArtistsPage} />
                                    <Route element={<PrivateRoute><UploadFile /></PrivateRoute>} path={routesObject.UploadArtistsFile} />
                                </Routes>
                            </AuthProvider>
                        </div>
                    </div>
                </div>
            </Router>
        </RecoilRoot>
    );
}

export default App;
