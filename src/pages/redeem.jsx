import { Box, Button, Input, ListItem, UnorderedList, VStack, Flex, Spacer, Text, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useWrite } from "../hook/useWrite";
import contract from "../constants/contract";
import { getPlantAddress } from "../lib/info";
import { usePublicClient } from "wagmi";
import { parseAbiItem } from "viem";


const RedeemCode = () => {
    const { isConnected } = useAccount()
    const [inputCode, setInputCode] = useState('');
    const [redeemedCodes, setRedeemedCodes] = useState([]);
    const [error, setError] = useState('');
    const publicClient = usePublicClient();
    publicClient.watchEvent({
        pollingInterval:300,
        address: contract.market.address,
        event: parseAbiItem("event CouponUsed(address userAddress, uint256 feedTokens)"),
        onLogs: (logs) => {
            setRedeemedCodes((prev) => {
                const txHash = logs[0].transactionHash;
                const isInserted = prev.find((element) => {
                    return element.txHash == txHash;
                })
                if (!isInserted) {
                    return [...prev, { userAddress: logs[0].args.userAddress, feedTokens: logs[0].args.feedTokens, txHash: txHash },]
                } else return prev;
            });
        },


    })

    useEffect(() => {
        (async () => {
            const logs = await publicClient.getLogs({
                address: contract.market.address,
                event: parseAbiItem("event CouponUsed(address userAddress, uint256 feedTokens)"),
                fromBlock: 0n
            })
            for (let event of logs) {
                setRedeemedCodes((prev) => {
                    const txHash = event.transactionHash;
                    const isInserted = prev.find((element) => {
                        return element.txHash == txHash;
                    })
                    if (!isInserted) {
                        return [...prev, { userAddress: event.args.userAddress, feedTokens: event.args.feedTokens, txHash: txHash },]
                    } else return prev
                })
            }
        })()


    }, [])



    // const validateCode = (code) => {
    //     if (code.length == 6)
    //         return true;
    //     else return false;
    // }
    const handleRedeem = (code) => {
        const alphanumericRegex = /^[a-zA-Z0-9]{6}$/;
        if (code.length == 6 && alphanumericRegex.test(code)) {
            return true;
        }
        return false;
    };
    const redeemCodeTransaction = useWrite({
        abi: contract.market.abi,
        address: contract.market.address,
        args: [inputCode],
        enabled: handleRedeem(inputCode),
        functionName: "useCoupon",
        value: BigInt(0)
    });
    const useCoupon = async () => {
        console.log("codice riscattato");
        //console.log(await getPlantAddress(publicClient))
        await redeemCodeTransaction.write?.();
    };



    const redeemedCount = redeemedCodes.length; // Conteggio dei codici riscattati

    if (isConnected)
        return (
            <Box mx={[4, 8, 16]} my={8}>
                <Text textAlign="center" fontSize={['md', 'lg', 'xl']} mb={4} fontWeight={"bold"}>
                    Redeem a code
                </Text>
                <Flex direction={['column', 'row']} align="center" mb={4}>
                    <Input
                        flex="1"
                        variant="filled"
                        placeholder=""
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        size="sm"
                        mb={[4, 0]}
                    />
                    <Button
                        colorScheme="yellow"
                        onClick={useCoupon}
                        size={['md', 'lg']}
                        ml={[0, 4]}

                    >
                        Redeem
                    </Button>
                </Flex>
                {error && (
                    <Text style={{ color: 'red', textAlign: 'center' }} mb={4}>
                        {error}
                    </Text>
                )}
                <VStack width="100%" align="center" mt={10} textAlign="center">
                    <Text fontSize={['lg', 'xl']} mb={0} fontWeight={"bold"}>
                        History
                    </Text>
                    <UnorderedList styleType="disc" pl={4} fontSize={['md', 'lg']}>
                        {redeemedCodes.map((code, index) => (
                            <ListItem key={index}>{code.userAddress} gained: {code.feedTokens.toString()}</ListItem>
                        ))}
                    </UnorderedList>
                </VStack>
                <Box mt={4} p={3} bg="gray.100" textAlign="center">
                    <Text fontSize={['sm', 'md']}>
                        Number of Redeemed Codes: {redeemedCount}
                    </Text>
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
