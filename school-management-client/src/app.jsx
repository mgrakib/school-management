
import { Outlet } from 'react-router';
import NavBar from './components/share/navbar';

const App = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default App;