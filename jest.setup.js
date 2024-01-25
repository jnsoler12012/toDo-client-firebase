import React from "react";
import '@testing-library/jest-dom'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}))