import { useFlow } from "../../contexts/FlowContext";


export default function SettingsPanel({ node, setSelectedNode }) {
  if (!node) return null;

  const { updateNode } = useFlow()

  return (
    <div className="border w-1/4 p-4">
      <div className="p-2 border items-center flex relative mb-4">
        <span
          onClick={()=>setSelectedNode(null)}
          className="absolute left-2 cursor-pointer"
        >⬅</span>
        <span
          className="mx-auto"
        >Message</span>
      </div>

      <section>
        <label className="block mb-2">Message Text</label>
        <textarea
          className="border w-full p-2"
          value={node.data.message}
          onChange={(e) => updateNode(e.target.value, node)}
        />
      </section>
    </div>
  );
}
