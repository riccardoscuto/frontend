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
            <>
                <Flex justifyContent="center">
                    <Text fontSize={['xl', '2xl', '3xl']} mb={8} fontWeight="bold" marginTop={2}>
                        Find A Review!
                    </Text>
                </Flex>

                <Flex justifyContent="center" alignItems="start" mb={8}>
                    <Box p={4}>
                        <Searchbar tag={tag} searchTag={searchTag} setTag={setTag}></Searchbar>
                    </Box>
                </Flex>
                <Divider></Divider>

                <Flex justifyContent="center" mt={8}>
                    <Stack direction="row" spacing={4}>{
                        elements && elements.map((element, index) => {
                            return (
                                <Card maxW='sm' key={index}>
                                    <CardBody>
                                        <Image
                                            src={element.img}
                                            alt='Immagine'
                                            borderRadius='lg'
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading>{element.review}</Heading>
                                            <Heading size='md'>Product Name: </Heading>
                                            <Text color="#505423">{element.name}</Text>
                                            <Heading size='md'>Rating: {element.rating}/5</Heading>

                                            <Text color='blue.600' fontSize='2xl'></Text>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            );
                        })
                    }</Stack>
                </Flex>
            </>
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