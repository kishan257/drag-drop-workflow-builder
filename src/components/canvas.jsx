import React, { useState, useCallback, useMemo, useRef } from 'react';
import ReactFlow, { MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import TextInput from './leftPanel/TextInput';
import DownloadOptions from './leftPanel/DownloadOptions';
import CanvasDownload from './leftPanel/CanvasDownload';
import * as htmlToImage from 'html-to-image';
import DecisionInput from './leftPanel/DecisionInput';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '2-3', source: '2', target: '3', animated: true },
];


const nodeTypes = {
  custome: TextInput,
};

const Canvas = () => {
  const flowchartRef = useRef(null);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [textInputs, setTextInputs] = useState([]);
  // const nodeTypes = useMemo(() => ({ custome: TextInput }), []);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNodeId = `node_${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: <TextInput id={newNodeId} onTextChange={handleTextChange} /> },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setTextInputs((prevTextInputs) => [...prevTextInputs, { id: newNodeId, value: '' }]);
  };

  const addDecisionNode = () => {
    const newNodeId = `node_${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: <DecisionInput id={newNodeId} onTextChange={handleTextChange} /> },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setTextInputs((prevTextInputs) => [...prevTextInputs, { id: newNodeId, value: '' }]);
  };

  const handleTextChange = (id, value) => {
    setTextInputs((prevTextInputs) =>
      prevTextInputs.map((textInput) => (textInput.id === id ? { ...textInput, value } : textInput))
    );
  };
  const handleResetBtn = () => {
    setNodes([])
  }


  // const onConnect = useCallback(
  //   (params) => {
  //     const newEdge = {
  //       id: `${params.source}-${params.target}`,
  //       source: params.source,
  //       target: params.target,
  //     };

  //     setEdges((prevEdges) => [...prevEdges, newEdge]);
  //   },
  //   [setEdges]
  // );

  return (
    <>
      <div ref={flowchartRef} className="w-screen h-screen m-4">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          elements={nodes.concat(edges)}
          onConnect={(params) => setEdges((prevEdges) => addEdge(params, prevEdges))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}

          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[16, 16]}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>

        {/*ignore design style */}
        <button className="absolute left-0 bottom-6 bg-green-500 text-white px-4 py-2 m-1 rounded" onClick={() => addNode('start', { x: 50, y: 50 })}>
          Add start Node
        </button>
        <button className="absolute left-0 bottom-[120px] bg-green-500 text-white px-4 py-2 m-1 rounded" onClick={() => addDecisionNode('start', { x: 50, y: 50 })}>
          Decision
        </button>
        <button className="absolute left-[150px] bottom-6 bg-red-500 m-1 text-white px-4 py-2 rounded" onClick={() => addNode('end', { x: 150, y: 50 })}>
          Add End Node
        </button>
        <DownloadOptions data={nodes} />
        <div className='absolute top-0 right-[270px] z-50 bg-indigo-400 text-white p-2 rounded m-2'>
          <button onClick={handleResetBtn}>clear</button>
        </div>
        <div className='absolute top-0 right-0 z-50 bg-indigo-400 text-white p-2 rounded m-2'>
          <CanvasDownload flowchartRef={flowchartRef} />
        </div>
        {nodes && (
          <div className="absolute top-0 right-0 m-4 p-4 bg-white border shadow">
            {nodes.type === 'sort' && (
              <div>
                <h3>Sort Method Configuration</h3>
                <input type="text" placeholder="Column Name" />
                <select>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            )}
            {nodes.type === 'filter' && (
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
          </div>
        )}
      </div>
    </>

  );
};

export default Canvas;
