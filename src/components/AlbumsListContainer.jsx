import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table"
import { useEffect, useState, useMemo, useContext } from "react"
import { IoEyeOutline } from "react-icons/io5"
import { GlobalContext } from "../context"
import { useSearchParams, useNavigate, Link } from "react-router-dom"

const AlbumsListContainer = () => {
  const { getColorFromName, SkeletonRow } = useContext(GlobalContext)
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()



  const initialPageIndex = parseInt(searchParams.get("page") || "1", 10) - 1
  const initialPageSize = parseInt(searchParams.get("size") || "20", 10)

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex >= 0 ? initialPageIndex : 0,
    pageSize: initialPageSize > 0 ? initialPageSize : 20,
  })


  useEffect(() => {
    setSearchParams({
      page: pagination.pageIndex + 1,
      size: pagination.pageSize,
    })
  }, [pagination.pageIndex, pagination.pageSize, setSearchParams])

  useEffect(() => {
    setLoading(true)
      Promise.all([
        fetch("https://jsonplaceholder.typicode.com/albums").then((res) =>
          res.json()
        ),
        fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
          res.json()
        ),
      ])
        .then(([albums, users]) => {
          const mp = Object.fromEntries(users.map((u) => [u.id, u.name]))
          const newAlbums = albums.map((album) => ({
            ...album,
            username: mp[album.userId],
          }))
          setData(newAlbums)
        })
        .catch((err) => console.error("Failed to fetch:", err))
        .finally(() => setLoading(false))
    
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "username",
        header: "User",
        cell: ({ row }) => {
          const name = row.original.username
          return (
            <Link to={`/users/${row.original.userId}`}>
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                  )}&background=${getColorFromName(name)}&color=fff&size=64`}
                  alt={name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-blue-600">{name}</span>
              </div>
            </Link>
          )
        },
      },
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
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pagination.pageSize),
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
              ? [...Array(7)].map((_, idx) => <SkeletonRow key={idx} row={4}/>)
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
      <div className="flex items-center justify-end mt-4 px-2 gap-10">
        <div className="flex gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          {[...Array(table.getPageCount()).keys()].map((index) => (
            <button
              key={index}
              onClick={() => table.setPageIndex(index)}
              className={`px-3 py-1 rounded transition ${
                index === pagination.pageIndex
                  ? "border-teal-600 text-teal-600 font-semibold border bg-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>

        <div>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
            className="border rounded p-1 text-sm"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default AlbumsListContainer
