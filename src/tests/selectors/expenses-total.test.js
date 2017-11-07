import expenses from "../fixtures/expenses";
import selectExpensesTotal from "../../selectors/expenses-total";

test("should return 0 if there are no expenses", () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test("should correctly add up a single expense", () => {
  const result = selectExpensesTotal([expenses[1]]);
  expect(result).toBe(expenses[1].amount);
});

test("should correctly add up  multiple expenses", () => {
  const array = [expenses[1], expenses[2]];
  const expectedResult = expenses[1].amount + expenses[2].amount;
  const result = selectExpensesTotal(array);
  expect(result).toBe(expectedResult);
});
