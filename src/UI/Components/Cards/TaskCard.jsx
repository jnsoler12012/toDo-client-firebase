import React from 'react'
import { CiEdit, CiEraser } from "Web_React_Icons/ci";


export default function ({ attrs, editTask, deleteTask }) {
    console.log(attrs);
    const { id, category, createdAt, description, expireDate, name, prioridad, state } = attrs


    return (
        <div style={{ "height": "80px", "width": "90%", "background": "white", "borderRadius": "16px", "boxShadow": "0 3px 3px #ccc", "margin": "8px", "boxSizing": "border-box" }}>
            <div style={{ "height": "80px", "width": "100%", "boxSizing": "border-box" }} className='flex items-center px-4 py-2 justify-between'>

                <div className='flex justify-center items-center'>
                    <div title={`state of task ${state}`} className={`${state == 'OnProgress' ? 'bg-yellow-600' : (state == 'Pending') ? 'bg-red-600' : 'bg-green-600'} rounded-full h-[30px] w-[30px] mx-5`}>
                    </div>

                    <div className='border-l-2 border-[#5a5a5a] border-solid'>
                        <h2 style={{ "fontSize": "22px", "color": "#555", "margin": "8px 16px", "fontWeight": "500" }}>
                            {name}
                        </h2>
                        <div style={{ "height": "20px", "margin": "0 16px", "display": "flex", "alignItems": "center", }}>
                            <div role='color_category' style={{ "height": "16px", "width": "16px", "borderRadius": "6px", backgroundColor: category?.color ? category?.color : 'wheat' }}>

                            </div>
                            <p style={{ "fontSize": "16px", "color": "#999", "marginLeft": "8px", "fontWeight": "400" }}> {category.name}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p style={{ "fontSize": "16px", "color": "#999", "marginLeft": "8px", "fontWeight": "400" }}>{description}</p>
                </div>
                <div>
                    <p style={{ "fontSize": "12px", "color": "#999", "marginLeft": "8px", "fontWeight": "400", fontStyle: 'italic' }}>priority</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <p style={{ "fontSize": "14px", "color": "#999", "marginLeft": "8px", "fontWeight": "600", }}>expires on</p>
                    <p style={{ "fontSize": "14px", "color": "#999", "marginLeft": "8px", "fontWeight": "600", fontStyle: 'italic' }}>{new Date(expireDate).toDateString()}</p>
                </div>

                <div className='flex items-center justify-center'>
                    <CiEdit className='w-[24px] h-[24px] m-[24px] bg-white hover:cursor-pointer' onClick={() => editTask(id, attrs)} />
                    <CiEraser className='w-[24px] h-[24px] m-[24px] bg-white hover:cursor-pointer' onClick={() => deleteTask(id)} />
                </div>
            </div>
        </div>
    )
}