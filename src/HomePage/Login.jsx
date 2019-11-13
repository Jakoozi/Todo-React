import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// import Layout from '../../Layout/Layout';


export default class Login extends Component {
    state ={
        data:{
            email: "",
            Password: "" 
        }  
    }

    handleInputChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        let data = this.state.data;
        data[name] = value;

        this.setState(this.state.data = data);
        console.log(this.state);
       

    }

    onSubmit = (e) => {
        const {email, password} = this.state.data;
        if(email && password)
        {
            e.preventDefault();
            const data = JSON.stringify(this.state.data);
            let url = 'http://localhost:5000/api/admin/login';

            
        }
    }


    render() {

        const {email, password} = this.state.data;
        return (
            <div className='with-content-panel'>
                <div className='all-wrapper menu-side with-side-panel'>
                    <div className='layout-w'>
                        <div className='content-w '>
                            <div 
                            className='with-content-panel'
                            style={{ minHeight: '95vh' }}>
                                <ul className="breadcrumb">

                                    <li className="breadcrumb-item"><Link to="/Register" >Register</Link></li>
                                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/" >About</Link></li>  
                                    <li className="breadcrumb-item"><Link to="/Setting" >Settings</Link></li>     
                                </ul>
                                <div className="container-fluid">
                                    <div class="row">
                                        <div class="col-md-12"></div>
                                    </div>
                                    <div className="row" style={{paddingTop: '110px'}}>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <div className="element-wrapper">
                                                <h6 className="element-header">
                                                    Login In To Members Area:
                                                </h6>
                                                <div className="element-box">
                                                    <form role="form" onSubmit={this.onSubmit}>
                                                            <div class="form-group">
                                                                <label for="email">Email address:</label>
                                                                <input type="email"
                                                                 class="form-control"
                                                                 name='email'
                                                                 value={email}
                                                                 onChange={this.handleInputChange}
                                                                  id="email" />
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="pwd">Password:</label>
                                                                <input type="password" 
                                                                onChange={this.handleINputChange}
                                                                name='password'
                                                                value={password}
                                                                class="form-control" 
                                                                id="pwd" />
                                                            </div>
                                                            <div class="checkbox">
                                                                <label><input type="checkbox" /> Remember me</label>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary">Login</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


{/* <div className='with-content-panel'>
                <div className='all-wrapper menu-side with-side-panel'>
                    <div className='layout-w'>
                        <div className='content-w '>
                            <div
                            className='with-content-panel'
                            style={{ minHeight: '95vh' }}>
                                <nav class="navbar navbar-inverse">
                                    <div class="container-fluid">
                                        <div class="navbar-header">
                                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>                        
                                        </button>
                                        <a class="navbar-brand" href="#">Logo</a>
                                        </div>
                                        <div class="collapse navbar-collapse" id="myNavbar">
                                        <ul class="nav navbar-nav">
                                            <li class="active"><a href="#">Home</a></li>
                                            <li><a href="#">About</a></li>
                                            <li><a href="#">Projects</a></li>
                                            <li><a href="#">Contact</a></li>
                                        </ul>
                                        <ul class="nav navbar-nav navbar-right">
                                            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                                        </ul>
                                        </div>
                                    </div>
                                </nav>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <form role="form">
                                                <div class="form-group">
                                                    <label for="email">Email address:</label>
                                                    <input type="email" class="form-control" id="email" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="pwd">Password:</label>
                                                    <input type="password" class="form-control" id="pwd" />
                                                </div>
                                                <div class="checkbox">
                                                    <label><input type="checkbox" /> Remember me</label>
                                                </div>
                                                <button type="submit" class="btn btn-default">Submit</button>
                                            </form>
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
</div> */}