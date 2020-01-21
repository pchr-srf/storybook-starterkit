import React, { PureComponent } from 'react';

class Button extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 1
    };
  }
  
  render() {
    return (
      <button>{this.state.counter}</button>
    );
  }
}

export default Button;
