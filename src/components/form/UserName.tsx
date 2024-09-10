import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
type TInputProps = {
    type: string;
    name: string;
    label?: string;
    disabled?: boolean;
};

const UserName = ({ type, name, label, disabled }: TInputProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}>
                        <Input
                            placeholder="Enter Your Name"
                            prefix={<FaUser className='text-xl mr-2' />}
                            {...field}
                            type={type}
                            id={name}
                            size="large"
                            disabled={disabled}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default UserName;
