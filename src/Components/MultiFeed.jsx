// import { Button, Checkbox, CheckboxGroup, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useWrite } from "../hook/useWrite";
// import contract from "../constants/contract";


// export default function MultiFeed({ mokupInfo }) {
//     const [arraySelected, setArraySelected] = useState([]);
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const { write, error, prepareError, isError, isPrepareError } = useWrite({
//         abi: contract.abi,
//         address: contract.address,
//         args: [],
//         enabled: true,
//         functionName: "levelUp",
//         value: BigInt(0)
//     });

//     useEffect(() => {
//         setArraySelected(Array(mokupInfo.length).fill(false))
//     },
//         [])

//     const submit = () => { write?.(); }
//     const selectOnePlant = (index) => {
//         const aux = arraySelected;
//         aux[index] = !aux[index];
//         setArraySelected([...aux])
//     }
//     const selectAll = () => {
//         setArraySelected([...arraySelected.map((e) => { return true })])
//     };

//     return (
//         <>
//             <Button onClick={onOpen}>Multiple Feed </Button>
//             <Modal isOpen={isOpen} onClose={onClose} size="lg">
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Choose the plants to feed</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Stack spacing={[1, 3]} direction={'column'}>
//                             <Card key={-1} padding={2}>
//                                 <Button onClick={selectAll}>Select All</Button>
//                                 <Button mt={1} onClick={submit}>Submit</Button>
//                             </Card>
//                             {mokupInfo &&
//                                 arraySelected.length > 0 &&
//                                 mokupInfo.map((element, index) => {
                                    
//                                     return (
//                                         <Card key={index} padding={2}>
//                                             <Checkbox
//                                                 value={element.text}
//                                                 isChecked={arraySelected[index]}
//                                                 onChange={() => {
//                                                     selectOnePlant(index);
//                                                 }}
//                                             >
//                                                 <Image width="40px" src={element.img} />
//                                                 {element.text + ' ' + element.info[0]}
//                                             </Checkbox>
//                                         </Card>
//                                     );
//                                 })}
//                         </Stack>
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// };
