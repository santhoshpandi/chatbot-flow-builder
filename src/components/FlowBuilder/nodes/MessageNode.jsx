import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useFlow } from "../../../contexts/FlowContext";


export default function MessageNode({ data, id }) {

  const { setNodes, setEdges, setSelectedNode  } = useFlow()

  const deleteNode = (nodeId) => {
    setSelectedNode(null)
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  setEdges((prevEdges) =>
    prevEdges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    )
    );
    
};

  return (
    <div
      onClick={() => {}}
      className="bg-white border w-[200px]">
      <div className="bg-green-300 px-2 flex justify-between">
        {data.label}
        <span
          onClick={(e) => {
            e.stopPropagation()
            deleteNode(id)
          }}
          className="text-red-700 cursor-pointer">
          close
        </span>
      </div>
      <p className="p-2">
        {data.message}
      </p>
      <Handle type="source" position={Position.Right} id='out' />
      <Handle type="target" position={Position.Left} id='in' />
    </div>
  )
}