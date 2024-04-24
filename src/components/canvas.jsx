// Canvas.js
import React, { useState, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, EdgeRemoveChange, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onElementClick = (_, element) => {
    setSelectedNode(element);
  };
  const onNodesChange = useCallback(
    (changes) => setElements((nds) => applyNodeChanges(changes, nds)),
    [setElements]
  );
  const onCanvasClick = () => {
    setSelectedNode(null);
  };

  const addNode = (type, position) => {
    const newNode = {
      id: type + '_' + Date.now(),
      type,
      position,
      data: { label: type === 'start' ? 'Start' : 'End' },
      sourcePosition: 'right',
      targetPosition: 'left',
      isConnectable: type !== 'start' && type !== 'end', // Prevent start and end nodes from being connected
    };

    setElements((prevElements) => [...prevElements, newNode]);
  };
console.log('elements', elements)
  const onConnect = useCallback(
    (params) => {
      setElements((prevElements) => [...prevElements, params]);
    },
    []
  );

  const onDelete = () => {
    if (!selectedNode || selectedNode.type === 'start' || selectedNode.type === 'end') {
      return;
    }

    // setElements((prevElements) => EdgeRemoveChange([selectedNode], prevElements));
    setSelectedNode(null);
  };

  return (
    <div className="w-screen h-screen m-4" onClick={onCanvasClick}>
      <ReactFlow
        nodes={elements}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onElementClick={onElementClick}
        deleteKeyCode={46}
        // snapToGrid={true} 
        // snapGrid={[16, 16]}
      >
        {/* <MiniMap /> */}
        <Controls />
        <Background />
      </ReactFlow>

      <button className=" absolute left-0 bottom-6 bg-green-500 text-white px-4 py-2 rounded" onClick={() => addNode('start', { x: 50, y: 50 })}>
        Add Start Node
      </button>

      <button className="absolute left-[150px] bottom-6 bg-red-500 text-white px-4 py-2 rounded" onClick={() => addNode('end', { x: 150, y: 50 })}>
        Add End Node
      </button>

      {selectedNode && (
        <div className="absolute top-0 right-0 m-4 p-4 bg-white border shadow">
          {/* Render configuration panel for selected node */}
          {/* Example: Sort method configuration */}
          {selectedNode.type === 'sort' && (
            <div>
              <h3>Sort Method Configuration</h3>
              <input type="text" placeholder="Column Name" />
              <select>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          )}
          {/* Example: Filter method configuration */}
          {selectedNode.type === 'filter' && (
            <div>
              <h3>Filter Method Configuration</h3>
              <input type="text" placeholder="Column Name" />
              <select>
                <option value="eq">Equal to</option>
                <option value="ne">Not equal to</option>
                <option value="includes">Includes</option>
                <option value="excludes">Excludes</option>
              </select>
              <input type="text" placeholder="Value" />
            </div>
          )}
          {/* Add configurations for other methods */}
        </div>
      )}
    </div>
  );
};

export default Canvas;
