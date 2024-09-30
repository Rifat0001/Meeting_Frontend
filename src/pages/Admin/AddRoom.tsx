import { useState } from 'react';
import { toast } from 'sonner';
import MyForm from '../../components/form/MyForm';
import NormalInput from '../../components/form/NormalInput';
import { FieldValues } from 'react-hook-form';
import { useAddRoomMutation } from '../../redux/features/Rooms/roomApi';

const AddRoom = () => {
    const [addRoom] = useAddRoomMutation();
    const [imageFiles, setImageFiles] = useState<File[]>([]); // State to hold selected image files

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImageFiles(Array.from(files)); // Convert FileList to an array
        }
    };

    const uploadImages = async (): Promise<string[]> => {
        const uploadedImageUrls: string[] = [];

        for (const file of imageFiles) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=5c40203aad8639e33c1250f5a9d9d2d4`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const data = await response.json();
                uploadedImageUrls.push(data.data.url); // Store the uploaded image URL
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error('Failed to upload images');
            }
        }
        return uploadedImageUrls;
    };

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Submitting data...');

        try {
            // Upload images first and get their URLs
            const imageUrls = await uploadImages();

            if (imageUrls.length === 0) {
                toast.error('Please upload images', { id: toastId });
                return;
            }

            // Convert string values to numbers and handle amenities
            const amenitiesArray = data.amenities
                .split(',')
                .map((amenity: string) => amenity.trim());

            const roomInfo = {
                name: data.name,
                roomNo: Number(data.roomNo),
                floorNo: Number(data.floorNo),
                capacity: Number(data.capacity),
                pricePerSlot: Number(data.pricePerSlot),
                amenities: amenitiesArray,
                images: imageUrls, // Include uploaded image URLs
            };

            // Trigger the mutation
            const res = await addRoom(roomInfo).unwrap();
            console.log('roomInfo', res);

            // Reset the imageFiles and clear the file input field
            setImageFiles([]); // Clear image files state
            (document.getElementById("image-upload") as HTMLInputElement).value = ""; // Reset file input

            toast.success('Room added successfully', { id: toastId, duration: 2000 });
        } catch (err) {
            console.error('Error adding room:', err);
            toast.error('Failed to add room', { id: toastId, duration: 2000 });
        }
    };

    return (
        <section className='flex h-[100vh] flex-col justify-center items-center'>
            <h1 className='text-black text-2xl font-bold'>Add Rooms</h1>
            <div className='border p-5 w-[600px] mt-5 rounded-md shadow-lg'>
                <MyForm onSubmit={onSubmit}>
                    <NormalInput type="text" name="name" label="Name" />
                    <NormalInput type="number" name="roomNo" label="Room No" />
                    <NormalInput type="number" name="floorNo" label="Floor No" />
                    <NormalInput type="number" name="capacity" label="Capacity" />
                    <NormalInput type="number" name="pricePerSlot" label="Price Per Slot" />
                    <NormalInput type="text" name="amenities" label="Amenities (comma-separated)" />

                    {/* Image upload input */}
                    <div className='mt-4'>
                        <label className='block text-sm font-medium text-gray-700'>Upload Images</label>
                        <input
                            id="image-upload"
                            type="file"
                            onChange={handleImageChange}
                            multiple // Allow multiple file uploads
                            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                        />
                    </div>

                    <button type="submit" className='bg-black py-2 w-40 rounded-md px-5 hover:bg-black text-white mt-4'>
                        Submit
                    </button>
                </MyForm>
            </div>
        </section>
    );
};

export default AddRoom;
