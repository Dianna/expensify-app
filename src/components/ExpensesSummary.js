import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = props => {
  const { expenses } = props;
  const multipleExpenses = expenses.length > 1;
  const total = selectExpensesTotal(expenses);
  const formattedTotal = numeral(total / 100).format("$0,0.00");
  return (
    <div>
      <p>
        Viewing {expenses.length} {multipleExpenses
          ? "expenses"
          : "expense"}{" "}
        totalling {formattedTotal}
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  expenses: state.expenses
});

export default connect(mapStateToProps)(ExpensesSummary);
