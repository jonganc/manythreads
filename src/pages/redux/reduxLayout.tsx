import { Link } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';

/* for ease, we use any to deal with typing issues at the moment */
const Counter = ({ count, increment }: any) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
);

const mapStateToProps = ({ count }: any) => {
  return { count };
};

const mapDispatchToProps = (dispatch: any) => {
  return { increment: () => dispatch({ type: `INCREMENT` }) };
};

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <h3>Redux example</h3>
        </Link>
        <ConnectedCounter />
        <ul>
          <li>
            <Link to="/redux/a/">a</Link>
          </li>
          <li>
            <Link to="/redux/b/">b</Link>
          </li>
          <li>
            <Link to="/redux/c/">c</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default DefaultLayout;
