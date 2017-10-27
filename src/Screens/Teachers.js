import React, { Component } from 'react'
import './Teachers.css'

class Teachers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            lastName: '',
            name: '',
            surname: '',
            phone: '',
            email: '',
            selectedClassId: '',
            notSavedField: false
        }

        this.getAllTeachers = this.getAllTeachers.bind(this)
        this.addTeacher = this.addTeacher.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlerForm = this.handlerForm.bind(this)
        this.selectTeacher = this.selectTeacher.bind(this)
        
        this.getAllTeachers()
    }

    render() {
        let teachers = this.state.teachers.map((e, i) => {
            return (
                <div className={'teachers_left_el'} key={i} data-id={e.id} onClick={this.selectTeacher}>
                    {e.lastName} {e.name}
                </div>
            )
        })
        return (
            <div className={'teachers'}>
                <div className={'teachers_left'}>
                    <div className={'teachers_left_el'} onClick={this.new}>
                        Add new
                    </div>
                    {teachers}
                </div>
                <div className={'teachers_right'}>
                    <form onSubmit={this.handlerForm}>
                        <input type={'text'} className={'teachers_right_input'} placeholder={'lastName'} value={this.state.lastName} onChange={this.handleInputChange} name="lastName" />
                        <input type={'text'} className={'teachers_right_input'} placeholder={'name'} value={this.state.name} onChange={this.handleInputChange} name="name" />
                        <input type={'text'} className={'teachers_right_input'} placeholder={'surname'} value={this.state.surname} onChange={this.handleInputChange} name="surname" />
                        <input type={'text'} className={'teachers_right_input'} placeholder={'phone'} value={this.state.phone} onChange={this.handleInputChange} name="phone" />
                        <input type={'text'} className={'teachers_right_input'} placeholder={'email'} value={this.state.email} onChange={this.handleInputChange} name="email" />
                        <div className={'teachers_right_footer'}>
                            <input type={'submit'} className={'classes_right_footer_submit'} onClick={this.addTeacher} value={'Add'} />

                        </div>
                    </form>
                </div>
            </div>
        )
    }
    handlerForm(e) {
        e.preventDefault()
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
    addTeacher() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&teachers=add&lastName=${this.state.lastName}&name=${this.state.name}&surname=${this.state.surname}&phone=${this.state.phone}&email=${this.state.email}`)
            .then((response) => response.json())
            .then(res => {
                this.clearForm()
                this.getAllTeachers()
            });
    }
    getAllTeachers() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&teachers=getAll`)
            .then((response) => response.json())
            .then(res => {
                this.setState({
                    teachers: res
                })
            })
            .catch(() => {
                console.log("error:", `https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&teachers=getAll`);
            })
    }
    selectTeacher(e) {
        let dataId = e.target.getAttribute('data-id')
        this.state.teachers.map((e, i) => {
            if (e.id === dataId) {
                this.setState({
                    lastName: e.lastName,
                    name: e.name,
                    surname: e.surname,
                    phone: e.phone,
                    email: e.email,
                    selectedClassId: e.id,
                    notSavedField: false
                })
            }
        })
        let e_open = document.querySelector('.classes_left_el_open')
        if (e_open)
            e_open.classList.remove("classes_left_el_open")
        e.target.classList.add("classes_left_el_open")
    }
    new(e) {
        // this.clearForm()
        this.setState({
            selectedClassId: ''
        })
        let e_open = document.querySelector('.classes_left_el_open')
        if (e_open)
            e_open.classList.remove("classes_left_el_open")
        e.target.classList.add("classes_left_el_open")
    }

    clearForm() {
        this.setState({
            lastName: '',
            name: '',
            surname: '',
            phone: '',
            email: '',
        })
    }

}

export default Teachers