import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenses }) => {
  const multipleExpenses = expenses.length > 1;
  const total = selectExpensesTotal(expenses);
  const formattedTotal = numeral(total / 100).format("$0,0.00");
  const expenseWord = multipleExpenses ? "expenses" : "expense";
  return (
    <div>
      <p>
        Viewing {expenses.length} {expenseWord} totalling {formattedTotal}
      </p>
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
