import { useContext, useEffect, useState } from "react"
import { FaRegListAlt } from "react-icons/fa"
import { IoArrowBackOutline } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import { GlobalContext } from "../context"
import Viewer from "react-viewer"


const AlbumDisplay = () => {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [user, setUser] = useState(null)
  const { getColorFromName} = useContext(GlobalContext)
  const [albumLoading, setAlbumLoading] = useState(true)
  const [userLoading, setUserLoading] = useState(true)



  const [viewerVisible, setViewerVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setAlbumLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((res) => res.json())
      .then((p) => setAlbum(p))
      .catch((err) => console.error(err))
      .finally(()=>setAlbumLoading(false))

    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((res) => res.json())
      .then((p) => {
        const slices = p.slice(0, 10).map((slice) => ({
          ...slice,
          thumbnailUrl: slice.thumbnailUrl.replace(
            "https://via.placeholder.com",
            "https://dummyjson.com/image"
          ),
        }))
        setPhotos(slices)
      })
      .catch((err) => console.error(err))
  }, [id])

  useEffect(() => {
    if (album?.userId) {
      setUserLoading(true)
      fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then((res) => res.json())
        .then((p) => setUser(p))
        .catch((err) => console.error(err))
        .finally(()=>setUserLoading(false))
    }
  }, [album])

  return (
    <div>
      <div className="flex gap-2">
        <Link to={"/albums"}>
          <div className="flex gap-2 items-center text-gray-600">
            <FaRegListAlt />
            <span>Albums / </span>
          </div>
        </Link>
        <span className="text-gray-800">Show</span>
      </div>

      <div className="flex gap-6 items-center mt-2">
        <Link to={"/albums"}>
          <div className="text-xl hover:bg-gray-200 p-2 rounded-md">
            <IoArrowBackOutline />
          </div>
        </Link>
        <h2 className="text-lg font-semibold">Show Album</h2>
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
          {albumLoading ? (
            <div className="mt-2 p-2 px-4">
              <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : (
            <p className="mt-2 p-2 px-4 text-2xl font-semibold">
              {album?.title}
            </p>
          )}
          {albumLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-6 px-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white p-2 rounded shadow-sm">
                  <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 mt-2 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            photos.length > 0 && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mt-6 px-4">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="bg-white p-2 rounded shadow-sm hover:shadow-lg hover:scale-[1.03] transition-transform transition-shadow duration-300 cursor-pointer"
                      onClick={() => {
                        setActiveIndex(index)
                        setViewerVisible(true)
                      }}
                    >
                      <img
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        className="w-full h-auto rounded"
                      />
                      <p className="text-xs mt-1 text-gray-600">
                        {photo.title}
                      </p>
                    </div>
                  ))}
                </div>
                <Viewer
                  visible={viewerVisible}
                  onClose={() => setViewerVisible(false)}
                  images={photos.map((p) => ({
                    src: p.thumbnailUrl,
                    alt: p.title,
                  }))}
                  activeIndex={activeIndex}
                  rotatable
                  scalable
                  zoomable
                />
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default AlbumDisplay
