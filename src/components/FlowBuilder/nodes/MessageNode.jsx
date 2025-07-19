import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useFlow } from "../../../contexts/FlowContext";
import { FaWindowClose } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

export default function MessageNode({ data, id }) {

  const { setNodes, setEdges, setSelectedNode } = useFlow()

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
      onClick={() => { }}
      className="bg-white rounded-md w-[200px]">

      {/* ---- Label Part ---- */}
      <div className="bg-green-600 px-2 py-1 flex items-center justify-between rounded-t-md text-white">
        <span className="flex items-center gap-2">
          <MdOutlineMessage />
          {data.label}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation()
            deleteNode(id)
          }}
          className="text-white cursor-pointer text-[15px]">
          <FaWindowClose />
        </span>
      </div>

      {/* ---- Message Part ---- */}
      <p className="p-2 bg-green-200 rounded-b-md">
        {data.message}
      </p>
      <Handle type="source" position={Position.Right} id='out' />
      <Handle type="target" position={Position.Left} id='in' />
    </div>
  )
}