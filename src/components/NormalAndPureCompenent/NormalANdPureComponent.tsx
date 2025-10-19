import React, { Component, PureComponent } from 'react';

// Props type definition
interface UserProps {
  name: string;
  age: number;
}

// Normal Component - Her zaman yeniden render olur
class NormalComponent extends Component<UserProps> {
  render() {
    console.log('Normal Component rendered');
    return <div>{this.props.name}</div>;
  }
}

// Pure Component - Props değişmediyse render olmaz
class PureComponentExample extends PureComponent<UserProps> {
  render() {
    console.log('Pure Component rendered');
    return <div>{this.props.name}</div>;
  }
}

// Parent Component
interface AppState {
  name: string;
  count: number;
}

class App extends Component<{}, AppState> {
  state: AppState = { name: 'John', count: 0 };
  
  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return (
      <div>
        <button onClick={this.increment}>Count: {this.state.count}</button>
        <NormalComponent name={this.state.name} age={25} />
        <PureComponentExample name={this.state.name} age={25} />
      </div>
    );
  }
}