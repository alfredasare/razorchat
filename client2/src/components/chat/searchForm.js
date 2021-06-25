import {useState} from "react";
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import SearchIcon from "./svg/searchIcon";
import useForm from "../../hooks/useForm";

const SearchForm = () => {
    const [formData, setFormData] = useState("");

    const {handleChange} = useForm(formData, setFormData);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon/>}
                    mt={2.5}
                    ml={1}
                />
                <Input
                    type="input"
                    placeholder="Search"
                    borderRadius={50}
                    px={8}
                    py={7}
                    _focus={{
                        borderColor: "brand.200",
                        boxShadow: "0 0 0 1px #000000 !important",
                        zIndex: 1
                    }}
                    onChange={handleChange}
                />
            </InputGroup>
        </form>
    );
};

export default SearchForm;