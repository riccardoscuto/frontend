import { useState } from "react";
import {
  Box, Button, Center, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Text, useColorModeValue, StatNumber, useDisclosure
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

export default function ProfilePage() {
  const { isConnected } = useAccount()
  const [username, setUsername] = useState("Test");
  const [image, setImage] = useState("https://via.placeholder.com/200");

  if (isConnected)
    return (
      <Flex alignItems={"start"}>
        <Box p={4} justifyContent={"left"} marginLeft={12}>
          <Center>
            <Flex direction="column" alignItems="flex-start">
              <Box w="200px" h="200px" borderRadius="full" overflow="hidden" bg={useColorModeValue("gray.200", "gray.700")} mb={3}>
                <img src={image} alt="Profile" style={{ width: "100%" }} />
              </Box>
              <Text mb={2}>{username}</Text>
              <StatToken></StatToken>
              <Edit username={username} image={image} setImage={setImage} setUsername={setUsername}></Edit>
            </Flex>
          </Center>

        </Box>
      </Flex>
    );
};


function StatToken() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Stat token </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stat Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function Edit( {username, image, setImage, setUsername} ) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Flex alignItems="center">
                <Text mr={2}>Username:</Text>
                <Input value={username} onChange={handleUsernameChange} placeholder="Enter your username" size="sm" w="200px" />
              </Flex>
              <Flex alignItems="center">
                <Text mr={2}>Upload Image:</Text>
                <Input type="file" onChange={handleImageChange} size="sm" w="200px" />
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
