import { useFlow } from "../../contexts/FlowContext";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SettingsPanel({ node, setSelectedNode }) {
  if (!node) return null;

  const { updateNode } = useFlow()

  return (
    <div className="shadow-gray-400 shadow-xl w-1/4 bg-lime-100">
      {/* Heading */}
      <div className="p-2 bg-lime-500 text items-center flex relative mb-4">
        <span
          onClick={()=>setSelectedNode(null)}
          className="absolute left-2 cursor-pointer text-2xl"
        ><IoMdArrowRoundBack /></span>
        <span
          className="mx-auto text-lg"
        >Message</span>
      </div>

      {/* Text Node Editor */}
      <section className="px-4 pb-4 border-b-1">
        <label className="block mb-2">Text</label>
        <textarea
          className="bg-white drop-shadow-xl  w-full p-2"
          value={node.data.message}
          onChange={(e) => updateNode(e.target.value, node)}
        />
      </section>
    </div>
  );
}
