import {API_KEY} from "../constants";

const header = new Headers();
header.append('Accept', 'application/json');
header.append('Content-Type', 'application/json')
header.append('X-Auth-Token', API_KEY);

const red = [
    "255,0,51", "150,0,24", "205,74,76", "248,0,0", "175,43,30", "100,36,36", "255,43,43", "179,36,40", "180,76,67", "204,51,51", "248,23,62", "117,21,30", "255,73,108", "171,78,82", "177,114,103", "140,71,67", "165,32,25", "213,62,7", "161,35,18", "204,6,5"
]


export const getUniverse = async () => {
    let response = await fetch('https://datsedenspace.datsteam.dev/player/universe', {
        method: 'GET',
        headers: header,
    });
    // console.log(response.json());
    return response.json();
}

export const getRound = async () => {
    let response = await fetch('https://datsedenspace.datsteam.dev/player/rounds', {
        method: 'GET',
        headers: header,
    });
    // console.log(response.json());
    return response.json();
}


export const getValidateDataForGraph = (data) => { // приходит массив universe
    let hashSet = new Set();
    const nodes = [];
    const links = [];
    for (let i = 0; i < data.length; i++) {
        if (!hashSet.has(data[i][0])) {
            hashSet.add(data[i][0]);
            nodes.push({id: data[i][0]});
        }
        if (!hashSet.has(data[i][1])) {
            hashSet.add(data[i][1]);
            nodes.push({id: data[i][1]});
        }
        links.push({
            source: data[i][0],
            target: data[i][1],
            weight: data[i][2]
        })
    }
    return {nodes: nodes, links: links};
}

export const getGarbageShip = (countRow, countColumn, data) => {
    const arr = [];
    for (let i = 0; i < countRow; i++) {
        const row = [];
        for (let j = 0; j < countColumn; j++) {
            row.push('rgb(0, 0, 0)');

        }
        arr.push(row);
    }
    const key = Object.keys(data);
    console.log(key);
    for (let i = 0; i < key.length; i++) {
        let r = Math.floor(Math.random() * 20 - 1);
        for (let j = 0; j < data[key[i]].length; j++) {
            let y = data[key[i]][j][0];
            let x = data[key[i]][j][1];
            arr[y][x] = 'rgb(' + red[r] + ')';
        }
    }
    return arr;
}

export const getPlanetGarbage = (objGarbage) => {
    const figures = [];
    const keys = Object.keys(objGarbage);
    console.log(keys);
    for (let keyInd = 0; keyInd < keys.length; keyInd++) {
        const currFigure = objGarbage[keys[keyInd]];
        let maxX = 0;
        let maxY = 0;
        for (let i = 0; i < currFigure.length; i++) {
            if (currFigure[i][0] > maxY) maxY = currFigure[i][0];
            if (currFigure[i][1] > maxX) maxX = currFigure[i][1];
        }
        const arr = [];
        for (let i = 0; i < maxY + 1; i++) {
            const row = [];
            for (let j = 0; j < maxX + 1; j++) {
                row.push('rgb(0, 0, 0)');
            }
            arr.push(row);
        }
        let r = Math.floor(Math.random() * 19 + 1);
        console.log(maxY, maxX, currFigure);
        for (let i = 0; i < currFigure.length; i++) {
            arr[currFigure[i][0]][currFigure[i][1]] = 'rgb(' + red[r] + ')';
        }
        figures.push(arr);
    }
    return figures;
}



// const fkls = {
//     "6fTzQid": [
//         [
//             0,
//             0
//         ],
//         [
//             0,
//             1
//         ],
//         [
//             1,
//             1
//         ]
//     ],
//     "RVnTkM59": [
//         [
//             0,
//             0
//         ],
//         [
//             0,
//             1
//         ],
//         [
//             1,
//             1
//         ],
//         [
//             2,
//             1
//         ],
//         [
//             1,
//             2
//         ]
//     ]
// }
