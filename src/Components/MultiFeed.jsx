import { Button, Checkbox, CheckboxGroup, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";


export default function MultiFeed({ mokupInfo }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Testo </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Testo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CheckboxGroup colorScheme='green' >
                            <Stack spacing={[1, 3]} direction={['row', 'column']}>
                                {
                                    mokupInfo && mokupInfo.map((element, index) => {
                                        return (
                                            <Card key={index} padding={2} >
                                                <Checkbox value={element.text} >
                                                    <Image width="40px" src={element.img} />
                                                    {element.text + " " + element.info[0]}
                                                </Checkbox>
                                            </Card>
                                        )
                                    })
                                }
                            </Stack>
                        </CheckboxGroup>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}