import { Flex } from "@chakra-ui/react";
import TotalInventory from "../../components/Cards/Inventory/TotalInventory";
import ProductRegistration from "../../components/Cards/Deposit/DepositRegistration";

export default function DataArea() {
    return (
        <Flex
            zIndex={2}
            position={"absolute"}
            w='85vw'
            pt='5vh'
            justifyContent='space-around'
            marginTop={"12vh"}
        >
            <TotalInventory isSaved={true} />
            <ProductRegistration isSaved={true} />
        </Flex>
    );
}
