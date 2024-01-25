import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiTask } from "Web_React_Icons/bi";
import { IoSettingsOutline } from "Web_React_Icons/io5";
import { TbLogout2 } from "Web_React_Icons/tb";
import { MainContext } from '../../../Infrastructure';
import ExpandSideBar from './ExpandSideBar';
import { getAllCategory } from '../../../Application/Axios/get';
import { CreateCategoryCard } from '../Cards';
import { logOut } from '../../../Infrastructure/utils';

export default function Sidebar() {
    const [mainContext, setMainContext] = useContext(MainContext)
    const { category } = mainContext.filter

    const [categoryData, setCategoryData] = useState([])

    const [newCategory, setNewCategory] = useState(false)


    useEffect(() => {
        console.log('~~~~~~~~~~~ SIDEBAR', category, mainContext.filter, mainContext.reloadType, mainContext?.user?.info);

        if ((mainContext?.services?.axios && categoryData.length <= 0 && mainContext?.user?.info !== null) || mainContext?.reloadType) {
            (async () => {
                await getAllCategory({ context: { mainContext, setMainContext } })
                    .then((data) => {
                        //console.log(formatImageProduct(data?.data?.data))
                        if (!data?.error)
                            if (data?.data)
                                if (data?.data?.data.length > 0) {
                                    setMainContext(prevState => ({
                                        ...prevState,
                                        filterOptions: [...data?.data?.data]
                                    }))
                                    setCategoryData(data?.data?.data)
                                }
                                else
                                    setCategoryData([])
                    })
            })()
        }
        return () => {

        }
    }, [mainContext?.reloadType])

    const handleSelectionFilter = (name, e) => {
        console.log(mainContext);
        const categoryFilterCopy = [...category]
        let finalCategoryFilter = []

        console.log(categoryFilterCopy);

        if (categoryFilterCopy.includes(name)) {
            finalCategoryFilter = categoryFilterCopy.filter((value) => value !== name)

            console.log(finalCategoryFilter);
        } else {
            finalCategoryFilter = [...categoryFilterCopy, name]
        }

        setMainContext(prevState => ({
            ...prevState,
            reload: true,
            filter: {
                ...prevState.filter,
                category: [...finalCategoryFilter]
            }
        }))
    }

    const handleNewCategory = (e) => {
        e.preventDefault()
        console.log('asdddddddddddddddddd');

        setNewCategory(true)

    }

    const handleCloseEditCreateTask = (state) => {
        setNewCategory(false)
    }

    const handleLogOut = () => {
        logOut(setMainContext, 'Info')
    }



    return (
        <div style={{ "height": "100vh", "width": "16%", "backgroundColor": "white", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "space-between", "padding": "8px 0", "boxSizing": "border-box" }}>
            <div style={{ "width": "50px", "margin": "32px" }}>IMAGE</div>

            <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "height": "60vh" }}>

                <ExpandSideBar selectedCategories={category} categories={categoryData} handleSelectionFilter={handleSelectionFilter} createNew={handleNewCategory} />

                <Link to="/app/dashboard" style={{ textDecoration: 'none' }}>
                    <div role='side_bar_link' style={{ "height": "40px", "width": "15vw", "borderRadius": "8px", "display": "flex", "alignItems": "center", "justifyContent": "left", "fontWeight": "100", margin: '4px 0' }} className='active:bg-[#f5f5f5] text-[#777] active:text-[#7f56da] hover:cursor-pointer hover:active:bg-[#f5f5f5] hover:bg-[#fafafa]'>
                        <BiTask className='w-[30px] h-[30px] my-[16px] mx-[8px]' />
                        <h3 style={{ "fontSize": "19px", "fontWeight": "500" }}>Dashboard</h3>
                    </div>
                </Link>



                <Link to="/app/settings" style={{ textDecoration: 'none' }}>
                    <div role='side_bar_link' style={{ "height": "40px", "width": "15vw", "borderRadius": "8px", "display": "flex", "alignItems": "center", "justifyContent": "left", "fontWeight": "100", margin: '4px 0' }} className='active:bg-[#f5f5f5] text-[#777] active:text-[#7f56da] hover:cursor-pointer hover:active:bg-[#f5f5f5] hover:bg-[#fafafa]'>
                        <IoSettingsOutline className='w-[30px] h-[30px] my-[16px] mx-[8px]' />
                        <h3 style={{ "fontSize": "19px", "fontWeight": "500" }}>Settings</h3>
                    </div>
                </Link>

                <div role='side_bar_link' style={{ "height": "40px", "width": "15vw", "borderRadius": "8px", "display": "flex", "alignItems": "center", "justifyContent": "left", "fontWeight": "100", margin: '4px 0' }} className='active:bg-[#f5f5f5] text-[#777] active:text-[#7f56da] hover:cursor-pointer hover:active:bg-[#f5f5f5] hover:bg-[#fafafa]' onClick={(e) => handleLogOut()}>
                    <TbLogout2 className='w-[30px] h-[30px] my-[16px] mx-[8px]' />
                    <h3 style={{ "fontSize": "19px", "fontWeight": "500" }}>Log out</h3>
                </div>

            </div>

            {
                newCategory && <CreateCategoryCard close={handleCloseEditCreateTask} user={mainContext?.user?.info} context={[mainContext, setMainContext]} />
            }
        </div>
    )
}