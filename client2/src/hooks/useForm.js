const useForm = (values, setValues) => {

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return {
        handleChange
    };
};

export default useForm;