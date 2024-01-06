import React, { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import SearchBar from "./SearchBar";
import { useReactToPrint } from "react-to-print";

const Table = ({ tableData, setTableData }) => {
  // for pdf generation
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "AccountDetails",
  });

  // for searching data
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  
  const filteredData = tableData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.date
        .toDateString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      data.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // for csv generation
  const headers = [
    { label: "Name", key: "name" },
    { label: "Amount", key: "amount" },
    { label: "Type", key: "type" },
    { label: "Date", key: "date" },
  ];

  // for data sorting
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortByDate = () => {
    const sortedData =
      sortOrder === "asc"
        ? [...tableData].sort((a, b) => a.date - b.date)
        : [...tableData].sort((a, b) => b.date - a.date);

    setTableData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // for download format
  const [downloadFormat, setdownloadFormat] = useState("");

  const handleDownloadFormat = (e) => {
    setdownloadFormat(e.target.value);
  };

  // for data editing
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    type: "",
    amount: "",
    date: "",
  });

  const handleEditClick = (index) => {
    setEditingRowIndex(index);
    setNewData({ ...tableData[index] });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedData = tableData.map((row, index) =>
      index === editingRowIndex ? { ...newData } : row
    );
    setTableData(updatedData);
    setEditingRowIndex(null);
    setNewData({ name: "", type: "", amount: "", date: "" });
  };

  // for delete all data
  const [selectedRows, setSelectedRows] = useState([]);

  const handleClearAllData = (event) => {
    if (event.target.checked) {
      setSelectedRows(tableData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDeleteSelected = () => {
    const newData = tableData.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setTableData(newData);
    setSelectedRows([]);
  };

  return (
    <div className="table1">
      <SearchBar className="searchBar" onSearch={handleSearch} />

      {/* <button id="button1" className="btn1" onClick={handleClearAllData}>Clear all data</button> */}

      <div ref={componentPDF}>
        <table className="table2 table-striped table-bordered">
          <thead
            style={{
              "background-color": "#a4aca9",
              border: "1px solid black",
              color: "black",
            }}
          >
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === tableData.length}
                  onChange={handleClearAllData}
                />
              </th>
              <th>S.N</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Type of expense</th>
              <th className="date" onClick={handleSortByDate}>
                Date
              </th>
              <th><span className="bi bi-trash pointer1" onClick={handleDeleteSelected}/> Action</th>
            </tr>
          </thead>
          <tbody
            style={{
              border: "1px solid black",
            }}
          >
            {filteredData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    {editingRowIndex === index ? (
                      <input
                        name="name"
                        value={newData.name}
                        onChange={handleFormChange}
                      />
                    ) : (
                      data.name
                    )}
                  </td>
                  <td
                    style={{ color: data.type == "Get" ? "darkgreen" : "red" }}
                  >
                    {editingRowIndex === index ? (
                      <input
                        name="amount"
                        value={newData.amount}
                        onChange={handleFormChange}
                      />
                    ) : (
                      data.amount
                    )}
                  </td>
                  <td>
                    {editingRowIndex === index ? (
                      <select
                        value={newData.type}
                        name="type"
                        onChange={handleFormChange}
                      >
                        <option value="GET">GET</option>
                        <option value="SPEND">SPEND</option>
                      </select>
                    ) : (
                      data.type
                    )}
                  </td>
                  <td>{moment(data.date).format("DD-MM-YYYY")}</td>
                  <td>
                    {editingRowIndex === index ? (
                      <button
                        className="btn btn-link pointer1"
                        onClick={handleFormSubmit}
                      >
                        <span class="bi bi-check2-square "></span> Save
                      </button>
                    ) : ( 
                      <button
                        className="btn btn-link pointer1"
                        onClick={() => handleEditClick(index)}
                      >
                        <span class="bi bi-pencil-fill "></span> Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <select
        className="form-select format"
        value={downloadFormat}
        onChange={handleDownloadFormat}
      >
        <option value="">--Download data as--</option>
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
      </select>
      {downloadFormat == "pdf" && (
        <button id="button1" onClick={generatePDF}>
          Download
        </button>
      )}
      {downloadFormat == "csv" && (
        <CSVLink
          data={tableData}
          headers={headers}
          filename={"Account_Details.csv"}
        >
          <button id="button1"> Download </button>
        </CSVLink>
      )}
    </div>
  );
};

export default Table;
