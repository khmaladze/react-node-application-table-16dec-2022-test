import React, { useEffect, useState } from "react";
import { IUser, useTableStore } from "./store/tableStore";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Space } from "antd";
import ModalComponent from "./components/modal/ModalComponent";
import AddButton from "./components/button/AddButton";
import Chart from "./components/chart/Chart";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tableRowData, setTableRowData] = useState("");
  const loadTable = useTableStore((state) => state.loadTable);
  const removeTableRow = useTableStore((state) => state.removeTableRow);
  const addTableRow = useTableStore((state) => state.addTableRow);
  const updateTableRow = useTableStore((state) => state.updateTableRow);
  const table = useTableStore((state) => state.table);

  const columns = [
    { name: "id", selector: (row: IUser) => row.id },
    {
      name: "name",
      selector: (row: IUser) => row.name,
    },
    {
      name: "email",
      selector: (row: IUser) => row.email,
    },
    { name: "gender", selector: (row: IUser) => row.gender },
    {
      name: "address",
      selector: (row: any) => row.address.street + " " + row.address.city,
    },
    { name: "phone", selector: (row: any) => row.phone },
    {
      name: "remove button",
      selector: (row: any) => (
        <Space wrap>
          <Button danger onClick={() => removeTableRow(table, row.id)}>
            remove row
          </Button>
        </Space>
      ),
    },
  ];

  const getData = async () => {
    const response = await fetch("/events_list");
    const responseData = await response.json();
    loadTable(responseData);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateTableRowDoubleClick = (tableRowData: any) => {
    setTableRowData(tableRowData);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <AddButton onAdd={(value: any) => setOpen(value)} />
      {table ? (
        <DataTable
          title={"table data"}
          columns={columns}
          data={table}
          pagination
          onRowDoubleClicked={(row, event) => {
            updateTableRowDoubleClick(row);
          }}
        />
      ) : (
        "loading"
      )}
      {open && (
        <ModalComponent
          open={open}
          onAdd={(value: any) => addTableRow(table, value)}
          onUpdate={(value: any) => updateTableRow(table, value)}
          onToogle={(value: any) => setOpen(value)}
          clearTable={(value: any) => setTableRowData(value)}
          data={tableRowData}
        />
      )}
      {table ? <Chart /> : "loading"}
    </React.Fragment>
  );
};

export default App;
