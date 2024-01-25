import { cleanup } from "@testing-library/react";
import mainAxios from "../../../src/Application/Axios/mainAxios.js";
import { useState as useStateMock } from "react";


import * as axios from "axios";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");


describe('Main Axios tests', () => {
    const setState = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })


    it('main', async () => {
        const [mainContext, setMainContext] = useStateMock({
            reload: true,
            loading: false,
            services: {
                axios: axios
            }
        })
        axios.request.mockImplementation(() => Promise.resolve({
            status: 200, data: {
                response: 'User auth success'
            }
        }));

        const context = { mainContext, setMainContext }
        const props = {
            url: "/auth/login",
            method: "GET",
            payload: {
                email: 'test',
                password: 'password'
            }
        }

        const response = await mainAxios({
            context,
            props
        })

        expect(response?.data?.response).toBe('User auth success')
    });
});