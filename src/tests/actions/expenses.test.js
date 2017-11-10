import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref("expenses")
    .set(expensesData)
    .then(done);
});

test("should set up removeExpense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove an expense from firebase", done => {
  const store = createMockStore({ expenses });
  const id = expenses[0].id;

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return database.ref(`expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBe(null);
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
});

test("should set up editExpense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { note: "New note value" }
  });
});

test("should edit expenses from firebase", done => {
  const store = createMockStore({ expenses: [expenses[2]] });
  const id = expenses[2].id;
  const updates = { amount: 5000, note: "2 weeks of purchases" };

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect({ ...snapshot.val(), id: snapshot.key }).toEqual({
        ...expenses[2],
        ...updates
      });
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
});

test("should set up addExpense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "mouse",
    amount: 3000,
    createdAt: 1000,
    note: "new"
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      const val = snapshot.val();
      expect(val).toEqual(expenseData);
      done();
    })
    .catch(err => {
      console.log("err:", err);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore({});
  const defaultExpenseData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      const val = snapshot.val();
      expect(val).toEqual(defaultExpenseData);
      done();
    })
    .catch(err => {
      console.log("err:", err);
      done();
    });
});

test("should setup set expenses data action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({ type: "SET_EXPENSES", expenses });
});

test("should fetch the expenses from firebase", done => {
  const store = createMockStore({});

  store
    .dispatch(startSetExpenses())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "SET_EXPENSES",
        expenses
      });
      done();
    })
    .catch(() => {
      console.log("err:", err);
      done();
    });
});
