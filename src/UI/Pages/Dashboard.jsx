import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Infrastructure';
import { getAllTaskByUser } from '../../Application/Axios/get';
import { CreateModifyTaskCard, TaskCard } from '../Components/Cards';
import { CgAddR } from "Web_React_Icons/cg";
import { deleteTask } from '../../Application/Axios/delete';

export default function () {
    const [mainContext, setMainContext] = useContext(MainContext)
    const { category, state } = mainContext.filter
    const { filterOptions, currentTaskEdition } = mainContext

    const [creationEditionTask, setCreationEditionTask] = useState(false)
    const [currentEditingTask, setCurrentEditingTask] = useState(undefined)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL PRODUCT");


        if (mainContext?.services?.axios && (tasks.length <= 0 || mainContext?.reload)) {
            console.log("@@DASHBOARD@@@@@@@@@@@@ PETICION PORQUE SI", mainContext);
            (async () => {
                await getAllTaskByUser({
                    data: {
                        state: state,
                        categories: category,
                        idRequester: mainContext?.user?.info?.id
                    },
                    context: { mainContext, setMainContext }
                }).then((data) => {

                    if (!data?.error)
                        if (data?.data)
                            if (data?.data?.data.length > 0) {
                                console.log(data);
                                setTasks(data?.data?.data)
                            }
                            else
                                setTasks(['none'])
                })
            })()
        }

        return () => {
            console.log("\\RETURN\\\\\\\\\\\\\\\\\\\\\\\\ CAMBIO PRINCIPAL PRODUCT");

        }
    }, [mainContext?.filter, mainContext?.reload])

    const handleSelectionFilterState = (e, name) => {
        e.preventDefault()

        if (name !== state)
            setMainContext(prevState => ({
                ...prevState,
                reload: true,
                filter: {
                    ...prevState.filter,
                    state: name
                }
            }))
    }

    const handleEditTask = (id, attrs) => {
        console.log(id, attrs);

        setMainContext((prevState => ({
            ...prevState,
            currentTaskEdition: {
                ...attrs
            }
        })))
        setCreationEditionTask(true)
    }

    const handleCloseEditCreateTask = () => {
        setCreationEditionTask(false)
        setMainContext((prevState => ({
            ...prevState,
            currentTaskEdition: undefined
        })))
    }

    const handleDeleteTask = (id) => {
        console.log(id);

        if (confirm('The task will be deleted, Continue?')) {
            (async () => {
                await deleteTask({
                    data: {
                        idTask: id,
                    },
                    userId: {
                        idUserRequester: mainContext?.user?.info?.id
                    },
                    context: { mainContext, setMainContext }
                }).then((data) => {
                    console.log(data);
                    if (!data?.error)
                        if (data?.data)
                            setTimeout(() => {
                                setMainContext((prevState => ({
                                    ...prevState,
                                    reload: true
                                })))
                                close(false)
                            }, 1600);
                })
            })()
        } else {

        }
    }

    return (
        <>
            <div style={{ "height": "100vh", "width": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "start", "overflowY": "auto" }}>
                <h1 style={{ "fontSize": "40px", "fontWeight": "400", "color": "#555", "margin": "16px" }}>Your tasks</h1>


                <div role='filters_state' style={{ "width": "80%", "height": "auto", "display": "flex", "justifyContent": "flex-end", "marginRight": '2rem' }}>
                    <div onClick={(e) => handleSelectionFilterState(e, 'All')}>
                        <div style={{ "width": "auto", "height": "24px", "borderRadius": "8px", "border": "1px solid #ccc", "display": "flex", "alignItems": "center", "justifyContent": "center", "margin": "0 2px", "padding": '12px' }} className={`hover:cursor-pointer hover:bg-[#eee] ${state == 'All' && 'bg-[#afafaf]'}`}>
                            <h3 style={{ "fontSize": "16px", }} className={` ${state == 'All' ? ' text-[black]' : ' text-[#ccc]'}`}>
                                All
                            </h3>
                        </div>
                    </div>
                    <div onClick={(e) => handleSelectionFilterState(e, 'Pending')}>
                        <div style={{ "width": "auto", "height": "24px", "borderRadius": "8px", "border": "1px solid #ccc", "display": "flex", "alignItems": "center", "justifyContent": "center", "margin": "0 2px", "padding": '12px' }} className={`hover:cursor-pointer hover:bg-[#eee] ${state == 'Pending' && 'bg-[#afafaf]'}`}>
                            <h3 style={{ "fontSize": "16px" }} className={` ${state == 'Pending' ? ' text-[black]' : ' text-[#ccc]'}`}>
                                Pending
                            </h3>
                        </div>
                    </div>
                    <div onClick={(e) => handleSelectionFilterState(e, 'OnProgress')}>
                        <div style={{ "width": "auto", "height": "24px", "borderRadius": "8px", "border": "1px solid #ccc", "display": "flex", "alignItems": "center", "justifyContent": "center", "margin": "0 2px", "padding": '12px' }} className={`hover:cursor-pointer hover:bg-[#eee] ${state == 'OnProgress' && 'bg-[#afafaf]'}`}>
                            <h3 style={{ "fontSize": "16px" }} className={` ${state == 'OnProgress' ? ' text-[black]' : ' text-[#ccc]'}`}>
                                OnProgress
                            </h3>
                        </div>
                    </div>
                    <div onClick={(e) => handleSelectionFilterState(e, 'Completed')}>
                        <div style={{ "width": "auto", "height": "24px", "borderRadius": "8px", "border": "1px solid #ccc", "display": "flex", "alignItems": "center", "justifyContent": "center", "margin": "0 2px", "padding": '12px' }} className={`hover:cursor-pointer hover:bg-[#eee] ${state == 'Completed' && 'bg-[#afafaf]'}`}>
                            <h3 style={{ "fontSize": "16px" }} className={` ${state == 'Completed' ? ' text-[black]' : ' text-[#ccc]'}`}>
                                Completed
                            </h3>
                        </div>
                    </div>
                </div>

                {
                    tasks[0] !== 'none'
                    ? tasks.map(task => <TaskCard attrs={task} key={task.id} editTask={handleEditTask} deleteTask={handleDeleteTask} />)
                    : (
                        <div>
                            There are no tasks
                        </div>
                    )
                }
                <div style={{ "height": "50px", "width": "70vw", "border": "1px solid #ccc", "borderRadius": "16px", "display": "flex", "margin": "8px", "boxSizing": "border-box", "alignItems": "center", "justifyContent": "center" }} className='hover:bg-[#eee] hover:cursor-pointer'
                    onClick={(e) => setCreationEditionTask(true)}
                >
                    <CgAddR className='text-[#929292] h-[25px] w-[25px]' />
                    <p style={{ "color": "#ccc", "fontSize": "20px", "fontWeight": "400", "margin": "16px" }}>Add a task</p>
                </div>
            </div>
            {
                creationEditionTask && <CreateModifyTaskCard editingTask={currentTaskEdition} close={handleCloseEditCreateTask} availableTypes={filterOptions} user={mainContext?.user?.info} context={[mainContext, setMainContext]} />
            }
        </>
    )
}