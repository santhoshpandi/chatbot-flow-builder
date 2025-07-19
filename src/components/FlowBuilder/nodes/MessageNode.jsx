import { Handle, Position, useReactFlow } from "@xyflow/react";


export default function MessageNode({ data, id }) {

  const { setNodes } = useReactFlow()

  return (
    <div
      onClick={() => { console.log('working')}}
      className="bg-white border w-[200px]">
      <div className="bg-green-300 px-2 flex justify-between">
        {data.label}
        <span
          onClick={() => setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))}
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