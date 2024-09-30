import { Flex } from "@chakra-ui/react";
import TotalInventory from "../Cards/TotalInventory";
import ProductRegistration from "../Cards/ProductRegistration";

export default function DataArea() {
    return (
        <Flex
            zIndex={2}
            position={"absolute"}
            w='85vw'
            h='88vh'
            // alignItems='center'
            pt='5vh'
            justifyContent='space-around'
            marginTop={"12vh"}
            marginLeft={"15vw"}
        >
            <TotalInventory data={1} isSaved={true} />
            <ProductRegistration data={1} isSaved={true} />
        </Flex>
    );
}
