import { useState } from "react";
import {
	Box, Button, Center, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Text, useColorModeValue }  from "@chakra-ui/react";

const ProfilePage = () => {
  const [username, setUsername] = useState("Test");
  const [image, setImage] = useState("https://via.placeholder.com/200");
  const [isOpen, setIsOpen] = useState(false);

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

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <Box p={4}>
      <Center>
        <Flex direction="column" alignItems="flex-start">
          <Box w="200px" h="200px" borderRadius="full" overflow="hidden" bg={useColorModeValue("gray.200", "gray.700")} mb={3}>
            <img src={image} alt="Profile" style={{ width: "100%" }} />
          </Box>
          <Text mb={2}>{username}</Text>
          <Button size="sm" onClick={handleOpen}>
            Edit
          </Button>
        </Flex>
      </Center>

      <Modal isOpen={isOpen} onClose={handleClose}>
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
            <Button colorScheme="blue" mr={3} onClick={handleClose}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
