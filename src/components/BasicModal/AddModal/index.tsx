import { Button, Flex, Grid } from "@chakra-ui/react";
import InputText from "../InputText";
import { Color } from "../../../enum/Color";
import { FaPlus } from "react-icons/fa6";
import DescriptionCard from "../DescriptionCard";
import { useState } from "react";
import { ProductDTO } from "../../../dtos/ProductDTO";
import { useToast } from "@chakra-ui/react";

interface AddModalProps {
    descriptionCardsList: ProductDTO[];
    setDescriptionCardsList: (value: ProductDTO[]) => void;
}

export default function AddModal(props: AddModalProps) {
    const [productCode, setProductCode] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const toast = useToast();

    const forms = [
        {
            label: "Código do Produto",
            value: productCode,
            setValue: setProductCode,
        },
        {
            label: "Descrição do Produto",
            value: productDescription,
            setValue: setProductDescription,
        },
    ];

    const handleClick = () => {
        if (productCode === "" || productDescription === "") {
            toast({
                title: "Erro ao adicionar produto",
                description:
                    "O código e a descrição do produto são obrigatórios.",
                status: "error",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        props.setDescriptionCardsList([
            ...props.descriptionCardsList,
            {
                code: productCode,
                description: productDescription,
            },
        ]);

        setProductCode("");
        setProductDescription("");
    };

    const handleDelete = (index: number) => {
        const newDescriptionCardsList = props.descriptionCardsList.filter(
            (_, i) => i !== index
        );

        console.log(index);
        props.setDescriptionCardsList(newDescriptionCardsList);
    };

    const handleEdit = (index: number) => {
        const descriptionCard = props.descriptionCardsList[index];
        setProductCode(descriptionCard.code);
        setProductDescription(descriptionCard.description);

        handleDelete(index);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleClick();
        }
    };

    return (
        <>
            <Flex
                w='full'
                h='full'
                direction='column'
                gap='2rem'
                mb='1rem'
                onKeyDown={handleKeyPress}
            >
                <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                    {props.descriptionCardsList.map((product, index) => (
                        <DescriptionCard
                            key={index}
                            label={product.code}
                            description1={product.description}
                            isCreation={true}
                            handleDelete={() => handleDelete(index)}
                            handleEdit={() => handleEdit(index)}
                        />
                    ))}
                </Grid>

                {forms.map((form, index) => (
                    <InputText
                        key={index}
                        label={form.label}
                        value={form.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            form.setValue(e.target.value)
                        }
                    />
                ))}
                <Flex w='50%'>
                    <Button
                        leftIcon={<FaPlus />}
                        backgroundColor={Color["gray"]}
                        boxShadow='lg'
                        onClick={handleClick}
                        mb='1rem'
                        isDisabled={
                            productCode === "" || productDescription === ""
                        }
                    >
                        Adicionar
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}
