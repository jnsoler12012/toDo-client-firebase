import React, { useContext } from 'react'
import PrivateRouter from './PrivateRouter'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainContext } from '../../..'
import { Dashboard, Settings } from '../../../../UI/Pages'
import { Sidebar } from '../../../../UI/Components/Sidebar'


export default () => {
    const [mainContext, setMainContext] = useContext(MainContext)

    const { user } = mainContext
    console.log(mainContext)


    return (
        <>
            <div className="flex w-[100vw]  h-[100vh] bg-[#f5f5f5]">
                <Sidebar />
                <div className="w-[inherit]">
                    <Routes>
                        <Route element={<PrivateRouter />}>
                            <Route path="/*" element={<div>No esta la ruta</div>} />
                            {//  <Route index path="/" element={<Navigate to="/app/dashboard" />}></Route>
                            }
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/settings' element={<Settings />} />
                        </Route>
                    </Routes>
                </div>

            </div>

        </>


    )
}