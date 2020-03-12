import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";


test("form renders correctly", () => {
    render(<ContactForm />);
});

test("are inputs registering properly", () => {
    const { getByLabelText, getByTestId } = render(<ContactForm />);
    
    const firstNameInput = getByLabelText(/first name*/i);
    const lastNameInput = getByLabelText(/last name*/i);
    const emailInput = getByLabelText(/email*/i);
    const messageInput = getByLabelText(/message/i);

    // fireEvent function from RTL to fill in the inputs
    fireEvent.change(firstNameInput, { target: { name: 'firstName', value: "test firstname" } });
    fireEvent.change(lastNameInput, { target: { name: 'lastName', value: "test lastname" } });
    fireEvent.change(emailInput, { target: { name: 'email', value: "test email" } });
    fireEvent.change(messageInput, { target: { name: 'message', value: "test message" } });
    
    
    // assertions 
    expect(firstNameInput.value).toBe("test firstname");
    expect(lastNameInput.value).toBe("test lastname");
    expect(emailInput.value).toBe("test email");
    expect(messageInput.value).toBe("test message");

    fireEvent.click(getByTestId("submit"));
    
})

test("if blank spaces are allowed in", () => {
    const { getByLabelText } = render(<ContactForm />);
    const firstNameInput = getByLabelText(/first Name*/i);
    const lastNameInput = getByLabelText(/last name*/i);
    const emailInput = getByLabelText(/email*/i);
    const messageInput = getByLabelText(/message/i);

    fireEvent.change(firstNameInput, { target: { value: " " } });
    fireEvent.change(lastNameInput, { target: { value: " " } });
    fireEvent.change(emailInput, { target: { value: " " } });
    fireEvent.change(messageInput, { target: { value: " " } });

    expect(firstNameInput.value).toBe(" ");
    expect(lastNameInput.value).toBe(" ");
    expect(emailInput.value).toBe(" ");
    expect(messageInput.value).toBe(" ");
});