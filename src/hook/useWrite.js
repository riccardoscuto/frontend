import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

export function useWrite(address, abi, functionName, args, enabled, value) {
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

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	})

	return { prepareError, isPrepareError, error, isError, write, isLoading, isSuccess, data }
}