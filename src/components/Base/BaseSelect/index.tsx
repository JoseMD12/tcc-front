import { Flex, Select, Text } from "@chakra-ui/react";
import { Color } from "../../../enum/Color";

interface SelectProps {
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    width: string;
    options: { enum: string; description: string }[];
}

export default function BaseSelect(props: SelectProps) {
    return (
        <Flex gap='0.5rem' direction='column' w='full'>
            <Text>{props.label}</Text>
            <Select
                w='full'
                borderRadius='1rem'
                boxShadow='lg'
                backgroundColor='#F1F1F1'
                color='#718096'
                _focus={{
                    border: "0.2rem solid",
                    borderColor: Color.focusOrange,
                    boxShadow: "lg",
                }}
                onChange={(e) => {
                    props.setValue(e.target.value);
                }}
                value={props.value}
            >
                {props.options.map((deposit, index) => (
                    <option key={index} value={deposit.enum}>
                        {deposit.description}
                    </option>
                ))}
            </Select>
        </Flex>
    );
}
