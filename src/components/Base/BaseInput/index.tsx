import {
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { Color } from "../../../enum/Color";
import { BsSearch } from "react-icons/bs";

interface InputProps extends ChakraInputProps {
    label?: string;
    value: string;
    placeholder?: string;
    width: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasIcon?: boolean;
}

export default function BaseInput(props: InputProps) {
    return (
        <>
            <Flex gap='0.5rem' direction='column' w={props.width}>
                <Text>{props.label}</Text>
                <InputGroup>
                    <Input
                        {...props}
                        w='full'
                        borderRadius='1rem'
                        boxShadow='lg'
                        backgroundColor='#F1F1F1'
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        _focus={{
                            border: "0.2rem solid",
                            borderColor: Color.focusOrange,
                            boxShadow: "lg",
                        }}
                    />
                    {props.hasIcon ? (
                        <InputRightElement children={<BsSearch />} />
                    ) : null}
                </InputGroup>
            </Flex>
        </>
    );
}
