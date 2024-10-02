import { Button, Modal, Form, Input, message } from 'antd';
import { useGetSingleUserQuery, useUpdateAccountInfoMutation } from '../redux/features/auth/authApi';
import { useCurrentToken } from '../redux/features/auth/authSlice';
import { useAppSelector } from '../redux/hooks';
import { verifyToken } from '../utils/verifyToken';
import { useState, useEffect } from 'react';

const DashboardWish = () => {
    const token = useAppSelector(useCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const userId = user?.userId;

    const { data: response, error, isLoading } = useGetSingleUserQuery({ id: userId });
    const userData = response?.data;

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateAccountInfo] = useUpdateAccountInfoMutation();

    // Effect to set form data when userData changes
    useEffect(() => {
        if (userData) {
            form.setFieldsValue({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
            });
        }
    }, [userData, form]);

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();

            // Only send the fields that should be updated
            const { name, email, phone, address } = values;

            await updateAccountInfo({ userId, userInfo: { name, email, phone, address } }).unwrap();
            message.success('User information updated successfully');
            setIsModalVisible(false); // Close modal after update
        } catch (error) {
            message.error('Failed to update user information');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">User Information</h1>
            <p className="text-xl"><span className="font-bold">Email:</span> {userData?.email || 'N/A'}</p>
            <p className="text-xl"><span className="font-bold">Name:</span> {userData?.name || 'N/A'}</p>
            <p className="text-xl"><span className="font-bold">Role:</span> {userData?.role || 'N/A'}</p>
            <p className="text-xl"><span className="font-bold">Number:</span> {userData?.phone || 'N/A'}</p>
            <p className="text-xl"><span className="font-bold">Address:</span> {userData?.address || 'N/A'}</p>

            {/* Button to open modal */}
            <Button
                type="primary"
                onClick={() => setIsModalVisible(true)}
                className="mt-4"
            >
                Update Information
            </Button>

            {/* Update User Modal */}
            <Modal
                title="Update User Information"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdate}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DashboardWish;
