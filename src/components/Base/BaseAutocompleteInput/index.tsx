import { Flex, Text, InputProps as ChakraInputProps } from "@chakra-ui/react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Color } from "../../../enum/Color";

interface InputProps extends ChakraInputProps {
    label?: string;
    value: string;
    setValue: (e: string) => void;
    placeholder?: string;
    width: string;
    suggestions: { id: string; description: string }[];
}

export default function BaseAutocompleteInput(props: InputProps) {
    return (
        <Flex w={props.width} direction='column' gap='0.5rem'>
            <Text>{props.label}</Text>
            <AutoComplete>
                <AutoCompleteInput
                    {...props}
                    variant='filled'
                    w='full'
                    borderRadius='1rem'
                    boxShadow='lg'
                    backgroundColor='#F1F1F1'
                    placeholder={props.placeholder}
                    _focus={{
                        border: "0.2rem solid",
                        borderColor: Color.focusOrange,
                        boxShadow: "lg",
                    }}
                    onChange={(e) => props.setValue(e.target.value)}
                />
                <AutoCompleteList h='10rem'>
                    {props.suggestions.map((product, id) => (
                        <AutoCompleteItem
                            key={id}
                            value={product.description}
                            onClick={() => props.setValue(product.description)}
                        >
                            {product.description}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
        </Flex>
    );
}
