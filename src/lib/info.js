import contract from "../constants/contract";


export function getUserInfo(client, addressUser) {
    try {
        const data = client.readContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "getUserInfo",
            args: [addressUser]
        })
        return data;

    } catch (error) {
        console.log(error)
        return null;
    }
}


export function getPlantInfo(client, id) {
    try {
        const data = client.readContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "getPlantInfo",
            args: [id]
        })
        return data;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export function getPlantImage(level) {
    switch (level) {
        case BigInt(1):
            return "/plant_lv1.webp"
        case BigInt(2):
            return "/plant_lv2.webp"
    }

}