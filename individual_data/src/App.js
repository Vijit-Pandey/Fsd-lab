import React, { useState } from 'react';
import './App.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(mobile));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      formErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.mobile) {
      formErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!validateMobile(formData.mobile)) {
      formErrors.mobile = 'Invalid mobile number format';
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      setSuccessMessage('Form submitted successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
      });
    } else {
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={errors.mobile ? 'error' : ''}
          />
          {errors.mobile && <span>{errors.mobile}</span>}
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default UserForm;