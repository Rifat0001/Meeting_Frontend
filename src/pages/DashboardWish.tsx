import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser, userFullInformation } from '../redux/features/auth/authSlice';

const DashboardWish = () => {
    const userInfo = useAppSelector(userFullInformation)
    const user = useAppSelector(selectCurrentUser)
    console.log(userInfo)
    return (
        <div>
            <h1 className='font-bold text-4xl'>Welcome {user ? JSON.stringify(user) : 'Guest'}</h1>
        </div>
    );
};

export default DashboardWish;