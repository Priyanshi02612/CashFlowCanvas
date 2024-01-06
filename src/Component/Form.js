import React, { useState } from "react";
import moment from "moment";

const Form = ({ onFormSubmit, selectedDate }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const Validation = (formData) => {
    if (formData.name.length == 0) {
      alert("Please enter expense name!");
      return 0;
    }
    if (formData.amount.length == 0) {
      alert("Please enter expense amount!");
      return 0;
    }
    if (formData.type.length == 0) {
      alert("Pleale enter type of expense!");
      return 0;
    }
    return 1;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validation(formData) === 1) {
      setErrors(Validation(formData));
      onFormSubmit(formData);
      setFormData({
        name: "",
        amount: "",
        type: "",
      });
    }
  };

  return (
    <div className="form1">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Expense Name"
          onChange={handleChange}
          value={formData.name}
          
          name="name"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Expense Amount"
          onChange={handleChange}
          value={formData.amount}
          name="amount"
        />
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          onChange={handleChange} 
          value={formData.type}
          name="type"
        >
          <option value="" align="center">
            ---- Select type ----
          </option>
          <option value="Get">Get</option>
          <option value="Spend">Spend</option>
        </select>
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" value={moment(selectedDate).format("DD-MM-YYYY")} readOnly />
      </div>

      <div className="d-grid">
        <input
          type="submit"
          onClick={handleSubmit}
          className="btn2"
        />
      </div>
    </div>
  );
};

export default Form;
