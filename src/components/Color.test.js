import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const randomColor = {
    id: 0,
    color: "aliceblue",
    code: {
        hex: "#f0f8ff" 
    }        
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{color: "", code: {hex: ""}}}/>)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={randomColor}/>)
    const findColor = screen.getByTestId(/color/)
    expect(findColor).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", async () => {
    
    const fakeHandleDelete = jest.fn(() => {
        return "clicked delete x button"
    })

    const fakeToggleEdit = jest.fn(() => {
        return "clicked color name"
    })
    
    render(<Color color={randomColor} deleteColor={() => fakeHandleDelete()} toggleEdit={() => {fakeToggleEdit()}}/>)

    const deleteButton = screen.getByTestId("delete")
    fireEvent.click(deleteButton)

    await waitFor(() => {
        expect(fakeHandleDelete).toHaveBeenCalled();
        expect(fakeToggleEdit).toHaveBeenCalled();
    })
    
});

test("Executes setEditColor and toggleEdit property when color div is clicked", async () => {
    
    const fakeSetEditColor = jest.fn(() => {
        return "clicked on color"
    })

    const fakeToggleEdit = jest.fn(() => {
        return "clicked color name"
    })

    render(<Color color={randomColor} setEditColor={() => fakeSetEditColor()} toggleEdit={() => {fakeToggleEdit()}}/>)

    const colorButton = screen.getByTestId(/color/)
    fireEvent.click(colorButton);

    await waitFor(() => {
        expect(fakeSetEditColor).toHaveBeenCalled();
        expect(fakeToggleEdit).toHaveBeenCalled();
    })

});