//
// import React, {useEffect, useState} from 'react';
// import { Graph } from 'react-d3-graph';
// import {getValidateDataForGraph} from "../../api/api";
//
//
// const MyGraph = ({universeData}) => {
//     const [data, setData] = useState({});
//     useEffect(() => {
//         setData(getValidateDataForGraph(universeData));
//     }, [universeData])
//
//     const myConfig = {
//         directed: true,
//
//         node: {
//             fontColor: 'red',
//             fontSize: "9px"
//         },
//         link: {
//             labelProperty: 'weight',
//             fontColor: "#ffffff",
//             renderLabel: true,
//         },
//         d3: {
//             gravity: -400,
//             linkLength: 100,
//             zoom: {
//                 enable: true,
//                 scaleExtent: [0.5, 2],
//                 onZoomStart: false,
//                 onZoomEnd: false
//             },
//         },
//         invalidation: true,
//         width: 800,
//         height: window.innerHeight - 40,
//     };
//
//     return (
//         <Graph
//             id="graph-id"
//             config={myConfig}
//             data={data}
//         />
//     );
// };
//
// export default MyGraph;
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getValidateDataForGraph } from "../../api/api";

const MyGraph = ({ universeData }) => {
    const ref = useRef();

    useEffect(() => {
        const data = getValidateDataForGraph(universeData);
        const svg = d3.select(ref.current)
            .attr("viewBox", [-800 / 2, -window.innerHeight / 2, 800, window.innerHeight]);

        const g = svg.append("g");

        svg.call(d3.zoom()
            .scaleExtent([0.5, 2])
            .on("zoom", function (event) {
                g.attr("transform", event.transform);
            })
        );

        const width = 800;
        const height = window.innerHeight - 40;

        // Create force simulation
        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Create links
        const link = svg.append("g")
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", d => Math.sqrt(d.value));

        // Create nodes
        const node = svg.append("g")
            .selectAll("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", "red")
            .call(drag(simulation));

        // Add labels to nodes
        const label = svg.append("g")
            .selectAll("text")
            .data(data.nodes)
            .join("text")
            .text(d => d.id)
            .style("font-size", "9px")
            .style("fill", "red");

        // Update positions on each tick
        simulation.on("tick", () => {
            link.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label.attr("x", d => d.x)
                .attr("y", d => d.y);
        });

        // Enable drag
        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }
    }, [universeData]);

    return <svg ref={ref} width={800} height={window.innerHeight - 40} />;
};

export default MyGraph;
