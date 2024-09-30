import { Flex, Text } from "@chakra-ui/react";

export default function TopBar() {
    return (
        <>
            <Flex
                zIndex={0}
                w='85vw'
                h='12vh'
                pl='2vw'
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
                    Dashboard
                </Text>
            </Flex>
        </>
    );
}
