import { Button, Table, TableColumnsType, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteRoomMutation, useGetRoomsQuery, useUpdateRoomMutation } from '../../redux/features/Rooms/roomApi';

export type TRoomData = {
    name: string;
    roomNo: string;
    floorNo: string;
    capacity: number;
    pricePerSlot: number;
};

interface RoomTable {
    _id: string;
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
}

const GetRooms = () => {
    const { data: roomData, isFetching } = useGetRoomsQuery(undefined);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    console.log(roomData)

    const [updateRoom] = useUpdateRoomMutation();
    const [deleteRoom] = useDeleteRoomMutation();

    const handleUpdate = (record: RoomTable) => {
        setSelectedRoomId(record?._id); // Use record.key for the room ID
        form.setFieldsValue({
            name: record.name,
            roomNo: record.roomNo,
            floorNo: record.floorNo,
            capacity: record.capacity,
            pricePerSlot: record.pricePerSlot,
        });
        setIsModalVisible(true);
    };


    const handleUpdateSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (selectedRoomId) { // Ensure the room ID is available
                await updateRoom({ roomId: selectedRoomId, roomInfo: values });
                message.success('Room updated successfully');
                setIsModalVisible(false);
                setSelectedRoomId(null); // Reset after successful update
            } else {
                message.error('Room ID is missing.'); // Display this only if you haven't set the ID
            }
        } catch (error) {
            message.error('Failed to update room');
        }
    };


    // Handle room deletion
    const handleDelete = async (roomId: string) => {
        try {
            await deleteRoom(roomId);
            console.log('room', roomId)
            message.success('Room deleted successfully');
        } catch (error) {
            console.log(error)
            message.error('Failed to delete room');
        }
    };

    const tableData = roomData?.data?.map(
        ({ _id, name, roomNo, floorNo, capacity, pricePerSlot }: RoomTable) => ({
            _id: _id,
            name,
            roomNo,
            floorNo,
            capacity,
            pricePerSlot,
        })
    );

    const columns: TableColumnsType<TRoomData> = [
        {
            title: 'Room Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Room No',
            key: 'roomNo',
            dataIndex: 'roomNo',
        },
        {
            title: 'Floor No',
            key: 'floorNo',
            dataIndex: 'floorNo',
        },
        {
            title: 'Capacity',
            key: 'capacity',
            dataIndex: 'capacity',
        },
        {
            title: 'Price Per Slot',
            key: 'pricePerSlot',
            dataIndex: 'pricePerSlot',
            render: (pricePerSlot: number) => `$${pricePerSlot}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (item: RoomTable) => (
                <>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: '10px' }}
                        onClick={() => handleUpdate(item)}
                    >
                        Update
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this room?"
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
            <h1 className="text-2xl font-bold">Room Information</h1>
            <Table loading={isFetching} columns={columns} dataSource={tableData} />

            {/* Update Room Modal */}
            <Modal
                title="Update Room"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdateSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Room Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the room name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Room No"
                        name="roomNo"
                        rules={[{ required: true, message: 'Please input the room number!' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Floor No"
                        name="floorNo"
                        rules={[{ required: true, message: 'Please input the floor number!' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Capacity"
                        name="capacity"
                        rules={[{ required: true, message: 'Please input the capacity!' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Price Per Slot"
                        name="pricePerSlot"
                        rules={[{ required: true, message: 'Please input the price per slot!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default GetRooms;
