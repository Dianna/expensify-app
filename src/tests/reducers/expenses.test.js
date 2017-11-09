import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id isn't found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "4",
      description: "new test expense",
      note: "",
      amount: 100,
      createdAt: 1234
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state.indexOf(action.expense)).toBeGreaterThan(-1);
});

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      note: "I couldn't resist..."
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].note).toBe(action.updates.note);
});

test("should not edit expense if not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "non-existent",
    updates: {
      note: "I couldn't resist..."
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [
      {
        id: "4",
        description: "Cat food",
        note: "",
        amount: 2000,
        createdAt: 1234
      },
      {
        id: "5",
        description: "Projector",
        note: "",
        amount: 30000,
        createdAt: 123456
      }
    ]
  };
  const startState = expensesReducer(expenses, {});
  const endState = expensesReducer(startState, action);
  expect(endState).toEqual(action.expenses);
});
