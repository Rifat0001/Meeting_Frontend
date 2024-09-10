import { Form, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { RiLockPasswordFill } from 'react-icons/ri';

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    disabled?: boolean;
};

const PassWord = ({ type, name, label, disabled }: TInputProps) => {
    const { control, formState: { errors } } = useFormContext(); // useFormContext to get form state

    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message: 'Password must contain one small and large letter and one number',
                    },
                }}
                render={({ field }) => (
                    <Form.Item
                        label={label}
                        validateStatus={errors[name] ? 'error' : ''}
                        help={errors[name]?.message}
                    >
                        <Input.Password
                            placeholder="Enter Your Password"
                            prefix={<RiLockPasswordFill className='text-xl mr-2' />}
                            {...field}
                            type={type}
                            id={name}
                            size="large"
                            disabled={disabled}
                            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PassWord;
