import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { getByTestId, render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

import mockFetch from '../services/fetchColorService'

jest.mock('../services/fetchColorService')

const randomColorList = [
    {
        id: 0,
        color: "aliceblue",
        code: {
            hex: "#f0f8ff" 
        }        
    },
    {
        id: 1,
        color: "lilac",
        code: {
            hex: "#9a99dd" 
        }        
    },
]

test("Renders without errors", async ()=> {

    mockFetch.mockResolvedValueOnce({data: []})

    render(<BubblePage />)

    await waitFor(() => {

        const heading = screen.getByText(/Bubbles/i)
    
        expect(heading).toBeInTheDocument();
        
    })
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    mockFetch.mockResolvedValueOnce({data: randomColorList})
    render(<BubblePage />)
    await waitFor(() => {
        const list = screen.queryAllByTestId(/color/i)
        expect(list).toHaveLength(2)
    })
});