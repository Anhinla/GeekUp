import { createContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"

export const GlobalContext = createContext(null);

export default function GlobalState({children}){
   // true: albums, false: users
    const [expanded,setExpanded] = useState(true);
    function hslToHex(h, s, l) {
      s /= 100
      l /= 100

      const k = (n) => (n + h / 30) % 12
      const a = s * Math.min(l, 1 - l)
      const f = (n) =>
        Math.round(
          255 *
            (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        )

      return [f(0), f(8), f(4)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
    }
      
    const getColorFromName = (name) => {
      let hash = 0
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      const h = Math.abs(hash % 360)
      return hslToHex(h, 70, 60) 
    }
    const SkeletonRow = ({row}) => (
      <tr>
        {[...Array(row)].map((_, idx) => (
          <td key={idx} className="p-4 border-b border-gray-300">
            <Skeleton height={20}/>
          </td>
        ))}
      </tr>
    )  

    return <GlobalContext.Provider value={{
        expanded,
        setExpanded,
        getColorFromName,
        SkeletonRow
    }}>
        {children}
    </GlobalContext.Provider>
}