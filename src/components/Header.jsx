import { Link } from "react-router-dom"

const Header = () => {

  return (
    <div className="p-4 bg-white fixed w-full z-20">
      <Link to={"/albums"}>
        <img src="/geekup.svg" className="w-25" alt="GeekUp logo" />
      </Link>
    </div>
  )
}
export default Header