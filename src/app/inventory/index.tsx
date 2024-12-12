import { Flex } from "@chakra-ui/react";
import TotalInventory from "../../components/Cards/Inventory/TotalInventory";
import ProductChartCard from "../../components/Cards/Inventory/ProductChartCard";
import ProductRegistration from "../../components/Cards/Inventory/ProductRegistration";

export default function Inventory() {
    return (
        <Flex
            w='100%'
            pt='2rem'
            flexDirection='column'
            alignItems='center'
            gap='2rem'
            px='2.5rem'
            pb='2rem'
        >
            <Flex justifyContent='space-between' w='100%' flexDirection='row'>
                <TotalInventory isSaved={true} />
                <ProductRegistration isSaved={true} />
            </Flex>
            <ProductChartCard isSaved={true} />
        </Flex>
    );
}
