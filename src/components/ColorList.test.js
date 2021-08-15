import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, rerender } from "@testing-library/react";
import ColorList from './ColorList';

import { fetchColorService as mockFetch } from '../services/fetchColorService';

const emptyColorList = []

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


test("Renders an empty list of colors without errors", async () => {
    // mockFetch.mockResolvedValueOnce({ data: []} )
    render(<ColorList colors={emptyColorList}/>)
    const colorId = screen.queryAllByTestId(/color/)
    expect(colorId).toHaveLength(0)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={randomColorList}/>)
    const colorId = screen.queryAllByTestId(/color/)
    expect(colorId).toHaveLength(2);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", async () => {

    const { rerender } = render(<ColorList colors={randomColorList} editing={false} />)

    const hideEditForm = screen.queryByTestId(/edit_menu/)
    expect(hideEditForm).toBeNull()


    rerender(<ColorList colors={randomColorList} editing={true} />)

    const showEditForm = screen.queryByTestId(/edit_menu/)
    expect(showEditForm).toBeInTheDocument();
});
