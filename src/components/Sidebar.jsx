import { useContext, useEffect } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { GlobalContext } from "../context"
import { IoList } from "react-icons/io5"

const Sidebar = ({ children }) => {
  const { expanded, setExpanded, visible, setVisible } =
    useContext(GlobalContext)

  const width = expanded ? "w-64" : "w-16"

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisible(false)
        setExpanded(false);
      } else {
        setVisible(true)
        setExpanded(true);
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const translate = visible ? "translate-x-0" : "-translate-x-full"
  return (
    <aside
      className={`h-screen fixed z-10 ${width} ${translate} transition-all duration-300`}
    >
      <nav
        className="h-full flex flex-col bg-white"
        //style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
      >
        <ul className="flex-1 px-3 mt-18">{children}</ul>

        <div className="flex  justify-center py-4 my-2">
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-3xl cursor-pointer"
            onClick={() => setExpanded((c) => !c)}
          >
            {expanded ? <BiChevronLeft /> : <BiChevronRight />}
          </button>
        </div>
       
      </nav>
    </aside>
  )
}
export default Sidebar
