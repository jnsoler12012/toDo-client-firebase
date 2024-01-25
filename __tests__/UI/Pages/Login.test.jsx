

import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MainContext } from "../../../src/Infrastructure/App.jsx";
import { useState as useStateMock } from "react";
import { default as Login } from "../../../src/UI/Pages/Login.jsx";


describe("Login page", () => {
    const setState = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })

    it("should display Login main elements correctly", async () => {

        const root = document.createElement('div');
        document.body.appendChild(root);

        const [main, setMain] = useStateMock({
            reload: true,
            loading: false,
            user: {
                token: null,
                info: null
            }
        })


        render(
            <MainContext.Provider value={[main, setMain]}>
                <BrowserRouter initialEntries={['/']}>
                    <Routes>
                        <Route index path="/v1" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>
            ,
            root
        );
        // screen.debug()
        expect(await screen.getByRole("main_title")).toBeInTheDocument()
        expect(await screen.getByRole("email_user")).toBeInTheDocument()
        expect(await screen.getByRole("password_user")).toBeInTheDocument()
    })

    // test('renders signup form correctly', () => {
    //     const { getByText, getByPlaceholderText } = render(<BrowserRouter>
    //         <SignUp />
    //     </BrowserRouter>);

    //     // Check if important elements are rendered
    //     const welcomeText = getByText(/Welcome to Tasker/i);
    //     const emailInput = getByPlaceholderText(/Insert your email/i);
    //     const passwordInput = getByPlaceholderText(/Insert your password/i);
    //     const signInButton = getByText(/Register/i);

    //     expect(welcomeText).toBeInTheDocument();
    //     expect(emailInput).toBeInTheDocument();
    //     expect(passwordInput).toBeInTheDocument();
    //     expect(signInButton).toBeInTheDocument();
    // });
})

