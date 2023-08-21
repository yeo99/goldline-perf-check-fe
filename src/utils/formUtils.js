import { useState } from 'react';

// onChange에 걸어서 form 변경을 감지
export const useForm = intialValues => {
    const [formData, setFormData] = useState(intialValues);

    const handleInputChange = e => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    return { formData, handleInputChange };
}

// form이 비어있는지 체크. 인자로 requiredFields를 명시해줌
export const checkEmptyFields = (formData, requiredFields) => {
    for (let field of requiredFields) {
        if (!formData[field.key]) {
            return `${field.label}를(을) 입력해주세요.`;
        }
    }
    return null;
}