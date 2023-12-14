import { Box, Button, Input, ListItem, UnorderedList, VStack, Flex, Spacer, Text, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const RedeemCode = () => {
    const { isConnected } = useAccount()
    const [inputCode, setInputCode] = useState('');
    const [redeemedCodes, setRedeemedCodes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedCodes = localStorage.getItem('redeemedCodes');
        if (storedCodes) {
            setRedeemedCodes(JSON.parse(storedCodes));
        }
    }, []);

    const handleRedeem = () => {
        const alphanumericRegex = /^[a-zA-Z0-9]{12}$/;
        if (inputCode.length > 12) {
            const excessDigits = inputCode.length - 12;
            setError(`Enter a 12-character alphanumeric code, you entered ${excessDigits} extra digits`);
        } else if (inputCode.length < 12) {
            const missingDigits = 12 - inputCode.length;
            setError(`Enter a 12-character alphanumeric code, ${missingDigits} digits are missing`);
        } else if (alphanumericRegex.test(inputCode)) {
            const updatedCodes = [...redeemedCodes, inputCode];
            setRedeemedCodes(updatedCodes);
            setError('');
            setInputCode('');

            localStorage.setItem('redeemedCodes', JSON.stringify(updatedCodes));
        } else {
            setError('Enter a 12-character alphanumeric code');
        }
    };

    const redeemedCount = redeemedCodes.length; // Conteggio dei codici riscattati

    if (isConnected)
        return (
            <Box marginLeft={250} marginRight={250}>
                <Text textAlign="center" fontSize="xl" mb={4}>Redeem a code</Text>
                <Flex align="center" mb={4}>
                    <Input flex="1" variant='filled' placeholder='' type="text" value={inputCode} onChange={(e) => setInputCode(e.target.value)} size="sm" />
                    <Button colorScheme='yellow' onClick={handleRedeem} size="md">Redeem</Button>
                </Flex>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <Flex width="100%">
                    <VStack width="100%" align="start" mt={4} textAlign="center">
                        <h2 fontSize="2xl" mb={2}>History</h2>
                        <UnorderedList styleType="disc" pl={4} fontSize="lg">
                            {redeemedCodes.map((code, index) => (
                                <ListItem key={index}>{code}</ListItem>
                            ))}
                        </UnorderedList>
                    </VStack>
                </Flex>
                <Box mt={4} p={3} bg="gray.100" textAlign="center">
                    <Text>Number of Redeemed Codes: {redeemedCount}</Text>
                </Box>
            </Box>
        );
    else return (
        <Flex justifyContent={"center"} >
            <h1>Login required</h1>
        </Flex>
    )
};

export default RedeemCode;
