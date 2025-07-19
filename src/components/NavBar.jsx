import { useFlow } from "../contexts/FlowContext"


export default function NavBar() {

  const { handleSave } = useFlow()
  return (
    <div
      className="border bg-amber-200 p-2 flex justify-between items-center">

      <span className="ml-10 ">Flow Builder</span>
      <button
        onClick={handleSave}
        className="px-2 py-1 rounded-md mr-10 bg-amber-950 text-white cursor-pointer">
        Save Changes
      </button>

    </div>
  )
}