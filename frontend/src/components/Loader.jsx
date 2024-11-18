import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#32a858");

  return (
    <div className="w-full">
    <div className="sweet-loading text-center text-blue-500  flex justify-center mt-40">
     
      <BeatLoader
        color={color}
        loading={loading}
        css='blue'
        size={30}
    
        aria-label="Loading Spinner"
       
      />
      <BeatLoader
        color={color}
        loading={loading}
        css='blue'
        size={30}
    
        aria-label="Loading Spinner"
       
      />
    </div>
    </div>
  );
}
export default Loader;