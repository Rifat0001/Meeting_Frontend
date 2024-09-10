import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

const DashboardWish = () => {
    const user = useAppSelector(selectCurrentUser)
    return (
        <div>
            <h1 className='font-bold text-4xl'>Welcome {user ? JSON.stringify(user) : 'Guest'}</h1>
        </div>
    );
};

export default DashboardWish;