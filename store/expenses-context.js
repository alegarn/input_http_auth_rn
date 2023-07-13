import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e2',
    title: 'New TV',
    amount: 799.49,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e5',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e6',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e7',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date("2020-07-14"),
  },
  {
    id: 'e8',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date("2020-07-14"),
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({title, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {title, amount, date}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      const id = new Date().toString + Math.random().toString();
      return [{...action.payload, id: id}, ...state ];

    case "UPDATE_EXPENSE":
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE_EXPENSE":
      return (state.filter((expense) => expense.id !== action.payload));

    default:
      return state;
  };
};

function ExpensesContextProvider({ children }) {

  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseData
    })
  };

  function updateExpense(id, expenseData) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: { id: id, data: expenseData }
    })
  };

  function deleteExpense(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id
    })
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
export default ExpensesContextProvider;
