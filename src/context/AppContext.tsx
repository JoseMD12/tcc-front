import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";

type AppContextType = {
    wasTagRead: boolean;
    setWasTagRead: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType>({
    wasTagRead: false,
    setWasTagRead: () => {},
});

export const AppProvider = ({ children }: React.PropsWithChildren) => {
    const [wasTagRead, setWasTagRead] = useState(false);

    useEffect(() => {
        const socket: Socket = io("ws://localhost:3000");

        socket.on("event-update", (data) => {
            if (data === "0") {
                console.log("Tag lida");
                setWasTagRead(true);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <AppContext.Provider value={{ wasTagRead, setWasTagRead }}>
            {children}
        </AppContext.Provider>
    );
};
