import React, { Component } from 'react'
import './Schoolchildren.css'

class Schoolchildren extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            birthday: '',
            phone: '',
            email: '',
            address: '',
            class: '',
            classes: [],
            loginKey: '',
            selectClass: '',
            schoolchildrens: [],
            searchText: '',
            selectedSchoolchildrensId: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerForm = this.handlerForm.bind(this);
        this.selectSchoolchildren = this.selectSchoolchildren.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.removeSchoolchildren = this.removeSchoolchildren.bind(this);
        this.new = this.new.bind(this);
        this.upgradeSchoolchildrenEl = this.upgradeSchoolchildrenEl.bind(this);
        this.addSchoolchildren = this.addSchoolchildren.bind(this);
        this.addSchoolchildrenEl = this.addSchoolchildrenEl.bind(this);
        this.getAllClasses = this.getAllClasses.bind(this);
        this.getAllClasses()
        this.getAllSchoolchildren()
    }

    render() {

        let schoolchildrens = this.state.schoolchildrens.filter((e, i) => {
            if (
                this.state.searchText === '' || e.firstName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                || e.lastName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || e.birthday.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                || e.phone.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || e.email.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                || e.address.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1 || e.class.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
                || e.loginKey.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
            ) {
                return true
            }
        })
        schoolchildrens = schoolchildrens.map((e, i) => {
            return (
                <div className={'schoolchildren_left_el'} key={i} data-id={e.id} onClick={this.selectSchoolchildren}>
                    {e.firstName} {e.lastName}
                </div>
            )
        })

        return (
            <div className={'schoolchildren'}>
                <div className={'schoolchildren_left'}>
                    <input className={'schoolchildren_left_el'} placeholder={'Search here'} value={this.state.searchText} onChange={(e) => { this.setState({ searchText: e.target.value }) }} />
                    <div className={'schoolchildren_left_el'} onClick={this.new}>
                        Add new
                    </div>
                    {schoolchildrens}
                </div>
                <div className={'schoolchildren_right'}>
                    <form onSubmit={this.handlerForm}>
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'First name'} value={this.state.firstName} name="firstName" onChange={this.handleInputChange} />
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'Last name'} value={this.state.lastName} name="lastName" onChange={this.handleInputChange} />
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'Birthday'} value={this.state.birthday} name="birthday" onChange={this.handleInputChange} />
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'Phone'} value={this.state.phone} name="phone" onChange={this.handleInputChange} />
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'Email'} value={this.state.email} name="email" onChange={this.handleInputChange} />
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'Address'} value={this.state.address} name="address" onChange={this.handleInputChange} />
                        {/* <input type={'text'} className={'schoolchildren_right_input'} placeholder={'Class'} value={this.state.class} name="class" onChange={this.handleInputChange} /> */}
                        <select className={'schoolchildren_right_input'} value={this.state.class} name="class" onChange={this.handleInputChange}>
                            <option key={0}></option>
                            {this.state.classes.map((e, i) =>
                                <option key={i + 1}>{e.className}</option>
                            )};
                        </select>
                        <input type={'text'} className={'schoolchildren_right_input'} placeholder={'loginKey'} value={this.state.loginKey} name="loginKey" onChange={this.handleInputChange} />
                        <div className={'schoolchildren_right_footer'}>
                            {this.state.notSavedField && this.state.selectedSchoolchildrensId ? <button tupe={'button'} className={'schoolchildren_right_footer_submit'} onClick={this.upgradeSchoolchildrenEl}>Upgrade</button> : ''}
                            {this.state.selectedSchoolchildrensId ? <button className={'schoolchildren_right_footer_submit'} onClick={this.removeSchoolchildren}>Remove</button> : <input type={'submit'} className={'schoolchildren_right_footer_submit'} onClick={this.addSchoolchildrenEl} value={'Add'} />}
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    upgradeSchoolchildrenEl() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&schoolchildren=update&id=${this.state.selectedSchoolchildrensId}&firstName=${this.state.firstName}&lastName=${this.state.lastName}&birthday=${this.state.birthday}&phone=${this.state.phone}&email=${this.state.email}&address=${this.state.address}&class=${this.state.class}&loginKey=${this.state.loginKey}`)
            .then((response) => response.json())
            .then(res => {
                this.getAllSchoolchildren()
            });
        this.setState({
            notSavedField: false
        })
    }

    addSchoolchildrenEl() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&schoolchildren=add&firstName=${this.state.firstName}&lastName=${this.state.lastName}&birthday=${this.state.birthday}&phone=${this.state.phone}&email=${this.state.email}&address=${this.state.address}&class=${this.state.class}&loginKey=${this.state.loginKey}`)
            .then((response) => response.json())
            .then(res => {
                this.handlerReturnFromServer(res)
                this.getAllSchoolchildren()
            });
    }

    new(e) {
        this.clearForm()
        this.setState({
            selectedSchoolchildrensId: ''
        })
        let e_open = document.querySelector('.schoolchildren_left_el_open')
        if (e_open)
            e_open.classList.remove("schoolchildren_left_el_open")
        e.target.classList.add("schoolchildren_left_el_open")
    }

    selectSchoolchildren(e) {
        this.clearForm()
        let dataId = e.target.getAttribute('data-id')
        this.state.schoolchildrens.map((e, i) => {
            if (e.id === dataId) {
                this.setState({
                    firstName: e.firstName,
                    lastName: e.lastName,
                    birthday: e.birthday,
                    phone: e.phone,
                    email: e.email,
                    address: e.address,
                    class: e.class,
                    loginKey: e.loginKey,
                    selectedSchoolchildrensId: e.id,
                    notSavedField: false
                })
            }
        })
        let e_open = document.querySelector('.schoolchildren_left_el_open')
        if (e_open)
            e_open.classList.remove("schoolchildren_left_el_open")
        e.target.classList.add("schoolchildren_left_el_open")
    }

    removeSchoolchildren() {
        let dataId = this.state.selectedSchoolchildrensId
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&schoolchildren=delete&id=${dataId}`)
            .then((response) => response.json())
            .then(res => {
                this.getAllSchoolchildren()
                this.clearForm()
            });
        this.setState({
            selectedSchoolchildrensId: ''
        })
        let e_open = document.querySelector('.schoolchildren_left_el_open')
        if (e_open)
            e_open.classList.remove("schoolchildren_left_el_open")
        document.querySelector('.schoolchildren_left>.schoolchildren_left_el').classList.add("schoolchildren_left_el_open")
    }

    addSchoolchildren() {

    }

    getAllSchoolchildren() {
        // https://shool28.000webhostapp.com/getSet.php?key=XfASDcvv656erg&schoolchildren=getAll
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&schoolchildren=getAll`)
            .then((response) => response.json())
            .then(res => {
                this.setState({
                    schoolchildrens: res
                })
            });
    }
    getAllClasses() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&classes=getAll`)
            .then((response) => response.json())
            .then(res => {
                this.setState({
                    classes: res
                })
            });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            notSavedField: true
        });
    }

    handlerForm(e) {
        e.preventDefault()
    }



    handlerReturnFromServer(res) {
        if (res) {
            // console.log('OK')
            this.clearForm()
        } else {
            // console.log('ERR')
        }
    }

    clearForm() {
        this.setState({
            firstName: '',
            lastName: '',
            birthday: '',
            phone: '',
            email: '',
            address: '',
            class: '',
            selectClass: '',
            loginKey: '',
        })
    }


    // selectClass(e){
    //     console.log(e.target.value)
    // }

}

export default Schoolchildren