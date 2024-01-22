import contract from "../constants/contract";


export async function getUserInfo(client, addressUser) {
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


export async function getPlantInfo(client, id) {
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
        case BigInt(3):
            return "/plant_lv3.webp"
        case BigInt(4):
            return "/plant_lv4.webp"
        case BigInt(5):
            return "/plant_lv5.webp"
    }

}

export async function getBalance(client, address) {
    try {
        const data = client.readContract({
            address: contract.address,
            abi: contract.abi,
            functionName: "getFeedTokensSinceLastClaim",
            args: [address]
        })
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export function getBorderColor(level) {
    switch (level) {
        case BigInt(1):
            return "level1";
        case BigInt(2):
            return 'level2'; // Change this to the desired color for level 2
        case BigInt(3):
            return 'level3'; // Change this to the desired color for level 3
        case BigInt(4):
            return 'level4'; // Change this to the desired color for level 4
        case BigInt(5):
            return 'level5'; // Change this to the desired color for level 5
            // Add more cases for other levels if needed
        default:

            return 'level1'; // Default color if level is not specified
    }
}