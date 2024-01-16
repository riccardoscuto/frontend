import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import database from "../mockup/databaseSearch.json";

export default function Review() {
    const { isConnected } = useAccount()
    const [tag, setTag] = useState("")
    const [elements, setElements] = useState([])
    const searchTag = () => {
        setElements(database.filter((record) => record.tag.includes(tag.toLowerCase())))
    }

    if (isConnected)
        return (
            <Flex alignItems={"start"}>
                <Box p={4} justifyContent={"left"} marginLeft={12}>
                    <Searchbar tag={tag} searchTag={searchTag} setTag={setTag}></Searchbar>
                </Box>
                <Divider></Divider>
                <Stack >{
                    elements && elements.map((element, index) => {
                        return (
                            <Card maxW='sm' key={index}>
                                <CardBody>
                                    <Image
                                        src={element.img}
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md'>Rating: {element.rating}/5</Heading>
                                        <Text>
                                            {element.review}
                                        </Text>
                                        <Text color='blue.600' fontSize='2xl'>
                                        </Text>
                                    </Stack>
                                </CardBody>
                            </Card>
                        );
                    })

                }</Stack>
            </Flex>
        );
};


function Searchbar({ tag, setTag, searchTag }) {
    const handleChange = (e) => { setTag(e.currentTarget.value) }
    return (
        <InputGroup size='md'>
            <Input
                value={tag}
                onChange={handleChange}
                pr='4.5rem'
                placeholder='Blender'
            />
            <InputRightElement width='4.5rem'>
                <Button onClick={searchTag} h='1.75rem' size='sm' >
                    Search
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}