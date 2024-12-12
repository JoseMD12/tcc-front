import {
    Flex,
    Input,
    InputGroup,
    Text,
    InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { Color } from "../../../enum/Color";

interface InputProps extends Omit<ChakraInputProps, "onChange"> {
    label?: string;
    value: string;
    placeholder?: string;
    width: string;
    onChange: (e: string) => void;
    hasIcon?: boolean;
}

export default function BaseDateInput(props: InputProps) {
    return (
        <>
            <Flex gap='0.5rem' direction='column' w={props.width}>
                <Text>{props.label}</Text>
                <InputGroup>
                    <Input
                        {...props}
                        w='100%'
                        borderRadius='1rem'
                        boxShadow='lg'
                        backgroundColor='#F1F1F1'
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        color='#718096'
                        _focus={{
                            border: "0.2rem solid",
                            borderColor: Color.focusOrange,
                            boxShadow: "lg",
                        }}
                        size='md'
                        type='date'
                    />
                </InputGroup>
            </Flex>
        </>
    );
}
