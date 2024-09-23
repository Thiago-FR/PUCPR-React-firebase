import React, { Component } from 'react';
import Firebase from '../../db/firebase';
import Spinner from '../../assets/spinner.gif'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: "",
            loading: false
        }

    }

    handleChange = ({ name, value }) => {
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    onSave = async (db, data) => {
        this.handleChange({ name: "loading", value: true })
        const { name, lastName, birthDate, email, password } = data
        await Firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await Firebase
                    .firestore()
                    .collection(db)
                    .doc(user.uid)
                    .set({
                        name,
                        lastName,
                        birthDate
                    })

                this.handleChange({ name: "loading", value: false })
                window.location.href = "./"
            })
            .catch(({ code }) => {
                if (code === "auth/email-already-in-use") {
                    alert("Usuário já cadastrado")
                    window.location.href = "./"
                }
            })
    }

    goBack = () => window.location.href = "./"

    render() {
        const { loading } = this.state
        return (
            <div className='container'>
                <header className="header">
                    CADASTRO
                </header>
                <main className='body'>
                    <input
                        name="name"
                        type="text"
                        placeholder='Nome'
                        onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder='Sobre Nome'
                        onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                    />
                    <input
                        name="birthDate"
                        type="date"
                        placeholder='Data Nascimento'
                        onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                    />
                    <input
                        name="email"
                        type="text"
                        placeholder='E-mail'
                        onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder='Senha'
                        onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                    />
                    <div className='btn'>
                        {!loading ? (
                            <>
                                <input
                                    type='button'
                                    value='Voltar'
                                    onClick={this.goBack}
                                />
                                <input
                                    type='button'
                                    value='Salvar'
                                    onClick={() => this.onSave("user", this.state)}
                                />
                            </>
                        ) : (
                            <div className='loading'>
                                <img src={Spinner} width={50} height={50} />
                            </div>
                        )}

                    </div>
                </main>
            </div>
        );
    }
}

export default Register;
