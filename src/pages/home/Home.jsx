import '../../App.css'
import { Component } from 'react';
import Firebase from '../../db/firebase';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      lastname: ''
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
            const { name, lastName } = response.data()
            this.setState({
              name,
              lastName
            })
          })
        return
      }

      window.location.href = "./login"
    })
  }

  render() {
    const { name, lastName } = this.state

    return (
      <div className="container">
        <header className="header">
          Home
        </header>

        <main className='body'>
          <input
            type='text'
            value={name}
          />
          <input
            type='text'
            value={lastName}
          />
        </main>
      </div>
    );
  }
}

export default Home;
