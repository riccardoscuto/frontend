import { Button, Checkbox, CheckboxGroup, Image, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";


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
                            <Stack spacing={[1, 5]} direction={['row', 'column']}>
                                {
                                    mokupInfo && mokupInfo.map((element, index) => {
                                        return (
                                            <Checkbox value={element.text} key={index}>
                                                <Image width="40px" src={element.img} />
                                                {element.text + " " + element.info[0]}
                                            </Checkbox>
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