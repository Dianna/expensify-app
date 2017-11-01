// Higher Order Component (HOC)
// Component that renders another component
// Reuse code, render hijacking, prop manipulation, abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info, please don't share.</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>You must be authenticated</p>
      )}
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="details on shtuff" />,
//   document.getElementById("app")
// );

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="details on shtuff" />,
  document.getElementById("app")
);
