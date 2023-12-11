import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Box, Flex, IconButton, Image, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, UnorderedList, useDisclosure } from "@chakra-ui/react"

export function ModalStatPlant({ isOpen, onClose, plantImg, plantText, arrayInfo }) {
    return (

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{plantText}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <StatPlant arrayInfo={arrayInfo} plantImg={plantImg} plantText={plantText} />
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}
export default function ModalImg({ info, img, text }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Image onClick={onOpen} src={img} width="100%" height="250px" />
            < ModalStatPlant plantImg={img} plantText={text} arrayInfo={info} isOpen={isOpen} onClose={onClose} />
        </>
    )
}



function StatPlant({ plantImg, plantText, arrayInfo }) {
    return (


        <>
            <Flex>
                <Flex alignItems={"center"}>

                    <IconButton
                        colorScheme='teal'
                        aria-label='Call Segun'
                        size='lg'
                        icon={<ArrowLeftIcon />}
                        onClick={() => { console.log("Change plant") }}
                    />

                </Flex>
                <Flex justifyContent={"space-around"}>

                    <Image src={plantImg} width={180} height={180} />

                    <UnorderedList fontSize={28}  >
                        {
                            arrayInfo && arrayInfo.map((element, index, array) => {
                                return (
                                    <ListItem key={index}>{element}</ListItem>
                                )

                            })
                        }

                    </UnorderedList>



                </Flex>
                <Flex alignItems={"center"}>

                    <IconButton
                        colorScheme='teal'
                        aria-label='Call Segun'
                        size='lg'
                        icon={<ArrowRightIcon />}
                        onClick={() => { console.log("Change plant") }}
                    />
                </Flex>

            </Flex>
        </>




    )
} 
