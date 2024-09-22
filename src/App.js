import './App.css';
import { Component } from 'react';
import Rotas from './pages/routes/routes';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Rotas />
      </>
    );
  }
}

export default App;
