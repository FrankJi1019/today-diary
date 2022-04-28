import {createContext, useContext, useEffect, useState} from "react";

const context = createContext({} as {
  screenSize: number
})

// @ts-ignore
export const UtilProvider = ({children}) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const resetSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", resetSize);
    return () => {
      window.removeEventListener("resize", resetSize);
    };
  }, []);

  const data = {
    screenSize
  }

  return (
    <context.Provider value={data}>
      {children}
    </context.Provider>
  )

}

export const useUtil = () => {
  return useContext(context)
}
