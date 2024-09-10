import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { RiLockPasswordFill } from 'react-icons/ri';

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    disabled?: boolean;
};

const SignPasswrod = ({ type, name, label, disabled }: TInputProps) => {

    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item
                        label={label}
                    >
                        <Input.Password
                            placeholder="Enter Your Passwrod"
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

export default SignPasswrod;
