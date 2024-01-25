import React, { createRef, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { default as logo } from 'Images/Logo.png'
import { useForm } from 'react-hook-form';
import { loginValidation } from '../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { MainContext } from '../../Infrastructure';
import { postLoginUser, postResetPasswordUser } from '../../Application/Axios/post';
import { encode, parseJwt } from '../../Infrastructure/utils';
import emailjs from '@emailjs/browser';


export default function () {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidation())
    });
    const [mainContext, setMainContext] = useContext(MainContext)
    const [forgotPassword, setForgotPassword] = useState(false);
    const [OTP, setOTP] = useState(null);
    const [emailResetPassword, setEmailResetPassword] = useState(null)
    const [OTPuser, setOTPuser] = useState(0)
    const [resetPasswordState, setResetPasswordState] = useState(false)
    const [newPassword, setNewPassword] = useState('')

    const newPasswordRef = createRef()


    const handleForgotPassword = (e) => {

        if (forgotPassword) {
            setForgotPassword(false)
            setOTP(null)
            setEmailResetPassword(null)
            setResetPasswordState(false)
            setOTPuser(0)
            setValue('password', '')
        } else {
            setForgotPassword(true)
            setValue('password', '*********')
        }
    }

    const handleSendOTP = async (dataForm) => {
        const OTPNumber = Math.floor(Math.random() * 9000 + 1000);
        setEmailResetPassword(dataForm.email)
        setOTP(OTPNumber)
        setTimeout(() => {
            setOTP(null)
        }, 480000);

        return await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            {
                to_name: dataForm.email,
                from_email: 'ToDo Techinical service',
                to_email: dataForm.email,
                message: `OTP:  ${OTPNumber}`,
            },
            process.env.EMAILJS_PUBLIC_KEY
        ).catch(err => {
            setMainContext(prevState => ({
                ...prevState,
                notification: {
                    type: "WARNING",
                    message: err.text,
                },
            }))
        }).then((res) => {

            if (res) {
                setEmailResetPassword(dataForm.email)
                setOTP(OTPNumber)
                setTimeout(() => {
                    setOTP(null)
                }, 480000);
                setMainContext(prevState => ({
                    ...prevState,
                    notification: {
                        type: "INFO",
                        message: 'An unique 4-digits OTP code has been send to you. Only valid for 8 minutes',
                    },
                }))
            }

        })
    }

    const validateOTP = (e) => {
        e.preventDefault()
        if (OTP === parseInt(OTPuser)) {
            console.log('esccorrescttt');
            setResetPasswordState(true)

        } else {
            console.log('nnonononnoonon', OTP, OTPuser);
        }
    }

    console.log(process.env.EMAILJS_SERVICE_ID);

    const onSubmit = async (dataForm, e) => {
        console.log(dataForm, e);

        const { submitter: submitterButton } = e.nativeEvent



        const actionId = (submitterButton) ? submitterButton.id : e.target.id

        console.log(actionId, newPasswordRef?.current?.validity, newPasswordRef);

        if (actionId == 'submit-forgot') {
            handleSendOTP(dataForm)
        } else if (actionId == 'submit-login') {
            await postLoginUser({ data: { email: dataForm.email, password: dataForm.password }, context: { mainContext, setMainContext } })
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
                        console.log(parseJwt(res.token).exp >= Math.floor(Date.now() / 1000));

                        const userString = Object.entries(res.data.user).map(attr => (`${attr[0]}=${attr[1]},`)).join('');

                        window.localStorage.setItem('userToDo', userString);
                        window.localStorage.setItem('TOKENtodo', encode(res.token));

                        console.log(window.localStorage.getItem("TOKENtodo"));

                        setMainContext((prevState) => ({
                            ...prevState,
                            user: {
                                token: window.localStorage.getItem('TOKENtodo'),
                                info: res.data.user
                            }
                        }))
                    }

                })
        } else if (actionId == 'submit-new-password') {
            if (newPasswordRef?.current?.validity?.valid) {
                console.log('podemos envaaaaaaaaaaaaaaaaaaaar', dataForm);
                await postResetPasswordUser({ data: { email: emailResetPassword, password: newPassword }, context: { mainContext, setMainContext } })
                    .then((res) => {
                        console.log("teyteyyeye", res)

                        if (res.error)
                            setMainContext(prevState => ({
                                ...prevState,
                                notification: {
                                    type: "Warning",
                                    message: `Error changing password`,
                                },
                            }))
                        if (res = res.data) {
                            handleForgotPassword()
                        }

                    })
            }
        }
    }


    return (
        <div style={{ "width": "100vw", "height": "100vh", "display": "flex", "flex": "row" }}>
            <div style={{ "width": "50vw", "height": "100vh", "backgroundColor": "#eee", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                <img src={logo} alt="" style={{ "width": "30vw" }} />
            </div>
            <div style={{ "width": "50vw", "height": "100vh", "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "left", "paddingLeft": "12.5vw", "boxSizing": "border-box" }}>
                <form id="login-form" onSubmit={handleSubmit(onSubmit)}>

                    <h1 role='main_title' style={{ "color": "#333", "fontFamily": "Roboto, Arial", "fontSize": "40px", "margin": "12px", "marginLeft": "0" }}>Welcome to TaskMaster</h1>

                    {
                        forgotPassword
                            ? (<>
                                <h2 style={{ "color": "#999", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "300", "margin": "8px", "marginLeft": "0", "marginRight": "16px" }}>
                                    You forgot your password? Get a 4-digit OTP code on your email and recover your account. Only valid for 8 minutes
                                </h2>

                                {
                                    resetPasswordState
                                        ? (
                                            <>
                                                <div className='py-2'>
                                                    <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                                        New Password <p className='text-sm italic'>only 4-20 digits are permited</p>
                                                    </h2>
                                                    <input placeholder="Insert your new password" type="text"
                                                        ref={newPasswordRef}
                                                        value={newPassword || ''}
                                                        id='new-password'
                                                        style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "boxSizing": "border-box" }}
                                                        className='text-[#777] valid:text-green-700 invalid:text-red-700'
                                                        pattern="^.{4,20}$"
                                                        onChange={(e) => { e.preventDefault(); setNewPassword(e.target.value) }}

                                                    />
                                                </div>
                                            </>
                                        )
                                        : OTP !== null
                                            ? (
                                                <>
                                                    <div className='py-4'>
                                                        <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                                            OTP code {OTP} {OTPuser}
                                                        </h2>
                                                        <input id="otp" placeholder="Insert your 4 digits OTP" type='text'
                                                            pattern="\d{4}"

                                                            style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "boxSizing": "border-box" }}
                                                            onChange={(e) => setOTPuser(e.target.value)}
                                                            className='text-[#777] valid:text-green-700 invalid:text-red-700'
                                                        />
                                                    </div>
                                                    <h4 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0", fontStyle: 'italic' }}>
                                                        <a className='cursor-pointer' onClick={(e) => handleSendOTP({ email: emailResetPassword })}> resend OTP code</a>
                                                    </h4>
                                                </>
                                            )
                                            : (
                                                <div className='py-4'>
                                                    <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                                        Email
                                                    </h2>
                                                    <input id="email" placeholder="Insert your email"
                                                        style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
                                                        {...register('email')}
                                                    />
                                                    {
                                                        errors?.['email']?.type &&
                                                        <p role="alert" key={'email'} className="text-red-500 text-base italic">
                                                            {errors?.['email']?.message}
                                                        </p>
                                                    }
                                                </div>
                                            )
                                }


                                <div className='py-2 hidden'>
                                    <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                        Password
                                    </h2>
                                    <input placeholder="Insert your password" type="password"
                                        style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
                                        {...register('password', {
                                            value: 'noneP'
                                        })}
                                    />
                                    {
                                        errors?.['password']?.type &&
                                        <p role="alert" key={'password'} className="text-red-500 text-base italic">
                                            {errors?.['password']?.message}
                                        </p>
                                    }
                                </div>

                                {
                                    resetPasswordState
                                        ? (
                                            <button id='submit-new-password' style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "background": "#7f56da", "color": "white", "fontSize": "16px", "border": "0px", "fontWeight": "400" }}
                                                onClick={(e) => { onSubmit({ email: emailResetPassword, password: newPassword }, e); }}
                                            >
                                                Reset Password
                                            </button>
                                        )
                                        : OTP !== null
                                            ? (
                                                <button style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "background": "#7f56da", "color": "white", "fontSize": "16px", "border": "0px", "fontWeight": "400" }}
                                                    onClick={(e) => validateOTP(e)}
                                                >
                                                    Validate OTP
                                                </button>
                                            )
                                            : (
                                                <button role="submit" type='submit' id='submit-forgot' style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "background": "#7f56da", "color": "white", "fontSize": "16px", "border": "0px", "fontWeight": "400" }}>
                                                    Send OTP code
                                                </button>
                                            )
                                }

                            </>)
                            : (
                                <>
                                    <h2 style={{ "color": "#999", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "300", "margin": "8px", "marginLeft": "0", "marginRight": "16px" }}>
                                        Please, insert your informations to access your tasks.
                                    </h2>
                                    <div className='py-2'>
                                        <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                            Email
                                        </h2>
                                        <input role='email_user' id="email" placeholder="Insert your email"
                                            style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
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
                                            style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "border": "1px solid #999", "paddingLeft": "8px", "fontSize": "16px", "color": "#777", "boxSizing": "border-box" }}
                                            {...register('password')}
                                        />
                                        {
                                            errors?.['password']?.type &&
                                            <p role="alert" key={'password'} className="text-red-500 text-base italic">
                                                {errors?.['password']?.message}
                                            </p>
                                        }
                                    </div>

                                    <button role="submit" type='submit' id='submit-login' style={{ "width": "25vw", "height": "40px", "borderRadius": "8px", "background": "#7f56da", "color": "white", "fontSize": "16px", "border": "0px", "fontWeight": "400" }}>
                                        Sign In
                                    </button>
                                </>
                            )

                    }








                    <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                        Don't have an account? <Link to='/public/signup'>Sign Up</Link>
                    </h2>
                    {
                        !forgotPassword
                            ? (
                                <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                    <a className='cursor-pointer' onClick={(e) => handleForgotPassword(e)}> Forgot Password?</a>
                                </h2>
                            )
                            : (
                                <h2 style={{ "color": "#777", "fontFamily": "Roboto, Arial", "fontSize": "16px", "fontWeight": "", "margin": "8px", "marginLeft": "0" }}>
                                    <a className='cursor-pointer' onClick={(e) => handleForgotPassword(e)}>Return to Log In</a>
                                </h2>
                            )
                    }


                </form>

            </div>
        </div>
    )
}