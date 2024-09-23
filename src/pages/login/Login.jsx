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

  onRegister = async () => {
    window.location.href = "./register"
  }

  render() {
    const { error, data } = this.state

    return (
      <div className="container">
        <header className="header">
          LOGIN
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
          {error === 0 && <span className='error'>Usuário ou senha incorretos!</span>}
          <div className='btn'>
            <input
              type='button'
              value='Cadastrar'
              onClick={this.onRegister}
            />
            <input
              type='button'
              value='Acessar'
              onClick={() => this.onClick(data)}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
