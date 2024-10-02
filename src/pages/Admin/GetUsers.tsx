import { Button, Table, TableColumnsType, Modal, Form, Input, Popconfirm, message, Select } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    useGetAllUserQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,
} from '../../redux/features/auth/authApi'; // Adjust the import path based on your project structure

export type TUserData = {
    _id: string;
    name: string;
    email: string;
    phone: string; // Added phone number
    role: string;
};

const GetUsers = () => {
    const { data: userData, isFetching } = useGetAllUserQuery(undefined);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [updateUserRole] = useUpdateUserRoleMutation();
    const [deleteUser] = useDeleteUserMutation();

    // Handle user role update
    const handleUpdate = (record: TUserData) => {
        setSelectedUserId(record._id);
        form.setFieldsValue({
            name: record.name,
            email: record.email,
            phone: record.phone, // Set phone number in form
            role: record.role,
        });
        setIsModalVisible(true);
    };

    const handleUpdateSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (selectedUserId) {
                await updateUserRole({ userId: selectedUserId, newRole: values.role });
                message.success('User role updated successfully');
                setIsModalVisible(false);
                setSelectedUserId(null);
            } else {
                message.error('User ID is missing.');
            }
        } catch (error) {
            message.error('Failed to update user role');
        }
    };

    // Handle user deletion
    const handleDelete = async (userId: string) => {
        try {
            await deleteUser(userId);
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const tableData = userData?.data?.map(({ _id, name, email, phone, role }: TUserData) => ({
        _id,
        name,
        email,
        phone, // Include phone number in table data
        role,
    }));

    const columns: TableColumnsType<TUserData> = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number', // New column for phone number
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item: TUserData) => (
                <>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: '10px' }}
                        onClick={() => handleUpdate(item)}
                    >
                        Update Role
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(item._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">User Information</h1>
            <Table loading={isFetching} columns={columns} dataSource={tableData} />

            {/* Update User Role Modal */}
            <Modal
                title="Update User Role"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdateSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="User Name"
                        name="name"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default GetUsers;
