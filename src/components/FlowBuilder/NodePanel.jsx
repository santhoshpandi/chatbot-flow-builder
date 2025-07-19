import { useFlow } from "../../contexts/FlowContext";
import { MdOutlineMessage } from "react-icons/md";


export default function NodePanel() {

  const { onDragStart } = useFlow()

  // We can More Types of Nodes here.. For Example: ImageNode, PaymentNode etc..
  const nodeTypes = [
    { type: 'MessageNode', label: 'Message', nodeLabel: 'Send Message' }
  ];

  return (
    <div className="shadow-gray-400 shadow-xl w-1/4  flex flex-col bg-pink-100">

      <section
        className="bg-pink-700 p-2 text-white text-center text-xl">
        Nodes
      </section>

      {/* Rendering Various Types of Nodes in NodePanel */}
      <div className="p-2 grid grid-cols-2 gap-2 mt-4">

        {
          nodeTypes.map((nodeType, index) => (
            <div
              key={index}
              onDragStart={(e) => onDragStart(e, nodeType)}
              draggable
              className="cursor-grab rounded-xl border p-2 bg-blue-700 text-white
                         duration-150 active:cursor-grabbing flex justify-center gap-2 items-center"
            >
              <MdOutlineMessage />
              {nodeType.label}
            </div>
          ))
        }

      </div>
    </div>
  );
}
