import { Flex, Text } from "@chakra-ui/react";
import OptionMenu from "./OptionMenu";
import { LuLayoutDashboard, LuWarehouse } from "react-icons/lu";
import { TbBarcode } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { useState } from "react";

export default function SideBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const options = [
        {
            label: "Dashboard",
            iconPath: <LuLayoutDashboard />,
        },
        {
            label: "Inventário",
            iconPath: <MdOutlineFormatListBulleted />,
        },
        {
            label: "Rastreio",
            iconPath: <TbBarcode />,
        },
        {
            label: "Pedidos",
            iconPath: <FiBox />,
        },
        {
            label: "Depósito",
            iconPath: <LuWarehouse />,
        },
    ];

    return (
        <>
            <Flex
                zIndex={1}
                w='15vw'
                h='100vh'
                backgroundColor='white'
                // boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
                boxShadow='lg'
                pt='3vh'
                justifyContent='center'
            >
                <Flex
                    flexDirection='column'
                    gap='10vh'
                    w='100%'
                    fontSize='1.5rem'
                    fontWeight='bold'
                >
                    <Text alignSelf='center'>J System</Text>

                    <Flex
                        alignSelf='self-start'
                        flexDirection='column'
                        gap='3vh'
                        fontWeight='light'
                        w='full'
                    >
                        {options.map((option, index) => (
                            <OptionMenu
                                key={index}
                                label={option.label}
                                icon={option.iconPath}
                                isActive={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
