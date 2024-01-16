import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Image, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, UnorderedList, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useWrite } from '../hook/useWrite';


export default function ModalImg({ info, img, text , onOpen}) {
    
    return (
        <>
            <Image onClick={onOpen} src={img} width="100%" height="200px" transform={"scale(0.8, 0.9)"} />
        </>
    );
}


export function ModalStatPlant({ isOpen, onClose, plant, levelUp, switchLeft, switchRight }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{plant.text}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <StatPlant arrayInfo={plant.info} plantImg={plant.img} plantText={plant.text} levelUp={levelUp} switchLeft={switchLeft} switchRight={switchRight} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
function StatPlant({ plantImg, plantText, arrayInfo, levelUp, switchLeft, switchRight }) {
    return (
        <>
            <Flex justifyContent={'space-between'} direction={'row'}>
                <Flex alignItems="center">
                    <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<ArrowLeftIcon />}
                        onClick={switchLeft} 
                    />
                </Flex>
                <Flex justifyContent="space-around">
                    <Image src={plantImg} width={150} height={150} />
                    <UnorderedList fontSize={16}>
                        {arrayInfo &&
                            arrayInfo.map((element, index) => {
                                return <ListItem key={index}>{element}</ListItem>;
                            })}
                    </UnorderedList>
                </Flex>
                <Flex alignItems="center">
                    <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"

                        size="lg"
                        icon={<ArrowRightIcon />}
                        onClick={switchRight}
                    />
                </Flex>
            </Flex>
            <Flex justifyContent="center">
                <Button onClick={levelUp}>Feed</Button>
            </Flex>
        </>
    );
}
