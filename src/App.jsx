import "./App.css"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import SidebarItem from "./components/SidebarItem"
import { BiSolidUserAccount } from "react-icons/bi"
import { FaRegListAlt } from "react-icons/fa"
import { Navigate } from "react-router-dom"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import AlbumsListContainer from "./components/AlbumsListContainer"
import UsersListContainer from "./components/UsersListContainer"
import { useContext } from "react"
import { GlobalContext } from "./context"
import AlbumDisplay from "./components/AlbumDisplay"
import UserDisplay from "./components/UserDisplay"

function AppLayout() {
  const location = useLocation()
  const isAlbums = location.pathname === "/" || location.pathname === "/albums"
  const {expanded} = useContext(GlobalContext);
  const sidebarWidth = expanded ? "ml-68" : "ml-20"// You can still conditionally apply this if needed
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 bg-teal-50">
        <Sidebar>
          <SidebarItem
            icon={<FaRegListAlt />}
            text={"Albums"}
            active={isAlbums}
            alert={isAlbums}
            to="/albums"
          />
          <SidebarItem
            icon={<BiSolidUserAccount />}
            text={"Users"}
            active={!isAlbums}
            alert={!isAlbums}
            to="/users"
          />
        </Sidebar>
        <div
          className={`pt-16 ${sidebarWidth} w-full transition-all duration-300 mr-4`}
        >
          <div className="p-4 w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/albums" replace />} />
              <Route path="/albums" element={<AlbumsListContainer />} />
              <Route path="/albums/:id" element={<AlbumDisplay />} />
              <Route path="/users" element={<UsersListContainer />} />
              <Route path="/users/:id" element={<UserDisplay />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App
