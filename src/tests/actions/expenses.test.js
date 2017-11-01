import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should set up removeExpense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should set up editExpense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { note: "New note value" }
  });
});

test("should set up addExpense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    note: "This was last month's rent",
    amount: 100000,
    createdAt: 1234567890
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: { ...expenseData, id: expect.any(String) }
  });
});

test("should set up addExpense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0
    }
  });
});
