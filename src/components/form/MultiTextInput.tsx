import { useState, useEffect } from 'react';
import { Form, Input, Tag } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
    name: string;
    label?: string;
    resetValues: boolean; // Change this to boolean to trigger reset
    disabled?: boolean;
};

const MultiTextInput = ({ name, label, resetValues, disabled }: TInputProps) => {
    const [inputValue, setInputValue] = useState('');  // For current input value
    const [values, setValues] = useState<string[]>([]);  // For array of values

    // Function to handle adding new value to the array
    const handleAddValue = () => {
        if (inputValue.trim()) {
            setValues([...values, inputValue.trim()]);
            setInputValue('');  // Clear input field after adding
        }
    };

    // Function to remove a value from the array
    const handleRemoveValue = (valueToRemove: string) => {
        setValues(values.filter(value => value !== valueToRemove));
    };

    // Handle Enter press without form submission
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            handleAddValue();
        }
    };

    // Effect to reset values when resetValues prop changes
    useEffect(() => {
        if (resetValues) {
            setInputValue(''); // Clear the input value
            setValues([]);     // Clear the tags
        }
    }, [resetValues]);

    return (
        <Controller
            name={name}
            render={({ field }) => (
                <>
                    <Form.Item label={label}>
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='Add multiple values and press Enter'
                            onKeyDown={handleKeyDown}  // Add value on Enter without form submission
                            size="large"
                            disabled={disabled}
                        />
                    </Form.Item>

                    {/* Displaying the array of added values as tags */}
                    <div style={{ marginBottom: '20px' }}>
                        {values.map((value) => (
                            <Tag
                                key={value}
                                closable
                                onClose={() => handleRemoveValue(value)}
                                style={{ marginBottom: '5px' }}
                            >
                                {value}
                            </Tag>
                        ))}
                    </div>

                    {/* Pass the array of values to react-hook-form as a hidden input */}
                    <input type="hidden" {...field} value={values.join(',')} />
                </>
            )}
        />
    );
};

export default MultiTextInput;
