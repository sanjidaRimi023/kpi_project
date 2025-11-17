
import { Outlet } from 'react-router';
import Header from '../components/shared/Navbar';

const MainLayout = () => {
    return (
        <>
        <Header/>
            <Outlet/>
        </>
    );
};

export default MainLayout;