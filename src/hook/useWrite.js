import { useToast } from "@chakra-ui/react";
import { useEffect } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

export function useWrite({ address, abi, functionName, args, enabled, value }) {
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: functionName,
        args: args,
        enabled: enabled,
        value: value
    })
    const { data, error, isError, write } = useContractWrite(config)
    const toast = useToast();
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data ? data.hash : undefined,
    })
    useEffect(() => {
        if (data && data.hash)
            toast({
                title: 'Transaction ' + functionName + ' executed ' + data.hash,
                description: "Success!",
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
    }, [data])


    useEffect(() => {

        if (error)
            toast({
                title: 'Errore while preparing transaction ' + error.name,
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
    }, [prepareError, error])
    return { prepareError, isPrepareError, error, isError, write, isLoading, isSuccess, data }
}