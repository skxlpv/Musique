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
import { UploadFile } from './pages/UploadFile/UploadFile';
import { AuthProvider } from './contexts/useAuth';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <RecoilRoot>
            <Router>
                <div className='bg-white'>
                    <div className='bg-black w-full h-full flex flex-col'>
                        <Header />
                        <div className="flex-1 items-center flex flex-col px-60 pt-20 text-xl mt-6 !scroll-smooth">
                            <AuthProvider>
                                <Routes>
                                    <Route element={<AuthPage />} path={routesObject.auth_page} />

                                    <Route element={<HomePage />} path={routesObject.home_page} exact />
                                    <Route element={<PrivateRoute><MyProfile /></PrivateRoute>} path={routesObject.my_profile} />
                                    <Route element={<PrivateRoute><DictionaryPage /></PrivateRoute>} path={routesObject.dictionary_page} />

                                    {/* SUBHEADER PAGES */}
                                    <Route element={<PrivateRoute><ArtistsPage /></PrivateRoute>} path={routesObject.artists_page} />
                                    <Route element={<PrivateRoute><UploadFile /></PrivateRoute>} path={routesObject.upload_file} />
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
