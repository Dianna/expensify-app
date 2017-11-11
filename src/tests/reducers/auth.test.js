import authReducer from "../../reducers/auth";

test("should set default state", () => {
  const action = { type: "FAKE_ACTION" };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});

test("should add uid on login to state", () => {
  const uid = "123abc";
  const action = { type: "LOGIN", uid };
  const state = authReducer(undefined, action);
  expect(state).toEqual({ uid });
});

test("should remove uid on logout from state", () => {
  const startState = { uid: "123abc" };
  const action = { type: "LOGOUT" };
  const state = authReducer(startState, action);
  expect(state).toEqual({});
});
