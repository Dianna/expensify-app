import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import { EditExpensePage } from "../../components/EditExpensePage";

let startEditExpense, startRemoveExpense, wrapper, expense, history;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  expense = expenses[0];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle startEditExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test("should handle startRemoveExpense", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});
