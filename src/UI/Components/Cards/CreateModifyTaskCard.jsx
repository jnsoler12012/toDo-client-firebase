import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { taskValidation } from '../../utils/validations';
import ReactDatePicker from 'react-datepicker';
import { HiXMark } from "Web_React_Icons/hi2";
import { postCreateTask, postUpdateTask } from '../../../Application/Axios/post';

export default function ({ editingTask, close, availableTypes, user, context }) {

    const [mainContext, setMainContext] = context
    const currentEditingTask = editingTask
    const { register, handleSubmit, reset, getValues, setValue, setError, formState: { errors } } = useForm({
        resolver: yupResolver(taskValidation())
    });



    console.log(currentEditingTask);
    let taskInfo = {}

    if (currentEditingTask == undefined) {
        taskInfo['name'] = ''
        taskInfo['description'] = ''
        taskInfo['type'] = ''
        taskInfo['state'] = 'OnProgress'
        taskInfo['priority'] = 'OnTime'
    } else {
        taskInfo = Object.assign({}, currentEditingTask)
        taskInfo['type'] = currentEditingTask.category
    }

    const todayDate = new Date()
    const [expireDateProp, setExpireDateProp] = useState((currentEditingTask === undefined ? todayDate : new Date(taskInfo['expireDate'])))

    console.log(taskInfo);
    useEffect(() => {
        console.log('cambio el tipo de edit');

        return () => {

        }
    }, [currentEditingTask])

    const handleSubmitForm = (dataForm, e) => {
        e.preventDefault()
        console.log(dataForm, e, expireDateProp);
        let dataTask = Object.assign({}, dataForm)
        dataTask['expireDate'] = expireDateProp.getTime()

        console.log(dataTask, user, context);

        if (currentEditingTask == undefined) {
            (
                async () => await postCreateTask({
                    data: dataTask,
                    id: {
                        idRequester: user.id,
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    console.log("||\\\\\\PRODUICT||||||||||||||| CREADO HECHA", data);

                    setTimeout(() => {
                        setMainContext((prevState => ({
                            ...prevState,
                            reload: true
                        })))
                        close(false)
                    }, 1600);
                })
            )()
        } else {
            (
                async () => await postUpdateTask({
                    data: dataTask,
                    id: {
                        idRequester: user.id,
                        idRequested: currentEditingTask.id
                    },
                    context: { mainContext, setMainContext }
                }).then(data => {
                    console.log("||\\\\\\PRODUICT||||||||||||||| CREADO HECHA", data);

                    setTimeout(() => {
                        setMainContext((prevState => ({
                            ...prevState,
                            reload: true
                        })))
                        close(false)
                    }, 1600);
                })
            )()
        }

    }


    return (
        <div className='absolute top-0 left-0 flex w-[100vw] h-[100vh] bg-[#94949451] justify-center items-center'>
            <div className='bg-[white] w-[85%] lg:w-[40%] h-[auto] p-5 rounded-2xl'>
                <form id={`form-create`} onSubmit={handleSubmit(handleSubmitForm)} >
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[1.5rem] font-[600]'>{
                            currentEditingTask == undefined ? 'Create' : 'Modify'
                        } task</h1>
                        <HiXMark className='h-[30px] w-[30px] cursor-pointer' onClick={(e) => { close(false) }} />
                    </div>
                    <div id='options_task' className='flex w-[100%] flex-col lg:flex-row'>
                        <div className='w-[100%] lg:w-1/2'>
                            <div className="w-full px-3 mb-6 md:mb-0 my-[1rem]">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'name'}>
                                    Name
                                </label>
                                <input className={` block w-full bg-white  focus:bg-[#e8e8e88d] focus:border rounded py-3 px-2 focus:outline-none active:bg-white transition-colors duration-300 text-[#595959] text-sm leading-7 lg:leading-[1.85em]`}
                                    defaultValue={taskInfo['name']}
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'description'}>
                                    Description
                                </label>
                                <input className={` block w-full bg-white  focus:bg-[#e8e8e88d] focus:border rounded py-3 px-2 focus:outline-none active:bg-white transition-colors duration-300 text-[#595959] text-sm leading-7 lg:leading-[1.85em]`}
                                    defaultValue={taskInfo['description']}
                                    id={'description'}
                                    placeholder='Task description'
                                    type="text"
                                    {...register('description')} />
                                {
                                    errors?.[`${'description'}`]?.type &&
                                    <p key={`${'description'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                        {errors?.[`${'description'}`]?.message}
                                    </p>
                                }
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-0 my-[1rem] flex flex-col content-center items-center justify-center">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'type'}>
                                    Type
                                </label>
                                {
                                    availableTypes.length > 0
                                        ? (
                                            <>
                                                <select name="select-type" id="type"
                                                    style={{
                                                        "backgroundPosition": 'right center', "padding": "5px", "paddingRight": "20px"
                                                    }}
                                                    defaultValue={taskInfo['type']}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        console.log(e.target.value, e);
                                                    }}
                                                    {...register('type')}
                                                >
                                                    {
                                                        availableTypes.map(type => <option key={type?.name} className='capitalize' value={type?.name}>{type?.name}</option>)
                                                    }
                                                </select>
                                                {
                                                    errors?.[`${'type'}`]?.type &&
                                                    <p key={`${'type'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                                        {errors?.[`${'type'}`]?.message}
                                                    </p>
                                                }
                                            </>
                                        )
                                        : (
                                            <div>No types for tasks available, please create a new one</div>
                                        )
                                }

                            </div>
                        </div>
                        <div className='w-[100%] lg:w-1/2'>
                            <div className="w-full px-3 mb-6 md:mb-0 my-[1rem] flex flex-col content-center items-center justify-center">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'state'}>
                                    State
                                </label>
                                <select name="select-state" id="state"
                                    style={{
                                        "backgroundPosition": 'right center', "padding": "5px", "paddingRight": "20px"
                                    }}
                                    defaultValue={taskInfo['state']}
                                    {...register('state')}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        console.log(e.target.value, e);
                                    }}>
                                    {
                                        ['Pending', 'OnProgress', 'Completed'].map(type => <option key={type} className='capitalize' value={type}>{type}</option>)
                                    }
                                </select>
                                {
                                    errors?.[`${'state'}`]?.type &&
                                    <p key={`${'state'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                        {errors?.[`${'state'}`]?.message}
                                    </p>
                                }
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0 my-[1rem] flex flex-col content-center items-center justify-center">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'priority'}>
                                    Priority
                                </label>
                                <select name="select-priority" id="priority"
                                    style={{
                                        "backgroundPosition": 'right center', "padding": "5px", "paddingRight": "20px"
                                    }}
                                    defaultValue={taskInfo['priority']}
                                    {...register('priority')}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        console.log(e.target.value, e);
                                    }}>
                                    {
                                        ['Urgent', 'OnTime'].map(type => <option key={type} className='capitalize' value={type}>{type}</option>)
                                    }
                                </select>
                                {
                                    errors?.[`${'priority'}`]?.type &&
                                    <p key={`${'priority'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                        {errors?.[`${'priority'}`]?.message}
                                    </p>
                                }
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0 my-[1rem] flex flex-col content-center items-center justify-center">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhtml={'expireDate'}>
                                    Expire Date Task
                                </label>

                                <div className="customDatePickerWidth">
                                    <ReactDatePicker

                                        selected={expireDateProp}
                                        showIcon
                                        minDate={todayDate}
                                        onChange={(date) => setExpireDateProp(date)}
                                        icon="fa fa-calendar"

                                    />
                                </div>

                                {
                                    errors?.[`${'expireDate'}`]?.type &&
                                    <p key={`${'expireDate'}`} className="text-red-500 text-[0.85rem] italic overflow-wrap text-ellipsis overflow-hidden text-justify">
                                        {errors?.[`${'expireDate'}`]?.message}
                                    </p>
                                }
                            </div>

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