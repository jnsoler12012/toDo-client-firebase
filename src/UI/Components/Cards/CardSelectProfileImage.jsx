import React, { useState } from 'react'
import profilePicturesArray from 'Images/user';
import noneProfile from 'Images/user/none.svg';

export default function ({ formController, userRef }) {
    const { register, watch, setValue, getValues, errors } = formController
    const [showProfilePictures, setShowProfilePictures] = useState(true)

    console.log(profilePicturesArray, userRef);

    return (
        <div className='py-2'>
            <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                Select your profile image
            </h2>
            <div className='w-[100%] h-auto flex flex-row'>
                <div className='w-[20%] bg-[#a5a5a500] flex justify-center items-center'>
                    <img className='h-[3.5rem] w-[3.5rem] lg:h-[4.2rem] lg:w-[4.2rem]'
                        src={watch('imageRef') ? profilePicturesArray[watch('imageRef')] : userRef ? profilePicturesArray[userRef] : noneProfile}
                        {...register('imageRef', {
                            value: userRef ? userRef : ''
                        })}
                    />
                </div>
                <div className='w-[80%] p-3 flex justify-center items-center'>
                    <div className='w-auto bg-[#d8d8d8] rounded-lg justify-center items-center flex flex-col border-2 border-solid border-[#696969]'>
                        <p className={`
                        ${showProfilePictures
                                ? ` show_profile_pictures_up border-b-2 border-solid border-[#a0a0a0]`
                                : ` show_profile_pictures_down `
                            } cursor-pointer w-[100%] p-2`
                        } onClick={(e) => {
                            e.preventDefault()
                            setShowProfilePictures(prevState => !prevState)
                        }}>Select image</p>
                        <div className={`flex flex-row flex-wrap justify-evenly overflow-y-auto ${showProfilePictures ? 'max-h-[7.3rem]' : 'h-[0rem] '} overflow-hidden w-[100%] ease-linear transition-all duration-150`}>
                            {
                                Object.keys(profilePicturesArray).map(picture => (
                                    <img key={picture} src={profilePicturesArray[picture]} alt="" className='h-[3.5rem] w-[3.5rem] lg:h-[4.2rem] lg:w-[4.2rem] m-2 rounded-md cursor-pointer'
                                        onClick={(e) => {
                                            console.log('sadasdasdsad');
                                            if (getValues('imageRef') !== profilePicturesArray[picture])
                                                setValue('imageRef', picture)
                                        }} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                errors?.['imageRef']?.type &&
                <p role="alert" key={'imageRef'} className="text-red-500 text-base italic">
                    {errors?.['imageRef']?.message}
                </p>
            }
        </div>
    )
}