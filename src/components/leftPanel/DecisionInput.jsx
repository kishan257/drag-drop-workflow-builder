import React, { useCallback, useState } from "react";
import { Handle } from "reactflow";

const DecisionNode = ({ id, data, onTextChange }) => {

  return (
      <div className="decisionNode">
        <Handle
          type="target"
          position="left"
          id="decision_a"
        />
  
        <p className="font-bold flex items-center">
          decision
          {/* <input id={id} className='focus:border-none outline-none bg-transparent -rotate-45' name="text" value={text} onChange={onChange}></input> */}
        </p>
        <Handle
          type="source"
          position="right"
          id="decision_b"
        />
      </div>
  );
};

export default DecisionNode;