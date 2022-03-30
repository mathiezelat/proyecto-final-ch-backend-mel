import { Routes, Route, Navigate,} from 'react-router-dom';
import { Home } from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import RequireAuth from './RequireAuth';

const index = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
                path="/"
                element={<RequireAuth />}>
                    <Route index element={<Home />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default index;
