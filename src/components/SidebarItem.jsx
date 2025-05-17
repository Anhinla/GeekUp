import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { GlobalContext } from "../context"

const SidebarItem = ({ icon, text, to, alert }) => {
  const { expanded } = useContext(GlobalContext)

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-teal-200 to-teal-100 text-teal-800"
              : "hover:bg-teal-50 text-gray-600"
          }`
        }
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {/* {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-teal-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )} */}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-teal-100 text-teal-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </NavLink>
    </li>
  )
}

export default SidebarItem
