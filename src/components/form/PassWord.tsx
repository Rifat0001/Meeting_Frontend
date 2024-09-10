import { Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { RiLockPasswordFill } from 'react-icons/ri';
type TInputProps = {
    type: string;
    name: string;
    label?: string;
    disabled?: boolean;
};
const PassWord = ({ type, name, label, disabled }: TInputProps) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}>
                        <Input.Password
                            placeholder="Enter Your Password"
                            prefix={<RiLockPasswordFill  className='text-xl mr-2'/>}
                            {...field}
                            type={type}
                            id={name}
                            size="large"
                            disabled={disabled}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PassWord;
