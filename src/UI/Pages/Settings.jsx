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
        <div style={{ "height": "100vh", "width": "auto", "overflowY": "auto" }} className='flex py-16 px-3'>
            <div className="w-full lg:w-8/12 px-4">
                <CardUserInfo user={info} context={[mainContext, setMainContext]} />
            </div>
            <div className="w-full lg:w-4/12 px-4">
                <CardProfile user={info}/>
            </div>
        </div>
    )
}

