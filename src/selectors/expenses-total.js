export default expenses => {
  return expenses.reduce((sum, expense) => {
    return expense.amount + sum;
  }, 0);
};
