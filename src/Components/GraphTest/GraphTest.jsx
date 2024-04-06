
import React, {useEffect, useState} from 'react';
import { Graph } from 'react-d3-graph';
import {getValidateDataForGraph} from "../../api/api";


const MyGraph = ({universeData}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData(getValidateDataForGraph(universeData));
    }, [universeData])

    const myConfig = {
        directed: true,

        node: {
            fontColor: 'red',
            fontSize: "9px"
        },
        link: {
            labelProperty: 'weight',
            fontColor: "#ffffff",
            renderLabel: true,
        },
        d3: {
            gravity: -400,
            linkLength: 100,
            zoom: {
                enable: true,
                scaleExtent: [0.5, 2],
                onZoomStart: false,
                onZoomEnd: false
            },
        },
        invalidation: true,
        width: 800,
        height: window.innerHeight - 40,
    };

    return (
        <Graph
            id="graph-id"
            config={myConfig}
            data={data}
        />
    );
};

export default MyGraph;
