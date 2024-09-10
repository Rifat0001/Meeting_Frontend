import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { FaPhoneAlt } from 'react-icons/fa';
type TInputProps = {
    type: string;
    name: string;
    label?: string;
    disabled?: boolean;
};

const UserNumber = ({ type, name, label, disabled }: TInputProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}>
                        <Input
                            placeholder="Enter Your Number"
                            prefix={<FaPhoneAlt className='text-xl mr-2' />}
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

export default UserNumber;
