import { useContext, useEffect, useMemo, useState } from "react";
import { BiSolidUserAccount } from "react-icons/bi";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../context";
import { Link } from "react-router-dom";
import { IoArrowBackOutline, IoEyeOutline } from "react-icons/io5";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";


const UserDisplay = () => {
    const {id} = useParams();
    const [user,setUser] = useState(null);
    const [albums,setAlbums] = useState([]);
    const { getColorFromName, SkeletonRow } = useContext(GlobalContext)
    const [albumLoading, setAlbumLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(true)

    useEffect(()=>{
      setUserLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res=>res.json())
        .then(u=>setUser(u))
        .catch(err=>console.error(err))
        .finally(()=>setUserLoading(false))
    },[id]);
    useEffect(()=>{
        if(user){
          setAlbumLoading(true)
            fetch(`https://jsonplaceholder.typicode.com/albums`)
              .then((res) => res.json())
              .then((u) => setAlbums(u.filter(e=>e.userId==id).slice(0,10)))
              .catch((err) => console.error(err))
              .finally(()=>setAlbumLoading(false))
        }
    },[id,user])
    const columns = useMemo(() => [
      {
        accessorKey: "id",
        header: "ID",
      },
      { accessorKey: "title", header: "Title" },
      {
              header: "Actions",
              cell: ({row}) => (
                <Link
                  to={`/albums/${row.original.id}`}
                  className="w-20 flex items-center gap-2 px-2 py-0.5 border border-gray-500 text-gray-500 rounded-sm text-sm hover:text-teal-600 hover:border-teal-600 transition cursor-pointer"
                >
                  <IoEyeOutline />
                  Show
                </Link>
              ),
        }
    ])
    const table = useReactTable({
        data:albums,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
  return (
    <div>
      <div className="flex gap-2">
        <Link to={"/users"}>
          <div className="flex gap-2 items-center text-gray-600">
            <BiSolidUserAccount />
            <span>Users / </span>
          </div>
        </Link>
        <span className="text-gray-800">Show</span>
      </div>

      <div className="flex gap-6 items-center mt-2">
        <Link to={"/users"}>
          <div className="text-xl hover:bg-gray-200 p-2 rounded-md">
            <IoArrowBackOutline />
          </div>
        </Link>
        <h2 className="text-lg font-semibold">Show User</h2>
      </div>
      <div className="bg-white p-6 m-4 shadow-sm rounded-sm">
        <div className="border border-gray-200 rounded-md p-6">
          {userLoading ? (
            <div className="flex gap-3 items-center pb-4 border-b border-gray-200 px-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            user && (
              <div className="flex gap-3 items-center pb-4 border-b border-gray-200 px-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=${getColorFromName(
                    user.name
                  )}&color=fff&size=64`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <Link to={`/users/${user.id}`}>
                    <span className="text-teal-800 font-medium hover:text-teal-600 cursor-pointer">
                      {user.name}
                    </span>
                  </Link>

                  <a href={`mailto:${user.email}`}>
                    <p className="text-sm text-teal-700 hover:text-teal-600 cursor-pointer mt-1">
                      {user.email}
                    </p>
                  </a>
                </div>
              </div>
            )
          )}
          <p className="text-lg font-semibold m-4">Albums</p>
          <div className="mb-6">
            <div className="m-2 bg-white">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-left">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-4 px-6 border-b border-gray-300 font-semibold"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {albumLoading
                    ? [...Array(7)].map((_, idx) => (
                        <SkeletonRow key={idx} row={3} />
                      ))
                    : table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="p-4 border-b border-gray-300"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserDisplay