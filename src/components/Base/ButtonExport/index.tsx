import { Button } from "@chakra-ui/react";
import { RiFileExcel2Fill } from "react-icons/ri";

export default function ButtonExport({
    buttonName,
    hasIcon,
    width,
    onClick,
}: {
    buttonName: string;
    hasIcon?: boolean;
    width: string;
    onClick: () => void;
}) {
    return (
        <Button
            width={width}
            backgroundColor='rgb(241, 241, 241)'
            boxShadow={"md"}
            borderRadius='full'
            gap='0.5rem'
            justifyContent='center'
            alignItems='center'
            fontWeight={400}
            onClick={() => onClick()}
            _hover={{
                cursor: "pointer",
                bg: "rgba(233, 113, 50, 0.25)",
            }}
        >
            {hasIcon && <RiFileExcel2Fill color='rgb(233, 113, 50)' />}
            {buttonName}
        </Button>
    );
}
