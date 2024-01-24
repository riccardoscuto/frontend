import { useEffect, useState } from "react";
import {
  Box, Button, Center, Flex, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Text, useColorModeValue, StatNumber, useDisclosure, useInterval
} from "@chakra-ui/react";
import { useAccount, usePublicClient } from "wagmi";
import { getBalance, getUserInfo } from "../lib/info";
import contract from "../constants/contract";
import { parseAbi, parseAbiItem } from "viem";


export default function ProfilePage() {
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const [username, setUsername] = useState("Test");
  const [balanceUser, setBalanceUser] = useState(0);
  const [currentBalanceUser, setCurrentBalanceUser] = useState(0);
  const [newPlants, setPlants] = useState([])
  const [newLevels, setLevels] = useState([])

  const [image, setImage] = useState("https://statics.cedscdn.it/photos/MED/41/29/1384129_0151126_cavalloalbalcone.jpg");
  useInterval(() => {

    (async () => {
      const data = await getBalance(publicClient, address);
      const data2 = await getUserInfo(publicClient, address);
      setBalanceUser(data.toString());
      setCurrentBalanceUser(data2[1].toString());
      console.log(data)
      //console.log(data2)
    })()
  }, 500)


  publicClient.watchEvent({
    pollingInterval: 100,
    address: contract.plant.address,
    events: parseAbi(["event NewPlant(address plantOwner, uint256 plantId)", "event LevelUp(uint256 plantId, uint256 newLevel)"]),
    onLogs: (logs) => {
      console.log(logs)
      if (logs[0].eventName == "NewPlant") {
        setPlants((prev) => {
          const txHash = logs[0].transactionHash;
          const isInserted = prev.find((element) => {
            return element.txHash == txHash;
          })
          if (!isInserted) {
            console.log([...prev, { plantId: logs[0].args.plantId, plantOwner: logs[0].args.plantOwner, },])
            return [...prev, { plantId: logs[0].args.plantId, plantOwner: logs[0].args.plantOwner, txHash: txHash },]
          } else return prev;
        });
      } if (logs[0].eventName == "LevelUp") {
        setLevels((prev) => {
          const txHash = logs[0].transactionHash;
          const isInserted = prev.find((element) => {
            return element.txHash == txHash;
          })
          if (!isInserted) {
            console.log([...prev, { plantId: logs[0].args.plantId, newLevel: logs[0].args.newLevel, },])
            return [...prev, { plantId: logs[0].args.plantId, newLevel: logs[0].args.newLevel, txHash: txHash },]
          } else return prev;
        });
      }
    },


  })



  useEffect(() => {
    (async () => {
      const logs = await publicClient.getLogs({
        address: contract.plant.address,
        events: parseAbi(["event NewPlant(address plantOwner, uint256 plantId)", "event LevelUp(uint256 plantId, uint256 newLevel)"]),
        fromBlock: 0n
      })
      for (let event of logs) {
        if (event.eventName == "NewPlant") {
          setPlants((prev) => {
            const txHash = event.transactionHash;
            const isInserted = prev.find((element) => {
              return element.txHash == txHash;
            })
            if (!isInserted) {
              console.log([...prev, { plantId: event.args.plantId, plantOwner: event.args.plantOwner, },])
              return [...prev, { plantId: event.args.plantId, plantOwner: event.args.plantOwner, txHash: txHash },]
            } else return prev;
          });
        } if (event.eventName == "LevelUp") {
          setLevels((prev) => {
            const txHash = event.transactionHash;
            const isInserted = prev.find((element) => {
              return element.txHash == txHash;
            })
            if (!isInserted) {
              console.log([...prev, { plantId: event.args.plantId, newLevel: event.args.newLevel, },])
              return [...prev, { plantId: event.args.plantId, newLevel: event.args.newLevel, txHash: txHash },]
            } else return prev;
          });
        }
      }
    })()
  }, [])



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
              <div>All Claimable Token:{balanceUser}</div> 
              <div>Current Token:{currentBalanceUser}</div>
              <Edit username={username} image={image} setImage={setImage} setUsername={setUsername}></Edit>
            </Flex>
            <Flex flexDirection={"column"}>
              <div> Minted Plants: {
                newPlants && newPlants.map((element, index) => {
                  return (<p key={index}>
                    - New Plants: {element.plantId.toString()} Owner is: {element.plantOwner}
                  </p>)
                })}
              </div>

              <div> Leveled Up Plants: {
                newLevels && newLevels.map((element, index) => {
                  return (<p key={index}>
                    - Plants {element.plantId.toString()} That  Made New Level: {element.newLevel.toString()}
                  </p>)
                })}
              </div>
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
