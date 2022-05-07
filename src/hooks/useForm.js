import { useState } from "react";

export function useForm(inputs = {}){
    const [formState, setFormState] = useState(inputs);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => {
            return { ...prevState, [name]: value }
        });
    };

    return { formState, handleFormChange };
}
