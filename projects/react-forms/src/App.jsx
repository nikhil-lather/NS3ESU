import { useState } from "react";
import "./App.css";

function App() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    terms: false,
  });

  // Message after submission
  const [message, setMessage] = useState("");

  // Handles input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted:", formData);

    setMessage(`Welcome, ${formData.name}!`);

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      country: "",
      terms: false,
    });
  };

  // Normal button click
  const handleClick = () => {
    alert("You clicked the button!");
  };

  return (
    <div className="container">
      <h1>React Registration Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>Name</label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        {/* Email */}
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {/* Password */}
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {/* Gender */}
        <label>Gender</label>

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Country */}
        <label>Country</label>

        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>

        {/* Terms */}
        <div className="checkbox">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />

          <span>I agree to the terms</span>
        </div>

        {/* Submit */}
        <button type="submit">Register</button>
      </form>

      {/* Separate click event */}
      <button onClick={handleClick}>Test onClick</button>

      {message && <h3>{message}</h3>}
    </div>
  );
}

export default App;
