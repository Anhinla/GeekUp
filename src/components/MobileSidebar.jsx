import { useContext } from "react"
import { BiSolidUserAccount } from "react-icons/bi"
import { GlobalContext } from "../context"
import { NavLink } from "react-router-dom"
import { FaRegListAlt } from "react-icons/fa"

const MobileSidebar = () => {
  const { mobile, setMobile } = useContext(GlobalContext)

  return (
    <>
    
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setMobile(false)}
      />

   
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white z-50 transform transition-transform duration-300 ${
          mobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <img src="/geekup.svg" alt="Geek Up Logo" className="h-8" />
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/albums"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FaRegListAlt />
                <span>Albums</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <BiSolidUserAccount />
                <span>Users</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default MobileSidebar
