import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import MyForm from '../components/form/MyForm';
import { FaUser } from "react-icons/fa";
import { IoMail } from 'react-icons/io5';
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';
import PassWord from '../components/form/PassWord';
import { Input } from 'antd';
const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        email: 'abc@gmail.com',
        password: 'ph-password',
    };

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in');
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            };

            const res = await login(userInfo).unwrap();
            console.log(res)
            console.log('user')
            dispatch(setUser({ user: res.data.name, token: res.token }));
            toast.success('Logged in', { id: toastId, duration: 2000 });
            navigate('/');
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };
    return (
        <section className='flex h-[80vh] flex-col justify-center items-center '>
            <h1 className='text-black text-2xl font-bold'>Sign Up</h1>
            <div className='border p-5 w-[600px] mt-5 rounded-md shadow-lg'>
                <MyForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <Input
                        placeholder="Enter Your Name"
                        prefix={<FaUser className='text-xl mr-2' />}
                        type='text'
                        size="large"
                        style={{ marginBottom: '20px' }}
                    />
                    <Input
                        placeholder="Enter Your Email"
                        prefix={<IoMail className='text-xl mr-2' />}
                        type='email'
                        size="large"
                        style={{ marginBottom: '20px' }}
                    />
                    <PassWord type="password" name="password" />
                    <Input
                        placeholder="Enter Your Number"
                        prefix={<FaPhoneAlt className='text-xl mr-2' />}
                        type='number'
                        size="large"
                        style={{ marginBottom: '20px' }}
                    />
                    <Input
                        placeholder="Enter Your Address"
                        prefix={<FaLocationDot className='text-xl mr-2' />}
                        type='number'
                        size="large"
                        style={{ marginBottom: '20px' }}
                    />
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