import { Button, Table, TableColumnsType, Modal, Form, Input, TimePicker, Popconfirm, message, InputNumber } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDeleteSlotMutation, useGetSlotsQuery, useUpdateSlotMutation } from '../../redux/features/Slots/slotApi'; // Replace with actual slotApi import

export type TSlotData = {
    date: string;
    startTime: string;
    endTime: string;
    roomName: string;
    pricePerSlot: number;
};

interface SlotTable {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
    room: {
        name: string;
        pricePerSlot: number;
    };
}

const GetSlots = () => {
    const { data: slotData, isFetching } = useGetSlotsQuery(undefined);
    const [selectedSlot, setSelectedSlot] = useState<SlotTable | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [updateSlot] = useUpdateSlotMutation();
    const [deleteSlot] = useDeleteSlotMutation();

    // Open update modal with the selected slot's data
    const handleUpdate = (record: SlotTable) => {
        setSelectedSlot(record);
        form.setFieldsValue({
            date: record.date,
            startTime: dayjs(record.startTime, 'HH:mm'),
            endTime: dayjs(record.endTime, 'HH:mm'),
        });
        setIsModalVisible(true);
    };

    const handleUpdateSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                date: values.date,
                startTime: values.startTime.format('HH:mm'),
                endTime: values.endTime.format('HH:mm'),
            };
            if (selectedSlot?._id) {
                await updateSlot({ slotId: selectedSlot._id, slotInfo: formattedValues });
                message.success('Slot updated successfully');
                setIsModalVisible(false);
                setSelectedSlot(null); // Reset after successful update
            } else {
                message.error('Slot ID is missing.');
            }
        } catch (error) {
            message.error('Failed to update slot');
        }
    };

    // Handle slot deletion
    const handleDelete = async (slotId: string) => {
        try {
            await deleteSlot(slotId);
            message.success('Slot deleted successfully');
        } catch (error) {
            console.log(error);
            message.error('Failed to delete slot');
        }
    };

    const tableData = slotData?.data?.map(
        ({ _id, date, startTime, endTime, room }: SlotTable) => ({
            _id: _id, // Ensure the key is set to the slot's _id
            date,
            startTime,
            endTime,
            roomName: room?.name,  // Access room name
            pricePerSlot: room?.pricePerSlot,  // Access price per slot
        })
    );

    const columns: TableColumnsType<TSlotData> = [
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: 'Start Time',
            key: 'startTime',
            dataIndex: 'startTime',
        },
        {
            title: 'End Time',
            key: 'endTime',
            dataIndex: 'endTime',
        },
        {
            title: 'Room Name',
            key: 'roomName',
            dataIndex: 'roomName',
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
            render: (item: SlotTable) => (
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
                        title="Are you sure to delete this slot?"
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
            <h1 className="text-2xl font-bold">Slot Information</h1>
            <Table loading={isFetching} columns={columns} dataSource={tableData} />

            {/* Update Slot Modal */}
            <Modal
                title="Update Slot"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleUpdateSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please input the slot date!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[{ required: true, message: 'Please input the start time!' }]}
                    >
                        <TimePicker format="HH:mm" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="End Time"
                        name="endTime"
                        rules={[{ required: true, message: 'Please input the end time!' }]}
                    >
                        <TimePicker format="HH:mm" style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default GetSlots;
