import React, {useState} from "react";
// import PlanetTable from "./Components/PlanetTable/PlanetTable";
import PlanetGarbage from "./Components/PlanetGarbage/PlanetGarbage";
import SpaceShip from "./Components/SpaceShip/SpaceShip";
import {getGarbageShip, getUniverse} from "./api/api";
import './App.css';
//
// import dataPlanet from './api/response.json';
// import dataUniverseJSON from './api/Без названия.json';
import GraphTest from "./Components/GraphTest/GraphTest";

function App() {
    const [dataUniverse, setDataUniverse] = useState([]);
    // const [dataShip, setDataShip] = useState({});
    const [dataShipGarbage, setDataShipGarbage] = useState([]);
    const [garbagePlanet, setGarbagePlanet] = useState({});

    const handleUpdate = (e) => {
        e.preventDefault();
        //
        // setGarbagePlanet(dataPlanet.planetGarbage);
        // setDataUniverse(dataUniverseJSON.universe);
        // setDataShipGarbage(getGarbageShip(11, 8, fkls));
        getUniverse().then(res => {
            setDataUniverse(res.universe);
            setGarbagePlanet(res.ship.planet.garbage);
            setDataShipGarbage(getGarbageShip(res.ship.capacityY, res.ship.capacityX, res.ship.garbage));
            console.log(res);
            // setDataShip(res.ship);
        });
    }

    return (
        <div className="App">
            <div className="header">
                <b>DatsEdenSpace</b> <button onClick={handleUpdate}>Обновить</button>
            </div>
            <div className="info">
                <div className="container">
                    <GraphTest universeData={dataUniverse}/>
                    {/*<PlanetTable planetArray={dataUniverse}/>*/}
                </div>

                <div className="container">
                    <SpaceShip dataShip={dataShipGarbage}/>
                </div>

                <div className="container">
                    <PlanetGarbage data={garbagePlanet}/>
                </div>
            </div>

        </div>
    );
}

export default App;
