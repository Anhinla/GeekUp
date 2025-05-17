import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table"
import { useContext, useEffect, useMemo, useState } from "react"
import { GlobalContext } from "../context"
import { IoEyeOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const UsersListContainer = () => {
  const { getColorFromName, SkeletonRow } = useContext(GlobalContext)
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setData(users))
      .catch((err) => console.error("Failed to fetch users:", err))
      .finally(()=>setLoading(false))
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
      },
      {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => {
          const name = row.original.name
          return (
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                name
              )}&background=${getColorFromName(name)}&color=fff&size=64`}
              alt={name}
              className="w-8 h-8 rounded-full"
            />
          )
        },
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <a
            href={`mailto:${getValue()}`}
            className="text-teal-700 hover:text-teal-500"
          >
            {getValue()}
          </a>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ getValue }) => (
          <a
            href={`tel:${getValue()}`}
            className="text-teal-700 hover:text-teal-500"
          >
            {getValue()}
          </a>
        ),
      },
      {
        accessorKey: "website",
        header: "Website",
        cell: ({ getValue }) => (
          <a
            href={`https://${getValue()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 hover:underline"
          >
            {getValue()}
          </a>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <Link
            to={`/users/${row.original.id}`}
            className="w-20 flex items-center justify-center gap-2 py-0.5 border border-gray-500 text-gray-500 rounded-sm text-sm hover:text-teal-600 hover:border-teal-600 transition cursor-pointer"
          >
            <IoEyeOutline />
            Show
          </Link>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
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
            {loading
            ? [...Array(7)].map((_, idx) => <SkeletonRow key={idx} row={7}/>)
            : table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 border-b border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersListContainer
