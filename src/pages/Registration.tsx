import { FieldValues } from 'react-hook-form';
import { useSignupMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import MyForm from '../components/form/MyForm';
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';
import PassWord from '../components/form/PassWord';
import MyInput from '../components/form/MyInput';
import UserName from '../components/form/UserName';
import UserNumber from '../components/form/UserNumber';
import UserLocation from '../components/form/UserLocation';
const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [signup] = useSignupMutation();

    const onSubmit = async (data: FieldValues) => {

        const toastId = toast.loading('Creating an account...');
        try {
            const signUpInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                role: 'user',
                address: data.address
            };
            console.log(signUpInfo)

            const res = await signup(signUpInfo).unwrap();
            dispatch(setUser({ user: res.data.name, token: res.token }));
            toast.success('Account Created Successfully, Please Login', { id: toastId, duration: 2000 });
            navigate('/login');
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };
    return (
        <section className='flex h-[80vh] flex-col justify-center items-center '>
            <h1 className='text-black text-2xl font-bold'>Sign Up</h1>
            <div className='border p-5 w-[600px] mt-5 rounded-md shadow-lg'>
                <MyForm onSubmit={onSubmit}>
                    <UserName type='text' name='name' />
                    <MyInput type="email" name="email" />
                    <PassWord type="password" name="password" />
                    <UserNumber type='number' name='phone' />
                    <UserLocation type='text' name='address' />
                    <div className="flex justify-between items-center  ">
                        <button type="submit" className='bg-black py-2 w-40 rounded-md px-5 hover:bg-black text-white'>Sign Up</button>
                        <NavLink to='/login' className='font-semibold hover:text-black hover:font-bold hover:underline underline'>Already have an account? Login</NavLink>
                    </div>
                </MyForm>
            </div>
        </section>
    );
};

export default Registration;