import React from "react";
import './TableComponent.css';

function TableComponent({ data }) {
    console.log(data)
    const headers = data && data.length > 0 ? Object.keys(data[0]) : [];
    return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex } className={(rowIndex % 2 === 0) ? "even-row" : "odd-row"}>
              {Object.values(item).map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }

export default TableComponent;