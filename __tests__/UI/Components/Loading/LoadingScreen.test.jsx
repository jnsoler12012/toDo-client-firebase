import { cleanup, render, screen } from "@testing-library/react";
import { default as LoadingScreen } from "../../../../src/UI/Components/Loading/LoadingScreen.jsx";
import { useState as useStateMock } from "react";

describe('Loading Screen test', () => {
    const ChildrenComponent = <div>
        Test component
    </div>

    let state
    const setState = () => true

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })
    it('should be loading', async () => {
        state = false
        const [loading, setLoading] = useStateMock(false)

        const { rerender } = render(<LoadingScreen loading={state}>
            {ChildrenComponent}
        </LoadingScreen>)

        const style = await screen.getByRole("main_screen_loading")


        expect(style.classList.contains('visible')).toBe(false)
        console.log();

        // screen.debug()


        state = true
        rerender(<LoadingScreen loading={state}>
            {ChildrenComponent}
        </LoadingScreen>)

        const styleRendered = await screen.getByRole("main_screen_loading")

        expect(styleRendered.classList.contains('visible')).toBe(true)

        // screen.debug()
    });
});