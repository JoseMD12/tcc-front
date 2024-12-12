import { Flex, Text } from "@chakra-ui/react";
import OptionMenu from "./OptionMenu";
import { LuWarehouse } from "react-icons/lu";
import { TbBarcode } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [labelSelected, setLabelSelected] = useState("Inventário");

    const options = [
        // {
        //     label: "Dashboard",
        //     iconPath: <LuLayoutDashboard />,
        //     path: "/",
        // },
        {
            label: "Inventário",
            iconPath: <MdOutlineFormatListBulleted />,
            path: "/inventory",
        },
        {
            label: "Rastreio",
            iconPath: <TbBarcode />,
            path: "/tracking",
        },
        {
            label: "Depósito",
            iconPath: <LuWarehouse />,
            path: "/deposit",
        },
        {
            label: "Pedidos",
            iconPath: <FiBox />,
            path: "/orders",
        },
    ];

    return (
        <Flex flexDirection='row' height='100%' minH='100vh'>
            <Flex
                zIndex={1}
                w='15vw'
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
                    <Text alignSelf='center'>SCM - RFID</Text>

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
                                onClick={() => {
                                    setActiveIndex(index);
                                    navigate(option.path);
                                    setLabelSelected(option.label);
                                }}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection='column'>
                <Flex
                    zIndex={0}
                    w='85vw'
                    h='12vh'
                    pl='4rem'
                    alignItems='center'
                    backgroundColor='white'
                    boxShadow='lg'
                >
                    <Text
                        style={{
                            fontWeight: "lighter",
                            fontSize: "1.5rem",
                        }}
                    >
                        {labelSelected === "/" ? "Inventário" : labelSelected}
                    </Text>
                </Flex>
                <Flex>{children}</Flex>
            </Flex>
        </Flex>
    );
}
