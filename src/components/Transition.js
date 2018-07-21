import React from "react";
import { Transition as ReactTransition } from "react-transition-group";
import getTransitionStyle from "../data/getTransitionStyle.js";
import { historyExitingEventType, timeout } from "../../gatsby-browser.js";

class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      exiting: false 
    };
    this.listenerHandler = this.listenerHandler.bind(this);
  }

  listenerHandler(event) {
    this.setState({ exiting: true });
  }

  componentDidMount() {
    typeof window !== "undefined" && window.addEventListener(historyExitingEventType, this.listenerHandler);
  }

  componentWillUnmount() {
    typeof window !== "undefined" && window.removeEventListener(historyExitingEventType, this.listenerHandler);
  }

  static getDerivedStateFromProps({ exiting }) {
    if (exiting) {
      return { exiting: false };
    }
    return null;
  }

  render() {
    const transitionProps = {
      timeout: {
        enter: 0,
        exit: timeout,
      },
      appear: true,
      in: !this.state.exiting,
    };

    return (
      <ReactTransition {...transitionProps}>
        {(status) => (
          <div
            style={{
              ...getTransitionStyle({ status, timeout }),
            }}
          >
            {this.props.children}
          </div>
        )}
      </ReactTransition>
    )
  }
}

export default Transition;
