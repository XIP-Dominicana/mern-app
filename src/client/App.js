import React from 'react';

const path = require('path');

const RES_API = '/api/task';

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            _id : '',
            title : '',
            description : '',
            tasks : []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.fetchTask();
    }

    fetchTask(){
        fetch('api/task')
            .then((res) => res.json().then((data)=> this.setState({tasks : data})));
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        fetch(RES_API, {
            method : 'POST',
            body : JSON.stringify(this.state),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(() => {
            M.toast({html : 'Task saved!'});
            this.setState({
                _id : '',
                title : '',
                description : ''
            });
            this.fetchTask();
        }).catch((error) => {
            console.log(error);
            M.toast({html : 'Error!!'});
        });
    }

    handleDeleteTask(id){

        if (confirm('Are you sure want to delete this task?')){
            fetch(path.join(RES_API, id), {
                method : 'DELETE',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }).then(() => {
                M.toast({html : 'Task deleted!'});
                this.fetchTask();
            }).catch((error) => {
                console.log(error);
                M.toast({html : 'Error!!'});
            });
        }else {
            M.toast({html : 'Elimination aborted!'})
        }
    }

    handleEditTask(id){
        fetch(path.join(RES_API, id))
            .then((response) => response.json()
                .then((data) => {
                    this.setState({
                        _id : data._id,
                        title : data.title,
                        description : data.description
                    })
                }));
    }

    handleUpdateTask(e){
        e.preventDefault();

        fetch(path.join(RES_API, this.state._id), {
            method : 'PUT',
            body : JSON.stringify(this.state),
            headers : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then((response) => {
            M.toast({html : 'Task updated!'});
            this.handleCancel();
        })
            .catch((error) => console.log(error));
    }

    handleCancel(e){
        if (e) e.preventDefault();
        this.setState({
            _id : '',
            title : '',
            description : ''
        })
    }

    render() {
        return(
            <div>
                {/* NAVIGATION */}
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>Mern Stack</a>
                    </div>
                </nav>

                <div className='container'>
                    <div className='row'>
                        <div className='col s6'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.handleSubmit} autoComplete='off'>
                                        <div className='row'>
                                            <div className='input-field col-s12'>
                                                <input onChange={this.handleChange}
                                                       name='title'
                                                       type='text'
                                                       placeholder='Task title'
                                                       value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col-s12'>
                                                <textarea onChange={this.handleChange}
                                                          name='description'
                                                          className='materialize-textarea'
                                                          placeholder='Task description'
                                                          value={this.state.description}/>
                                            </div>
                                        </div>
                                        <button type='submit'
                                                className='waves-effect green lighten-1 btn-small'
                                                style={{margin : '5px'}}>
                                            <i className='material-icons left'>cloud</i>Save
                                        </button>
                                        <button className={this.state._id ? 'waves-effect teal darken-1 btn-small' : 'hide'}
                                            onClick={this.handleUpdateTask}
                                            style={{margin : '5px'}}>
                                            <i className='material-icons left'>cloud_upload</i>Update
                                        </button>
                                        <button className={this.state._id ? 'waves-effect teal darken-1 btn-small' : 'hide'}
                                            onClick={this.handleCancel}
                                            style={{margin : '5px'}}>
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s6'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map((item) => {
                                            return (
                                                <tr key={item._id}>
                                                    <td style={{fontWeight : 'bold'}}>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <button onClick={() => this.handleEditTask(item._id)}
                                                                className='btn light-blue darken-4'
                                                                style={{margin : '4px'}}>
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                        <button onClick={() => this.handleDeleteTask(item._id)}
                                                                className='btn light-blue darken-4'
                                                                style={{margin : '4px'}}>
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
