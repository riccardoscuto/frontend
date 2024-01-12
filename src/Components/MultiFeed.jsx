import { Button, Checkbox, CheckboxGroup, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWrite } from "../hook/useWrite";


export default function MultiFeed({ mokupInfo }) {
    const [arraySelected, setArraySelected] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { write, error, prepareError, isError, isPrepareError } = useWrite({
        abi: [{
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        args: [],
        enabled: true,
        functionName: "unpause",
        value: BigInt(0)
    });

    useEffect(() => {
        setArraySelected(Array(mokupInfo.length).fill(false))
    },
        [])

    const submit =() => {write?.();}
    const selectOnePlant = (index) => {
        const aux = arraySelected;
        aux[index] = !aux[index];
        setArraySelected([...aux])
    }
    const selectAll = () => {
        setArraySelected([...arraySelected.map((e) => { return true })])
    };

    return (
        <>
            <Button onClick={onOpen}>Multiple Feed </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Choose the plants to feed</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Stack spacing={[1, 3]} direction={['row', 'column']}>
                            <Card key={-1} padding={2} >
                                <Button onClick={selectAll} >
                                    Select All
                                </Button>
                                <Button onClick={submit}>
                                    Submit
                                </Button>
                            </Card>
                            {
                                mokupInfo && arraySelected.length > 0 && mokupInfo.map((element, index) => {
                                    console.log("selected", arraySelected[index]);
                                    return (
                                        <Card key={index} padding={2} >
                                            <Checkbox value={element.text} isChecked={arraySelected[index]} onChange={() => { selectOnePlant(index) }}  >
                                                <Image width="40px" src={element.img} />
                                                {element.text + " " + element.info[0]}
                                            </Checkbox>
                                        </Card>
                                    )
                                })
                            }
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}