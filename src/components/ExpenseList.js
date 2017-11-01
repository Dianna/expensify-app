import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import SelectExpenses from "../selectors/expenses";

export const ExpenseList = props => (
  <div>
    {props.expenses.length === 0 ? (
      <p>No Expenses</p>
    ) : (
      props.expenses.map((expense, i) => (
        <ExpenseListItem {...expense} key={i} />
      ))
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: SelectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
