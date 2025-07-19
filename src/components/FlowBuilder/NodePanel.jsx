import { useFlow } from "../../contexts/FlowContext";


export default function NodePanel() {
  
  const {onDragStart} = useFlow()
  const nodeTypes = [
    { type: 'MessageNode', label: 'Message', nodeLabel:'Send Message' },
    // Add more types here later
  ];

  return (
    <div className="border w-1/4 p-2 py-4">
      {nodeTypes.map((nodeType, index) => (
        <div
          key={index}
          onDragStart={(e) => onDragStart(e, nodeType)}
          draggable
          className="cursor-grab rounded-xl border shadow p-2 text-center bg-blue-300 hover:bg-blue-600
            hover:text-white
            duration-150
           active:cursor-grabbing mb-3"
        >
          {nodeType.label}
        </div>
      ))}
    </div>
  );
}
