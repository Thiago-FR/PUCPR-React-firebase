import '../../App.css'
import { Component } from 'react';
import Firebase from '../../db/firebase';
import Spinner from '../../assets/spinner.gif'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      name: '',
      lastName: '',
      birthDate: '',
      loading: true
    }
  }

  async componentDidMount() {
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user
        await Firebase
          .firestore()
          .collection("user")
          .doc(uid)
          .get()
          .then((response) => {
            const { name, lastName, birthDate } = response.data()
            this.setState({
              userId: uid,
              name,
              lastName,
              birthDate,
              loading: false
            })
          })
        return
      }

      window.location.href = "./login"
    })
  }

  handleChange = ({ name, value }) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  onEdit = async (db, data) => {
    this.handleChange({ name: "loading", value: true });
    const { userId, name, lastName, birthDate } = data;

    await Firebase
      .firestore()
      .collection(db)
      .doc(userId)
      .update({
        name,
        lastName,
        birthDate
      })
      .then(() => {
        this.handleChange({ name: "loading", value: false });
      });
  }

  logout = async () => {
    await Firebase.auth().signOut()
      .then(() => {
        window.location.href = "./";
      });
  }

  render() {
    const { name, lastName, birthDate, loading } = this.state

    return (
      <div className="container">
        {!loading ? (
          <>
            <header className="header">
              Bem-Vindo ao vale 10
            </header>

            <main className='body'>
              <>
                <input
                  name="name"
                  type='text'
                  defaultValue={name}
                  onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <input
                  name="lastName"
                  type='text'
                  defaultValue={lastName}
                  onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <input
                  name="birthDate"
                  type='date'
                  defaultValue={birthDate}
                  onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <div className='btn'>
                  <input
                    type='button'
                    value='Editar'
                    onClick={() => this.onEdit("user", this.state)}
                  />
                  <input
                    type='button'
                    value='Logout'
                    onClick={this.logout}
                  />
                </div>
              </>
            </main>
          </>
        ) : (
          <div className='loading'>
            <img src={Spinner} width={50} height={50} />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
