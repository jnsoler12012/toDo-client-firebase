import React, { useState } from 'react'
import { BiCategory } from "Web_React_Icons/bi";
import { FaArrowDown } from "Web_React_Icons/fa";
import { MdOutlineAddBox } from "Web_React_Icons/md";

export default function ({ selectedCategories, categories, handleSelectionFilter, createNew }) {
    const [active, setActive] = useState(false);

    console.log(categories, handleSelectionFilter, selectedCategories);


    function handleActivate() {
        console.log('asdasdasddsa');
        setActive(!active);
    }

    return (
        <div style={{ "height": "auto", "width": "15vw", "borderRadius": "8px", "flexDirection": "column", "alignItems": "center", "justifyContent": "top", "color": "#777", "fontWeight": "100", "margin": "4px 0" }}
            className={`${active && 'bg-[#f5f5f5]'}`}

        >
            <div role='lable_filter' style={{ "height": "40px", "width": "15vw", "borderRadius": "8px", "display": "flex", "alignItems": "center", "justifyContent": "left", "color": "#777", "fontWeight": "100" }}
                className={`${active && 'bg-[#f5f5f5]'} hover:cursor-pointer hover:active:bg-[#f5f5f5] hover:bg-[#fafafa]`}

                onClick={handleActivate}
            >
                <BiCategory className='w-[30px] h-[30px] my-[16px] mx-[8px]' />
                <h3 style={{ "fontSize": "19px", "fontWeight": "500" }}>Categories</h3>
                <FaArrowDown className={`w-[23px] h-[23px] my-[16px] mx-[8px] ${active && 'rotate-180'}`} />
            </div>

            <div role='label_types' style={{ "width": "15vw", "height": "auto", "background": "#f5f5f5", "borderRadius": "8px", "flexDirection": "column", "paddingBottom": "8px" }} className={`${active ? 'flex' : 'hidden overflow-hidden'}`}>
                {
                    !categories.length > 0
                        ? (
                            <div>
                                No categories
                            </div>
                        )
                        : categories.map(category => {
                            return (
                                <div key={category?.name} style={{ "height": "20px", "margin": "12px 0 12px 23px", "display": "flex", "alignItems": "center", "background": "#f5f5f5" }} className='cursor-pointer' onClick={(e) => handleSelectionFilter(category?.name, e)}>


                                    <div style={{ "width": "auto", "height": "80px", "borderRight": "2px solid #eee", "display": "flex", "alignItems": "center", "justifyContent": "center" }} className='mx-[15px]'>
                                        <div style={{ "background": "white", "height": "24px", "width": "24px", "border": "1px solid #7f56da", "borderRadius": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" }}
                                            className='hover:cursor-pointer'

                                        >
                                            <div style={{ "background": "#7f56da", "height": "20px", "width": "20px", "borderRadius": "100%", }} className={`${selectedCategories.includes(category.name) ? 'flex' : 'hidden'}`}>

                                            </div>
                                        </div>
                                    </div>


                                    <div role='color_category' style={{ "height": "14px", "width": "14px", "borderRadius": "4px", backgroundColor: category?.color ? category?.color : 'wheat' }}
                            
                                    >

                                    </div>
                                    <p role='name_category' style={{ "fontSize": "18px", "color": "#777", "marginLeft": "8px", "fontWeight": "400" }}>
                                        {category?.name}
                                    </p>
                                </div>
                            )
                        })
                }
                <div role='add_type' style={{ "height": "20px", "margin": "4px 0 4px 52px", "display": "flex", "alignItems": "center", "background": "#f5f5f5", cursor: 'pointer' }}
                    onClick={(e) => { createNew(e) }}
                >
                    <MdOutlineAddBox className='w-[25px] h-[25px] my-[16px] mx-[8px]' />
                    <p style={{ "fontSize": "16px", "color": "#ccc", "marginLeft": "8px", "fontWeight": "400" }}>Add new</p>
                </div>
            </div>
        </div>
    )
}