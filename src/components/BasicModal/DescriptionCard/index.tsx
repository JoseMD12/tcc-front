import { Flex, Text } from "@chakra-ui/react";
import { Color } from "../../../enum/Color";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { useState } from "react";

interface DescriptionCardProps {
    label: string;
    description1: string;
    description2?: string;
    isCreation: boolean;
    handleDelete?: () => void;
    handleEdit?: () => void;
}

export default function DescriptionCard(props: DescriptionCardProps) {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <>
            <Flex
                w='full'
                h='6rem'
                direction='column'
                overflow='hidden'
                backgroundColor={Color["cardGray"]}
                boxShadow={"lg"}
                borderRadius='0.8rem'
                outline={
                    isSelected || props.isCreation
                        ? `0.1rem solid ${Color["orange"]}`
                        : ""
                }
                justifyContent='center'
                px='1.25rem'
                py='0.25rem'
            >
                <Flex alignItems={"center"} fontSize='1rem'>
                    <Text w='70%' fontSize='1rem' fontWeight='bold' isTruncated>
                        {props.label}
                    </Text>

                    {props.isCreation ? (
                        <>
                            <Flex
                                w='30%'
                                justifyContent={"flex-end"}
                                color={Color["orange"]}
                                gap='0.4rem'
                            >
                                <Flex
                                    _hover={{
                                        backgroundColor: Color["focusOrange"],
                                        borderRadius: "0.5rem",
                                    }}
                                    cursor={"pointer"}
                                >
                                    <MdOutlineModeEdit
                                        onClick={() =>
                                            props.handleEdit &&
                                            props.handleEdit()
                                        }
                                    />
                                </Flex>

                                <Flex
                                    _hover={{
                                        backgroundColor: Color["focusOrange"],
                                        borderRadius: "0.5rem",
                                    }}
                                    cursor={"pointer"}
                                >
                                    <LuTrash
                                        onClick={() =>
                                            props.handleDelete &&
                                            props.handleDelete()
                                        }
                                    />
                                </Flex>
                            </Flex>
                        </>
                    ) : (
                        <Flex
                            w='30%'
                            justifyContent={"flex-end"}
                            color={
                                isSelected ? Color["orange"] : Color["darkGray"]
                            }
                            gap='0.4rem'
                        >
                            <Flex
                                _hover={{
                                    backgroundColor: Color["focusOrange"],
                                    borderRadius: "0.5rem",
                                }}
                                onClick={() => setIsSelected(!isSelected)}
                                cursor={"pointer"}
                            >
                                {isSelected ? (
                                    <FaRegCheckSquare />
                                ) : (
                                    <FaRegSquare />
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Flex>

                <Text fontSize='0.9rem' isTruncated>
                    {props.description1}
                </Text>

                {props.description2 ? (
                    <Text fontSize='0.9rem'>{props.description2}</Text>
                ) : null}
            </Flex>
        </>
    );
}
