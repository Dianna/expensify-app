import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import { EditExpensePage } from "../../components/EditExpensePage";

let editExpense, removeExpense, wrapper, expense, history;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  expense = expenses[0];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test("should handle removeExpense", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(removeExpense).toHaveBeenLastCalledWith(expense.id);
});
