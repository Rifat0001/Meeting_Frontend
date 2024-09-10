import { Button, Row } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import MyForm from '../components/form/MyForm';
import MyInput from '../components/form/MyInput';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: 'abc@gmail.com',
    password: 'ph-password',
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        email: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate('/');

    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };


  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <MyForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <MyInput type="text" name="userId" label="ID:" />
        <MyInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </MyForm>
    </Row>
  );
};

export default Login;