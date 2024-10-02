import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import moment from 'moment';
import { useGetRoomsQuery } from '../../redux/features/Rooms/roomApi';
import { useAddSlotMutation } from '../../redux/features/Slots/slotApi';
import MyForm from '../../components/form/MyForm';
import MySelect from '../../components/form/MySelect';
import MyDatePicker from '../../components/form/MyDatePicker';
import MyTimePicker from '../../components/form/MyTimePicker';
interface Room {
    _id: string;
    name: string;
}
const AddSlot = () => {
    const { data: roomData } = useGetRoomsQuery(undefined);
    const [addSlot] = useAddSlotMutation();

    const roomOptions = roomData?.data?.map(
        (item: Room) => ({
            value: item._id,
            label: `${item?.name}`,
        })
    );

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Submitting data...');

        // Prepare the payload for the API call
        const slotInfo = {
            room: data.room,
            date: data.date?.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            startTime: moment(new Date(data.startTime)).format('HH:mm'),
            endTime: moment(new Date(data.endTime)).format('HH:mm'),
        };

        try {
            // Make the API request
            const res = await addSlot(slotInfo).unwrap();
            console.log('slotInfo', res);

            toast.success('Slot added successfully', { id: toastId, duration: 2000 });
        } catch (err) {
            console.error('Error adding slot:', err);
            toast.error('Failed to add slot', { id: toastId, duration: 2000 });
        }
    };

    return (
        <section className='flex h-[70vh] flex-col justify-center items-center'>
            <h1 className='text-black text-2xl font-bold'>Create Slots</h1>
            <div className='border p-5 w-[600px] mt-5 rounded-md shadow-lg'>
                <MyForm onSubmit={onSubmit}>
                    <MySelect
                        name="room"
                        placeholder="Select Room"
                        label="Select Room"
                        options={roomOptions}
                    />

                    <MyDatePicker name="date" label='Select Date' />

                    <MyTimePicker name='startTime' label='Select Start Time' />
                    <MyTimePicker name='endTime' label='Select End Time' />

                    <button type="submit" className='bg-black py-2 w-40 rounded-md px-5 hover:bg-black text-white mt-4'>
                        Submit
                    </button>
                </MyForm>
            </div>
        </section>
    );
};

export default AddSlot;
