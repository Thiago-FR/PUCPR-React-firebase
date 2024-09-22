import '../../App.css'
import { Component } from 'react';
import Firebase from '../../db/firebase';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: -1,
      data: {
        email: '',
        password: ''
      }
    }

  }

  handleChange = ({ name, value }) => {
    this.setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value
      }
    }))
  }

  onClick = async ({ email, password }) => {
    await Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "./"
      })
      .catch(() => {
        this.setState((prevState) => ({
          ...prevState,
          error: 0
        }))
      })
  }

  render() {
    const { error, data } = this.state

    return (
      <div className="container">
        <header className="header">
          Login
        </header>

        <main className='body'>
          <input
            name='email'
            type='text'
            placeholder='Insira seu e-mail'
            onChange={({ target }) => this.handleChange(target)}
            value={data.email}
          />
          <input
            name='password'
            type='password'
            placeholder='insira sua senha'
            onChange={({ target }) => this.handleChange(target)}
            value={data.password}
          />
          <input
            type='button'
            value='Acessar'
            onClick={() => this.onClick(data)}
          />
        </main>

        <footer>
          {error === 0 && <span>Usuário ou senha incorretos!</span>}
          {error === 1 && <span>Acessado com sucesso!</span>}
        </footer>
      </div>
    );
  }
}

export default Login;
