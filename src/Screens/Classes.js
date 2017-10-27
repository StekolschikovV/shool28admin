import React, { Component } from 'react'
import './Classes.css'

class Classes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            className: '',
            selectedClassId: ''
        }
        this.getAllClasses()
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getAllClasses = this.getAllClasses.bind(this);
        this.addClassesEl = this.addClassesEl.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.selectClass = this.selectClass.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.upgradeClassesEl = this.upgradeClassesEl.bind(this);
        this.new = this.new.bind(this);

    }

    render() {
        let classes = this.state.classes.map((e, i) => {
            return (
                <div className={'classes_left_el'} key={i} data-id={e.id} onClick={this.selectClass}>
                    {e.className}
                </div>
            )
        })
        return (
            <div className={'classes'}>
                <div className={'classes_left'}>
                    <div className={'classes_left_el'} onClick={this.new}>
                        Add new
                    </div>
                    {classes}
                </div>
                <div className={'classes_right'}>
                    <form onSubmit={this.handlerForm}>
                        <input type={'text'} className={'classes_right_input'} placeholder={'Class name'} value={this.state.className} name="className" onChange={this.handleInputChange} />
                        <div className={'classes_right_footer'}>
                            {this.state.notSavedField && this.state.selectedClassId ? <button tupe={'button'} className={'classes_right_footer_submit'} onClick={this.upgradeClassesEl}>Upgrade</button> : ''}
                            {this.state.selectedClassId ? <button className={'classes_right_footer_submit'} onClick={this.removeClass}>Remove</button> : <input type={'submit'} className={'classes_right_footer_submit'} onClick={this.addClassesEl} value={'Add'} />}
                        </div>
                    </form>
                </div>
            </div>
        )
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
    addClassesEl() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&classes=add&className=${this.state.className}`)
            .then((response) => response.json())
            .then(res => {
                this.clearForm()
                this.getAllClasses()
            });
    }
    removeClass() {
        let dataId = this.state.selectedClassId
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&classes=delete&id=${dataId}`)
            .then((response) => response.json())
            .then(res => {
                this.getAllClasses()
                this.clearForm()
            });
        this.setState({
            selectedClassId: ''
        })
        let e_open = document.querySelector('.classes_left_el_open')
        if (e_open)
            e_open.classList.remove("classes_left_el_open")
        document.querySelector('.classes_left>.classes_left_el').classList.add("classes_left_el_open")
    }
    upgradeClassesEl() {
        fetch(`https://shool28.000webhostapp.com/getSet.php?key=${this.props.serverKey}&classes=update&id=${this.state.selectedClassId}&className=${this.state.className}`)
            .then((response) => response.json())
            .then(res => {
                this.getAllClasses()
            });
        this.setState({
            notSavedField: false
        })
    }
    selectClass(e) {
        let dataId = e.target.getAttribute('data-id')
        this.state.classes.map((e, i) => {
            if (e.id === dataId) {
                this.setState({
                    className: e.className,
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
    new(e) {
        this.clearForm()
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
            className: '',
        })
    }

}

export default Classes