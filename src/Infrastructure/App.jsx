import React, { createContext, useContext, useEffect, useState } from 'react'
import '../UI/Styles/app.css'
import { AxiosContext, AxiosContextProvider } from './AxiosProvider'
import { RouterProvider } from './RouterProvider'
import { encode } from './utils'

const BASENAME_AXIOS = process.env.BASENAME_AXIOS

export const MainContext = createContext(null)

export const MainApp = () => {
  console.log("ENTRAMOS", window.localStorage.getItem("TOKENtodo")
  )
  // window.localStorage.removeItem("TOKENtodo")
  // window.localStorage.removeItem("userToDo")


  const infoUser = window.localStorage.getItem("userToDo") && window.localStorage.getItem("userToDo").split(',').slice(0, -1).reduce((acc, curr) => (typeof acc === 'string' ? ({
    [acc.split('=')[0]]: acc.split('=')[1]
  }) : ({
    ...acc, [curr.split('=')[0]]: curr.split('=')[1]
  })), {})

  const [main, setMain] = useState({
    reload: true,
    reloadType: true,
    loading: false,
    user: {
      token: window.localStorage.getItem("TOKENtodo") == 'null' ? null : window.localStorage.getItem("TOKENtodo"),
      info: infoUser
    },
    filter: {
      category: [],
      state: 'All'
    },
    filterOptions: [],
    currentTaskEdition: undefined
  })

  useEffect(() => {
    console.log("_____________MAIN A CAMBIADO", main, window.localStorage.getItem("TOKENtodo"))

    return () => {
      console.log("_____________RRR MAIN A CAMBIADO", main)
    }
  }, [main])


  return (
    <MainContext.Provider value={[main, setMain]}>
      <AxiosContextProvider contextMain={[main, setMain]} config={{ baseURL: BASENAME_AXIOS }}>
        <RouterProvider config={{ basename: "/v1" }} />
      </ AxiosContextProvider>
    </MainContext.Provider>

  )
}