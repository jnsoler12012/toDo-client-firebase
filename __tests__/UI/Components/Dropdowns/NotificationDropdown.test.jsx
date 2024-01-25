import { useState as useStateMock } from "react";
import { default as NotificationDropdown } from "../../../../src/UI/Components/Dropdowns/NotificationDropdown.jsx";
import { cleanup, render, screen } from "@testing-library/react";
import { MainContext } from "../../../../src/Infrastructure";

describe('Notification DropDown', () => {

    const setState = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })


    it('should be present', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const [main, setMain] = useStateMock({
            reload: true,
            loading: false,
            notification: {
                type: "SUCCESS",
                message: 'message of text'
            }
        })


        render(
            <MainContext.Provider value={[main, setMain]}>
                <NotificationDropdown mainState={main} setMainState={setMain}>
                    <div>
                        Componente de prueba
                    </div>
                </NotificationDropdown>
            </MainContext.Provider>
            ,
            root
        );

        screen.debug()
        expect(await screen.getByTestId('SuccessOutlinedIcon')).toBeInTheDocument()
        expect(screen.queryByTestId("WarningOutlinedIcon")).not.toBeTruthy()
    });
});