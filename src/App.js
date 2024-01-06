import React, { useState } from "react";
import "./App.css";
import CalendarComp from "./Component/Calendar";
import Form from "./Component/Form";
import Table from "./Component/Table";
import Amount from "./Component/Amount";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formDataList, setFormDataList] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (formData) => {
    const newData = {
      date: selectedDate,
      ...formData,
    };
    setFormDataList([...formDataList, newData]);
    setSelectedDate(null);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logoimage">
          <img src="logo3.png" className="logo" />
          <h4 className="logotext">CashFlowCanvas</h4>
        </div>
        <div className="amount">
          <Amount amountData={formDataList} />
        </div>
      </div>

      <div className="Container1">
        <div className="container">
          <div className="calendar">
            <CalendarComp onDateSelect={handleDateSelect} />
          </div>
          <div className="form">
            {selectedDate && (
              <Form
                selectedDate={selectedDate}
                onFormSubmit={handleFormSubmit}
              />
            )}
          </div>
        </div>
        <div className="table">
          <Table tableData={formDataList} setTableData={setFormDataList} />
        </div>
      </div>
    </div>
  );
};

export default App;
