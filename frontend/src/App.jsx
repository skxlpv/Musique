import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Header } from "./components/Header/Header";
import { AuthProvider } from './features/auth/contexts/useAuth';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { routes } from './routes';

function App() {
    return (
        <RecoilRoot>
        <Router>
        <AuthProvider>
            <div className='bg-black w-full h-full flex flex-col'>
                <Header />
                <div className="flex-1 items-center flex flex-col px-60 pt-20 text-xl mt-6 !scroll-smooth">
                    <Routes>
                        {Object.values(routes)
                            .filter(route => route.component !== null)
                            .map((route, index) => (
                                <Route path={route.url} key={index}
                                    element={
                                        route.requiresAuth ? 
                                        <PrivateRoute>{route.component}</PrivateRoute> : 
                                        route.component
                                    } 
                                />
                            ))}
                    </Routes>
                </div>
            </div>
        </AuthProvider>
        </Router>
        </RecoilRoot>
    );
}

export default App;
