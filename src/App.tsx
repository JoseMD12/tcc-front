import { Flex } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import DataArea from "./components/DataArea";

function App() {
    return (
        <Flex w='100%' h='100%' backgroundColor='#D9D9D9' overflowY='hidden'>
            <SideBar />
            <TopBar />
            <DataArea />
        </Flex>
    );
}

export default App;
