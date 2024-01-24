import contract from "../constants/contract";


export async function getUserInfo(client, addressUser) {
    try {
        const data = client.readContract({
            address: contract.plant.address,
            abi: contract.plant.abi,
            functionName: "getUserInfo",
            args: [addressUser]
        })
        return data;

    } catch (error) {
        console.log(error)
        return null;
    }
}
export async function getPlantAddress(client) {
    try {
        const data = client.readContract({
            address: contract.market.address,
            abi: contract.market.abi,
            functionName: "plantContractAddress",
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
            address: contract.plant.address,
            abi: contract.plant.abi,
            functionName: "getPlantInfo",
            args: [id]
        })
        return data;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export function getCouponImage(index) {
    switch (index) {
        case 0:
            return { name: 'Sunflower E-Shop', image: '/shop1.png' }
        case 1:
            return { name: 'OceanWave Electronics', image: '/shop2.png' }
        case 2:
            return { name: 'DigitalSunset', image: '/shop3.png' }
        case 3:
            return { name: 'Datastream Mako', image: '/shop4.png' }
        case 4:
            return { name: 'GreenByte Store', image: '/shop5.png' }
    }

}

// export function getCouponAmount(price) {
//     switch (price) {
//         case BigInt(500):
//             return "10$"
//         case BigInt(1000):
//             return "15$"
//         case BigInt(1500):
//             return "30$"

//     }



export async function getTotalCoupon(client) {
    try {
        const data = client.readContract({
            address: contract.market.address,
            abi: contract.market.abi,
            functionName: "nextItemId",
            args: []
        })
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function getItemInfo(client, id) {
    try {
        const data = client.readContract({
            address: contract.market.address,
            abi: contract.market.abi,
            functionName: "getItemInfo",
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
            address: contract.plant.address,
            abi: contract.plant.abi,
            functionName: "getFeedTokensSinceLastClaim",
            args: [address]
        })
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

// export function getBorderCoupon(price) {
//     switch (price) {
//         case BigInt(500):
//             return '#ffbe0b';
//         case BigInt(1000):
//             return '#fb5607'; // Change this to the desired color for level 2
//         case BigInt(1500):
//             return '#ff006e'; // Change this to the desired color for level 3


//     }
// }
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