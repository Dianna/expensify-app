import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenses }) => {
  const multipleExpenses = expenses.length > 1;
  const total = selectExpensesTotal(expenses);
  const formattedTotal = numeral(total / 100).format("$0,0.00");
  const expenseWord = multipleExpenses ? "expenses" : "expense";
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenses.length}</span> {expenseWord} totalling{" "}
          <span>{formattedTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link to="/create" className="button">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenses: visibleExpenses
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
