import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    addNode(state, action) {
      state.nodes.push(action.payload);
    },
    addEdge(state, action) {
      state.edges.push(action.payload);
    },
    saveWorkflow(state, action) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
  },
});

export const { addNode, addEdge, saveWorkflow } = workflowSlice.actions;

export default workflowSlice.reducer;
    




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   workflows: [],
// };

// export const workflowSlice = createSlice({
//   name: 'workflow',
//   initialState,
//   reducers: {
//     saveWorkflow: (state, action) => {
//       state.workflows.push(action.payload);
//     },
//   },
// });

// export const { saveWorkflow } = workflowSlice.actions;

// export const selectWorkflows = (state) => state.workflow.workflows;

// export default workflowSlice.reducer;
