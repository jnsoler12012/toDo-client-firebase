import React from 'react'
import { FaBriefcase, FaRegIdCard } from "Web_React_Icons/fa";
import { LiaUniversitySolid } from "Web_React_Icons/lia";
import { MdAttachEmail } from "Web_React_Icons/md";
import { GrUserAdmin, GrUser } from "Web_React_Icons/gr";
import profilePicturesArray from 'Images/user';

export default function ({ user }) {

    console.log(user);
    const { createdAt, document, email, id, name, role, state, imageRef} = user

    console.log(user, new Date(createdAt), createdAt, document, email, id, name, role, state);

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-10">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                                <img
                                    alt="..."
                                    src={profilePicturesArray[imageRef]}
                                    className="h-[7rem] w-[7rem] shadow-xl rounded-full align-middle border-none absolute mt-[-4rem] ml-[-3.5rem] max-w-150-px"
                                />
                            </div>
                        </div>
                        <div className="w-full px-4 text-center mt-10">
                            <div className="flex justify-center py-4 lg:pt-7 pt-4">
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                        22
                                    </span>
                                    <span className="text-sm text-blueGray-400">Tasks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {name}
                        </h3>
                        <div className="flex justify-center items-center text-sm leading-normal mt-2 mb-1 text-blueGray-800 font-bold uppercase">
                            <MdAttachEmail className="mr-2 text-lg h-[1.4rem] w-[1.4rem]" />
                            {email}
                        </div>
                    </div>
                    <div className="mt-5 py-2 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-2 lg:mg-4 text-lg leading-relaxed text-blueGray-700">
                                    User Created at:
                                </p>
                                <p className="mb-2 lg:mg-4 text-lg leading-relaxed font-bold">
                                    {new Date(createdAt).toDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}