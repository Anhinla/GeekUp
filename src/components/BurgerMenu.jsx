
import { useContext } from "react"
import { IoList } from "react-icons/io5"
import { GlobalContext } from "../context"

const BurgerMenu = () => {
  const {setMobile } = useContext(GlobalContext)

  return (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border border-gray-300"
      onClick={()=>{setMobile(true);}}
    >
      <IoList size={24} />
    </button>
  )
}

export default BurgerMenu
