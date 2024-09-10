import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { MailFilled } from '@ant-design/icons';
import { IoMail } from 'react-icons/io5';
type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const MyInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px', marginTop: '20px' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              placeholder="Enter Your Mail"
              prefix={<IoMail className='text-xl mr-2' />}
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

export default MyInput;
