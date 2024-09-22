import React, { Component } from 'react';
import Firebase from '../../db/firebase';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lastName: "",
            email: "",
            password: ""
        }

    }

    handleChange = ({ name, value }) => {
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    onSave = async (db, data) => {
        const { name, lastName, email, password } = data
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
                        lastName
                    })
            })
    }

    render() {
        return (
            <div>
                <h1>Cadastro</h1>
                <input
                    name="email"
                    type="text"
                    placeholder='E-mail'
                    onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <br />
                <input
                    name="password"
                    type="password"
                    placeholder='Senha'
                    onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <br />
                <input
                    name="name"
                    type="text"
                    placeholder='Nome'
                    onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <br />
                <input
                    name="lastName"
                    type="text"
                    placeholder='Sobre Nome'
                    onChange={({ target: { name, value } }) => this.handleChange({ name, value })}
                />
                <br />
                <button
                    onClick={() => this.onSave("user", this.state)}
                >
                    Salvar
                </button>
            </div>
        );
    }
}

export default Register;
