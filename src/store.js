import { configureStore } from '@reduxjs/toolkit';

const SAVE_WORKFLOW = 'SAVE_WORKFLOW';
const EXPORT_WORKFLOW = 'EXPORT_WORKFLOW';

// Action creators
export const saveWorkflow = (workflow) => ({
  type: SAVE_WORKFLOW,
  payload: workflow,
});

export const exportWorkflow = (format) => ({
  type: EXPORT_WORKFLOW,
  payload: format,
});

// Reducer
const initialState = {
  workflows: [],
  currentNodeConfig: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_WORKFLOW:
      return {
        ...state,
        workflows: [...state.workflows, action.payload],
      };

      case EXPORT_WORKFLOW:
        if (action.payload === 'json') {
          download(JSON.stringify(state.workflows), 'workflow.json', 'application/json');
        } else if (action.payload === 'csv') {
          const csvData = generateCSV(state.workflows);
          download(csvData, 'workflow.csv', 'text/csv');
        }
        return state;
    default:
      return state;
  }
};

const generateCSV = (workflows) => {
  let csvData = '';

  csvData += 'Node ID,Node Type,Node Label\n';

  workflows.forEach((workflow, index) => {
    csvData += `"Workflow ${index + 1}"\n`; // Workflow header

    workflow.nodes.forEach((node) => {
      csvData += `${node.id},${node.type},${node.data.label}\n`;
    });

    csvData += '\n';
  });

  return csvData;
};

const download = (data, filename, type) => {
  const blob = new Blob([data], { type: type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
