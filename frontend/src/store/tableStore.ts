import create from "zustand";

interface ITable {
  table: IUser[];
  loadTable: (tableData: IUser[]) => void;
  removeTableRow: (state: IUser[], rowId: number) => void;
  addTableRow: (tableData: IUser[], value: IUser) => void;
  updateTableRow: (state: IUser[], value: IUser) => void;
}

export type IUser = {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  street?: string;
  city?: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
  };
};

export const useTableStore = create<ITable>((set) => ({
  table: [],

  loadTable: (tableData: any) => set({ table: tableData }),

  removeTableRow: (state: IUser[], rowId: number) =>
    set({ table: state.filter((row: any) => row.id !== rowId) }),

  addTableRow: (tableData: IUser[], value: IUser) => {
    const newData = [
      ...tableData,
      {
        id: tableData[tableData.length - 1].id + 1,
        name: value.name,
        email: value.email,
        gender: value.gender,
        address: {
          city: value.city,
          street: value.street,
        },
        phone: value.phone,
      },
    ];
    set({ table: newData });
  },

  updateTableRow: (state: IUser[], value: IUser) => {
    const newData = state.filter((item: IUser) => item.id !== value.id);
    const addData = [
      ...newData,
      {
        id: value.id,
        name: value.name,
        email: value.email,
        gender: value.gender,
        address: {
          city: value.city,
          street: value.street,
        },
        phone: value.phone,
      },
    ];
    const sortData = addData.sort((a, b) => a.id - b.id);
    set({ table: sortData });
  },
}));
