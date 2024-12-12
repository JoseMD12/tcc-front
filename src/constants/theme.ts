import { extendTheme } from "@chakra-ui/react";
// import "@fontsource/ubuntu";

const theme = extendTheme({
    // fonts: {
    //     heading: `"Ubuntu", sans-serif`,
    //     body: `"Ubuntu", sans-serif`,
    // },
    styles: {
        global: {
            "::-webkit-scrollbar": {
                width: "12px",
                backgroundColor: `transparent`,
            },
            "::-webkit-scrollbar-thumb": {
                borderRadius: "4px",
                backgroundColor: `rgb(233, 113, 50)`,
            },
            "::selection": {
                backgroundColor: `rgb(233, 113, 50)`,
                color: `white`,
            },
            // "::-webkit-calendar-picker-indicator": {
            //     backgroundColor: "red",
            //     borderRadius: "100%",
            //     padding: "5px",
            // },
        },
    },
});

export default theme;
