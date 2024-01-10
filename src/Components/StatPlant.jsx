import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Image, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, UnorderedList, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useWrite } from '../hook/useWrite';


export default function ModalImg({ info, img, text }) {
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
    const levelUp = async () => {
        console.log("Level Up");
        console.log(error, prepareError);
        await write?.();
        
    };

    return (
        <>
            <Image onClick={onOpen} src={img} width="100%" height="250px" />
            <ModalStatPlant plantImg={img} plantText={text} arrayInfo={info} isOpen={isOpen} onClose={onClose} levelUp={levelUp} />
            {isError && <h1>Error</h1>}
            {isPrepareError && <h1>Prepare Error</h1>}
        </>
    );
}


export function ModalStatPlant({ isOpen, onClose, plantImg, plantText, arrayInfo, levelUp }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{plantText}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <StatPlant arrayInfo={arrayInfo} plantImg={plantImg} plantText={plantText} levelUp={levelUp} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
function StatPlant({ plantImg, plantText, arrayInfo, levelUp }) {
    return (
        <>
            <Flex>
                <Flex alignItems="center">
                    <IconButton
                        colorScheme="teal"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<ArrowLeftIcon />}
                        onClick={() => {
                            console.log("Change plant");
                        }}
                    />
                </Flex>
                <Flex justifyContent="space-around">
                    <Image src={plantImg} width={180} height={180} />
                    <UnorderedList fontSize={28}>
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
                        onClick={() => {
                            console.log("Change plant");
                        }}
                    />
                </Flex>
            </Flex>
            <Flex justifyContent="center">
                <Button onClick={levelUp}>Feed</Button>
            </Flex>
        </>
    );
}
