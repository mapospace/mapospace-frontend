export const validateForm = (fname, lname, email, password, passwordAgain) => {
    const errors = {};
  
    if (!fname) errors.fname = "First name is required";
    if (!lname) errors.lname = "Last name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    else if (!/[A-Z]/.test(password))
      errors.password = "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(password))
      errors.password = "Password must contain at least one lowercase letter";
    else if (!/[0-9]/.test(password))
      errors.password = "Password must contain at least one number";
    else if (!/[!@#$%^&*]/.test(password))
      errors.password = "Password must contain at least one special character";
    if (!passwordAgain)
      errors.passwordAgain = "Confirm password is required";
    else if (password !== passwordAgain)
      errors.passwordAgain = "Passwords do not match";
  
    return errors;
  };
  