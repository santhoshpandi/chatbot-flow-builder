import { useFlow } from "../contexts/FlowContext"
import { PiFlowArrowBold } from "react-icons/pi";


export default function NavBar() {

  const { handleSave } = useFlow()
  return (
    <div
      className=" bg-amber-200 p-2 flex justify-between items-center">
      
      {/* FLow Builder Logo */}
      <span className="ml-10 text-xl font-semibold text-amber-950 flex gap-2 items-center"><PiFlowArrowBold />Flow Builder</span>

      {/* SaveChanges Button */}
      <button
        onClick={handleSave}
        className="px-2 py-1 rounded-md mr-10 bg-amber-950 text-white cursor-pointer">
        Save Changes
      </button>

    </div>
  )
}