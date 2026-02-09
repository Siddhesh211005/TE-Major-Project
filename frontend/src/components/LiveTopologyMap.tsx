import React, { useEffect, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const LiveTopologyMap = () => {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const fgRef = useRef();

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/stream');

        const handleData = (data) => {
            // Handle incoming data to update nodes and links
            const { newNodes, newLinks } = JSON.parse(data);
            setNodes(newNodes);
            setLinks(newLinks);
        };

        socket.addEventListener('message', (event) => handleData(event.data));

        // Auto-reconnect logic
        socket.addEventListener('close', () => {
            setTimeout(() => {
                // Attempt to reconnect after a delay
                const newSocket = new WebSocket('ws://localhost:8000/stream');
                newSocket.addEventListener('message', (event) => handleData(event.data));
            }, 1000);
        });

        return () => {
            socket.close();
        };
    }, []);

    return (
        <ForceGraph2D
            ref={fgRef}
            graphData={{ nodes, links }}
            nodeAutoColorBy="type" // Example: color nodes by type
            onNodeClick={(node) => {
                // Optional: Handle node click events
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const radius = node.isMalicious ? 10 * globalScale : 5 * globalScale;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.isMalicious ? 'red' : 'blue';
                ctx.fill();

                // Add glowing effect
                ctx.shadowColor = node.isMalicious ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)';
                ctx.shadowBlur = 20;
            }}
        />
    );
};

export default LiveTopologyMap;
