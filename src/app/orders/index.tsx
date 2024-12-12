import { Flex } from "@chakra-ui/react";
import OrderRegistration from "../../components/Cards/Order/OrderRegistration";
import StockProjectionChartCard from "../../components/Cards/Order/StockProjectionChartCard";
import TotalOrders from "../../components/Cards/Order/TotalOrders";

export default function Orders() {
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
                <TotalOrders isSaved={true} />
                <OrderRegistration isSaved={true} />
            </Flex>
            <StockProjectionChartCard isSaved={true} />
        </Flex>
    );
}
