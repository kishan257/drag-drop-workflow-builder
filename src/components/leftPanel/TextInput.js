import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const TextInput = ({ id, data, onTextChange }) => {
  const [text, setText] = useState(data?.initialValue || '');

  const onChange = useCallback((e) => {
    setText(e.target.value);
    if (onTextChange) {
      onTextChange(id, e.target.value);
    }
  }, [id, onTextChange]);

  return (
    <>
      <Handle type="source" position={Position.Top} />
      <div>
        <input id={id} className='focus:border-none outline-none' name="text" value={text} onChange={onChange}></input>
      </div>
      <Handle type="target" position={Position.Bottom} />
    </>
  );
};

export default TextInput;