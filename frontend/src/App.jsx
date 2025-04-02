import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import {Header} from "./components/organisms/Header/Header";
import {AuthProvider} from './features/auth/contexts/useAuth.jsx';
import {PrivateRoute} from './components/organisms/PrivateRoute/PrivateRoute';
import {routes} from './routes/index.jsx';

function App() {
    return (
        <RecoilRoot>
            <Router>
                <AuthProvider>
                    <div className='bg-background text-foreground min-h-screen flex flex-col'>
                        <Header/>
                        <main className="flex-1 container mx-auto px-4 md:px-60 py-20 mt-6 !scroll-smooth">
                            <Routes>
                                {Object.values(routes)
                                    .filter(route => route.component !== null)
                                    .map((route, index) => (
                                        <Route
                                            path={route.url}
                                            key={index}
                                            element={
                                                route.requiresAuth ?
                                                    <PrivateRoute>{route.component}</PrivateRoute> :
                                                    route.component
                                            }
                                        />
                                    ))}
                            </Routes>
                        </main>
                    </div>
                </AuthProvider>
            </Router>
        </RecoilRoot>
    );
}

export default App;