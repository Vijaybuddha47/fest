import React from 'react'

const status: { name: string, email: string, year: number } = {
    name: "Toyota",
    email: "Corolla",
    year: 2009
};
const Validate = (formData: any) => {
    // Regular expression to check if the email is in the correct format
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Get the values
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const confirm_password = formData.confirm_password;

    if (password !== confirm_password) {
        alert("Passwords do not match");
        return false;
    }

    if (name == "") {
        alert("Name field must be filled out");
        return false;
    }
    if (email == "") {
        alert("Email field must be filled out");
        return false;
    }
    if (!email.match(emailRegex)) {
        alert("Please enter a valid email address");
        return false;
    }
    if (password == "") {
        alert("Password field must be filled out");
        return false;
    }
    // Send a request to the server to check the user's credentials
    // If the credentials are correct, return true to submit the form
    // If the credentials are incorrect, display an error message and return false to prevent the form from being submitted
    return true;
}

export default Validate