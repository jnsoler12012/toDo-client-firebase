import { cleanup } from "@testing-library/react";
import { useState as useStateMock } from "react";


import * as axios from "axios";
import { postLoginUser } from "../../../../src/Application/Axios/post";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");


describe('Post login user tests', () => {
    const setState = jest.fn()
    let context

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {

        useStateMock.mockImplementation(init => [init, setState])

        const [mainContext, setMainContext] = useStateMock({
            reload: true,
            loading: false,
            services: {
                axios: axios
            }
        })


        context = { mainContext, setMainContext }
    })

    axios.request.mockImplementation((e) => {
        //console.log(e);

        if (e?.data?.email == 'test@gmail.com') {
            return Promise.resolve({
                status: 200, data: {
                    response: 'User created success'
                }
            })
        } else
            return Promise.resolve({
                status: 300, data: {
                    response: 'User does not exists'
                }
            })
    });



    it('success login user', async () => {

        const data = {
            email: 'test@gmail.com',
            password: 'password'
        }

        const response = await postLoginUser({
            data,
            context
        })

        expect(response?.data?.response).toBe('User created success')
        //console.log(response);
    });

    it('error login user', async () => {

        const data = {
            email: 'tester@gmail.com',
            password: 'password'
        }

        const response = await postLoginUser({
            data,
            context
        })

        expect(response?.data?.response).toBe('User does not exists')
        //console.log(response);
    });
});