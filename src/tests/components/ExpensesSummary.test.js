import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should correct amount and total for a single expense", () => {
  const wrapper = shallow(<ExpensesSummary expenses={[expenses[1]]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should correct amount and total for multiple expenses", () => {
  const array = [expenses[1], expenses[2]];
  const wrapper = shallow(<ExpensesSummary expenses={array} />);
  expect(wrapper).toMatchSnapshot();
});
