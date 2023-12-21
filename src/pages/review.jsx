import { Box, Button, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Rewiev() {
    const { isConnected } = useAccount()


    if (isConnected)
        return (
            <Flex alignItems={"start"}>
                <Box p={4} justifyContent={"left"} marginLeft={12}>
                    <Searchbar></Searchbar>

                </Box>
            </Flex>
        );
};


function Searchbar() {
    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                placeholder='Blender'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' >
                    Search
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}