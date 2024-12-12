import { Flex } from "@chakra-ui/react";
import DepositRegistration from "../../components/Cards/Deposit/DepositRegistration";
import DepositType from "../../components/Cards/Deposit/DepositType";
import DepositChartCard from "../../components/Cards/Deposit/DepositChartCard";

export default function Deposit() {
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
                <DepositRegistration isSaved />
                <DepositType isSaved />
            </Flex>
            <Flex justifyContent='space-between' w='100%' flexDirection='row'>
                <DepositChartCard isSaved />
            </Flex>
        </Flex>
    );
}
