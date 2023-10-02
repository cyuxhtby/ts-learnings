class Component {

  // The type is an object that maps strings to any type
  private state: { [key: string]: any };
  
  constructor(initialState: { [key: string]: any }) {
    this.state = initialState;
  }

  // newState is merged with the existing state.
  setState(newState: { [key: string]: any }) {
    // ...this.state is used to spread the properties of the current state object,
    // and ...newState is used to spread the properties of the newState object.
    // If any properties have the same name, the value from newState will overwrite
    // the value from the current state.
    this.state = { ...this.state, ...newState };
    
    // Render after updating state
    this.render();
  }

  // A render is just a log
  render() {
    console.log('Rendering with state:', this.state);
  }
}

const myComponent = new Component({ name: 'Alice', age: 25 });

// Rendering the component with the initialState
myComponent.render(); // { name: 'Alice', age: 25 }

// Updating the age property and re-rendering
myComponent.setState({ age: 26 }); // { name: 'Alice', age: 26 }
