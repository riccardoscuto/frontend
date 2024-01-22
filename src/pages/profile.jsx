import { useState } from "react";
import {
  Box, Button, Center, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Text, useColorModeValue, StatNumber, useDisclosure, useInterval
} from "@chakra-ui/react";
import { useAccount, usePublicClient } from "wagmi";
import { getBalance, getUserInfo } from "../lib/info";


export default function ProfilePage() {
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const [username, setUsername] = useState("Test");
  const [balanceUser, setBalanceUser] = useState(0);
  const [currentBalanceUser, setCurrentBalanceUser] = useState(0);
  const [image, setImage] = useState("https://via.placeholder.com/200");
  useInterval(() => {

    (async () => {
      const data = await getBalance(publicClient, address);
      const data2 = await getUserInfo(publicClient, address);
      setBalanceUser(data.toString());
      setCurrentBalanceUser(data2[1].toString());
      //console.log(data)
      //console.log(data2)
    })()
  }, 500)


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
              <div>All Token:{balanceUser}</div>
              <div>Current Token:{currentBalanceUser}</div>
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
      <Button mb={1} onClick={onOpen}>Stat token </Button>
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

function Edit({ username, image, setImage, setUsername }) {
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
              <Flex justifyContent={"start"} gap={4} alignItems="center">
                <Text >Username:</Text>
                <Input value={username} onChange={handleUsernameChange} placeholder="Enter your username" size="sm" />
              </Flex>
              <Flex justifyContent={"start"} gap={4} alignItems="center">
                <Text w={"10rem"} >Upload Image:</Text>
                <Input p={0.5} type="file" onChange={handleImageChange} size="sm" />
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
