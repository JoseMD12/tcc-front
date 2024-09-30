import { Flex, Grid } from "@chakra-ui/react";
import DescriptionCard from "../DescriptionCard";
import InputText from "../InputText";
import { useState } from "react";

export default function RemoveModal() {
    const [productSearch, setProductSearch] = useState("");
    const items = [
        {
            code: "001",
            description: "Produto 1",
        },
        {
            code: "002",
            description: "Produto 2",
        },
        {
            code: "003",
            description: "Produto 3",
        },
        {
            code: "004",
            description: "Produto 4",
        },
        {
            code: "005",
            description: "Produto 5",
        },
        {
            code: "006",
            description: "Produto 6",
        },
        {
            code: "007",
            description: "Produto 7",
        },
        {
            code: "008",
            description: "Produto 8",
        },
        {
            code: "009",
            description: "Produto 9",
        },
        {
            code: "010",
            description: "Produto 10",
        },
    ];

    const filteredItems = items.filter(
        (product) =>
            product.code.toLowerCase().includes(productSearch.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(productSearch.toLowerCase())
    );
    return (
        <>
            <Flex w='full' h='full' direction='column' gap='2rem' mb='1rem'>
                <InputText
                    value={productSearch}
                    placeholder='Digite o código ou descrição do produto'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductSearch(e.target.value)
                    }
                />

                <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                    {filteredItems.map((product) => (
                        <DescriptionCard
                            key={product.code}
                            label={product.code}
                            description1={product.description}
                            isCreation={false}
                        />
                    ))}
                </Grid>
            </Flex>
        </>
    );
}
