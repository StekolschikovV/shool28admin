import React, { Component } from 'react';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }

    render() {
        return (
            <div className={'login'}>
                <form className={'login_container'} onSubmit={this.formHandler.bind(this)}>
                    <h1 className={'login_container_title'}>Login</h1>
                    <h5 className={'login_container_error'}>{this.state.error}</h5>
                    <input className={'login_container_login'} type='text' placeholder='Login' ref={(input) => { this.login = input }} />
                    <input className={'login_container_password'} type='text' placeholder='Password' ref={(input) => { this.password = input }} />
                    <input className={'login_container_enter'} type='submit' value='Enter' />
                </form>
            </div>
        )
    }

    formHandler(e) {
        e.preventDefault()
        if (this.login.value && this.password.value) {
            console.log(this.login.value, this.password.value)
            fetch(`https://shool28.000webhostapp.com/login.php?login=${this.login.value}&password=${this.password.value}`)
                .then((response) => response.json())
                .then(res => {
                    this.processing(res)
                });
        } 
        else {
            this.processing([])
        }
    }

    processing(res) {
        if (res[1] && res[1] !== '') {
            this.props.setKey(res[1])
        } else {
            this.setState({
                error: 'Check your login and password!'
            })
        }
        console.log(res[1])
    }

}


export default Login