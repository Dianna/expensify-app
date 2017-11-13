import React from "react";
import { connect } from "react-redux";
import ExpensesSummary from "./ExpensesSummary";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";

export const ExpenseDashboardPage = props => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

const mapStateToProps = state => ({
  expenses: state.expenses
});

export default connect(mapStateToProps)(ExpenseDashboardPage);
