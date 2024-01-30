import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { categoryValidation } from '../../utils/validations';
import ReactDatePicker from 'react-datepicker';
import { HiXMark } from "Web_React_Icons/hi2";
import { postCreateCategory, postCreateTask, postUpdateTask } from '../../../Application/Axios/post';

export default function ({ close, user, context }) {

    const [mainContext, setMainContext] = context

    const { register, handleSubmit, reset, getValues, setValue, setError, watch, formState: { errors } } = useForm({
        resolver: yupResolver(categoryValidation())
    });

    useEffect(() => {


        return () => {

        }
    }, [watch])




    const handleSubmitForm = (dataForm, e) => {
        e.preventDefault()
        console.log(dataForm, e);

        (
            async () => await postCreateCategory({
                data: {
                    ...dataForm,
                    idRequester: user.id
                },
                context: { mainContext, setMainContext }
            }).then(data => {
                console.log("||\\\\\\PRODUICT||||||||||||||| CREADO HECHA", data);

                setTimeout(() => {
                    setMainContext((prevState => ({
                        ...prevState,
                        reloadType: true
                    })))
                    close(false)
                }, 1600);
            })
        )()

    }


    return (
        <div className='absolute top-0 left-0 flex w-[100vw] h-[100vh] bg-[#94949451] justify-center items-center'>
            <div className='bg-[white] w-[85%] lg:w-[40%] h-[auto] p-5 rounded-2xl'>
                <form id={`form-create`} onSubmit={handleSubmit(handleSubmitForm)} >
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[1.5rem] font-[600]'>Create new Category</h1>
                        <HiXMark className='h-[30px] w-[30px] cursor-pointer' onClick={(e) => { close(false) }} />
                    </div>
                    <div id='options_task_category' className='flex w-[100%]  flex-col lg:flex-row'>

                        <div className="w-full px-3 mb-6 md:mb-0 my-[1rem]">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'name'}>
                                Name
                            </label>
                            <input className={` block w-full bg-white  focus:bg-[#e8e8e88d] focus:border rounded py-3 px-2 focus:outline-none active:bg-white transition-colors duration-300 text-[#595959] text-sm leading-7 lg:leading-[1.85em]`}
                                defaultValue={''}
                                id={'name'}
                                placeholder='Task name'
                                type="text"

                                {...register('name')} />
                            {
                                errors?.[`${'name'}`]?.type &&
                                <p key={`${'name'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                    {errors?.[`${'name'}`]?.message}
                                </p>
                            }
                        </div>

                        <div className="w-full px-3 mb-6 md:mb-0 my-[1rem]">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'color'}>
                                Color
                            </label>
                            <div className='flex justify-evenly items-center'>
                                <button style={{ "width": "41%", "height": "40px", "borderRadius": "8px", "background": "#7f56da", "color": "white", "fontSize": "16px", "border": "0px", "fontWeight": "400" }}
                                    className='cursor-pointer'
                                    name="Random Color"
                                    defaultValue={"#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}
                                    id={'color'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setValue('color', "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
                                    }}
                                    {...register('color')} >
                                    generate
                                </button>
                                <div className={` w-[4rem] h-[2.5rem] rounded-lg`} style={{ backgroundColor: watch('color'), border: !watch('color') && 'black 1px solid' }}>
                                </div>
                            </div>
                            {
                                errors?.[`${'color'}`]?.type &&
                                <p key={`${'color'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify mt-3">
                                    {errors?.[`${'color'}`]?.message}
                                </p>
                            }

                        </div>

                    </div>

                    <div className='m-3' >
                        <button className={`bg-emerald-600 active:bg-emerald-700 hover:text-white hover:bg-opacity-90 group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-9 px-5 py-3 w-full text-white `} disabled=""
                            type='submit'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6 text-[#ffffff] mr-3" xmlns="http://www.w3.org/2000/svg"><path d="M380.44 32H64a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h384a32.09 32.09 0 0 0 32-32V131.56zM112 176v-64h192v64zm223.91 179.76a80 80 0 1 1-83.66-83.67 80.21 80.21 0 0 1 83.66 83.67z"></path></svg>
                            Save Task
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}