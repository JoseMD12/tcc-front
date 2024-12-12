import { Flex } from "@chakra-ui/react";
import MovimentChartCard from "../../components/Cards/Tracking/MovimentChartCard";
import TrackTagCard from "../../components/Cards/Tracking/TrackTagCard";

export default function Tracking() {
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
            <MovimentChartCard isSaved={true} />
            <Flex justifyContent='space-between' w='100%' flexDirection='row'>
                <TrackTagCard isSaved={true} />
            </Flex>
        </Flex>
    );
}
