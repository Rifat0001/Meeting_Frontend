import { FieldValues} from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import MyForm from '../components/form/MyForm';
import MyInput from '../components/form/MyInput';
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';
import PassWord from '../components/form/PassWord';
import SignPasswrod from '../components/form/SignPasswrod';
const Login = () => {
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
      const loginInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(loginInfo).unwrap();
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
    <section className='flex h-[70vh] flex-col justify-center items-center '>
      <h1 className='text-black text-2xl font-bold'>Login</h1>
      <div className='border p-5 w-[600px] mt-5 rounded-md shadow-lg'>
        <MyForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <MyInput type="email" name="email" />
          <SignPasswrod type='password' name='password' />
          <div className="flex justify-between items-center  ">
          <button type="submit" className='bg-black py-2 w-40 rounded-md px-5 hover:bg-black text-white'>Login</button>
          <NavLink to='/signup' className='font-semibold hover:text-black hover:font-bold hover:underline underline'>Crete an account</NavLink>
          </div>
        </MyForm>
      </div>
    </section>
  );
};

export default Login;