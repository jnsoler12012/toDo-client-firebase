import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { default as logo } from 'Images/Logo.png'
import { useForm } from 'react-hook-form';
import { loginValidation, userModificationValidation } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { postCreateUser } from '../../Application/Axios/post';
import { MainContext } from '../../Infrastructure';
import { CardSelectProfileImage } from '../Components/Cards';

export default function () {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(userModificationValidation())
    });
    const [mainContext, setMainContext] = useContext(MainContext)

    const onSubmit = async (dataForm, e) => {
        console.log(dataForm);


        await postCreateUser({ data: dataForm, context: { mainContext, setMainContext } })
            .then((res) => {
                console.log("teyteyyeye", res)

                if (res.error)
                    setMainContext((prevState) => ({
                        ...prevState,
                        user: {
                            token: null
                        }
                    }))
                if (res = res.data) {
                    console.log(res);
                    setTimeout(() => {
                        return navigate('/login')
                    }, 3000);
                }

            })
    }


    return (
        <div role='container-sign-up' className='flex flex-col lg:flex-row' style={{ "width": "100vw", "height": "100vh" }}>

            <div className='px-[4rem] lg:px-[6rem]' style={{ "width": "100%", "height": "100vh", "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "left", "boxSizing": "border-box" }}>
                <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 role='main_title' style={{ "color": "#333", "fontFamily": "Roboto, Arial", "fontSize": "40px", "margin": "12px", "marginLeft": "0" }}>Welcome to TaskMaster</h1>
                    <h2 style={{ "color": "#999", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "300", "margin": "8px", "marginLeft": "0", "marginRight": "16px" }}>
                        Please, insert your information to be saved as login access.
                    </h2>

                    <div className='py-2'>
                        <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                            Email
                        </h2>
                        <input role='email_user' id="email" placeholder="Insert your email"
                            style={{ "width": "100%", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
                            {...register('email')}
                        />
                        {
                            errors?.['email']?.type &&
                            <p role="alert" key={'email'} className="text-red-500 text-base italic">
                                {errors?.['email']?.message}
                            </p>
                        }
                    </div>

                    <div className='py-2'>
                        <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                            Password
                        </h2>
                        <input role='password_user' placeholder="Insert your password" type="password"
                            style={{ "width": "100%", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
                            {...register('password')}
                        />
                        {
                            errors?.['password']?.type &&
                            <p role="alert" key={'password'} className="text-red-500 text-base italic">
                                {errors?.['password']?.message}
                            </p>
                        }
                    </div>

                    <div className='py-2'>
                        <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                            Name
                        </h2>
                        <input role='name_user' placeholder="Insert your name" type="name"
                            style={{ "width": "100%", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
                            {...register('name')}
                        />
                        {
                            errors?.['name']?.type &&
                            <p role="alert" key={'name'} className="text-red-500 text-base italic">
                                {errors?.['name']?.message}
                            </p>
                        }
                    </div>

                    <CardSelectProfileImage formController={{ register, watch, setValue, getValues, errors }} />


                    <div style={{ "display": "flex", "justifyContent": "left", "alignItems": "center", "marginTop": "16px" }}>
                    </div>

                    <button role="submit" type='submit' style={{ "width": "100%", "height": "40px", "borderRadius": "8px", "background": "#7f56da", "color": "white", "fontSize": "16px", "border": "0px", "fontWeight": "400" }}>
                        Register
                    </button>

                    <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                        Already Have an account? <Link to='/public/login'>Login</Link>
                    </h2>
                </form>
            </div>
            <div style={{ "width": "100%", "height": "100vh", "backgroundColor": "#eee", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                <img src={logo} alt="" style={{ "width": "30vw" }} />
            </div>
        </div>
    )
}