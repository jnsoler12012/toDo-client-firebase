import React, { useContext, useEffect } from 'react'
import { CardProfile, CardUserInfo } from '../Components/Cards';
import { MainContext } from '../../Infrastructure';

export default function () {
    const [mainContext, setMainContext] = useContext(MainContext)
    const { user: { info } } = mainContext

    useEffect(() => {
        console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ entramos ');

        return () => {
            console.log('\\\salimos\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ entramos ');
        }
    }, [])

    return (
        <div className='flex  flex-col-reverse justify-end lg:flex-row h-[auto] w-[100%]  py-16 px-3 overflow-y-auto'>
            <div className="w-full lg:w-8/12 px-4">
                <CardUserInfo user={info} context={[mainContext, setMainContext]} />
            </div>
            <div className="w-full lg:w-4/12 px-4 mt-7 lg:mt-5">
                <CardProfile user={info} />
            </div>
        </div>
    )
}

