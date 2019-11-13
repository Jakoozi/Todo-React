import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class RegisterPage extends Component {

    state = {
        data: {
            email: '',
            password: '',
            confirmpassword: '',
        },
        data2: {
          Email: "",
          password: "",
                },
        btndisabled: false,
        success: false,
        failed:true
        
      }

      handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data =  {...this.state.data};
          data[name] = value;
          console.log(data);
      
        this.setState({data});
      }

      onSubmit = e => {
        e.preventDefault();

       
        console.log(this.state.data);
        let { email, password, confirmpassword } = this.state.data;
        let data3 = this.state.data;
        let data4 = data3.map(data =>{
           data.sice(0,1)
        });
        console.log(data4);
          if (email && password && confirmpassword)                                  
          { 

           
            this.setState({btndisabled:true});

            const data = JSON.stringify(this.state.data);
            let url = 'http://localhost:5000/api/admin';
    
            fetch(url,{
              method: 'post',
              body: data,
              headers:{
                'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(json => {
              console.log(json.message);
              Swal.fire(
                {
                  type: 'success',
                  title: 'Account Created!!!',
                  text: 'You Have Succefully Registered'
                }
              );
            }) //console.log('Success:', JSON.stringify(response))
            .catch(error => {
              console.log(error.error)
              Swal.fire(
                {
                  type: 'error',
                  title:'Opps!!',
                  text: 'Something Whent Wrong'
                }
              )
            });
             this.setState({btndisabled:false});
          }
          else
          {
            Swal.fire(
              {
                type: 'warning',
                title:'Please!',
                text: 'Fill In Your Correct Information'
              }
            )
         }
         this.setState({data:{}});
       
     }


    render() {

        const { email, password, confirmpassword } = this.state.data
        let btndisabled = this.state.btndisabled;

        return (
            <div className='content-w '>
                <div 
                className='with-content-panel'
                style={{ minHeight: '90vh' }}>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/" >Login</Link></li>
                        <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/" >About</Link></li>    
                        <li className="breadcrumb-item"><Link to="/Setting" >Settings</Link></li> 
                    </ul>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12"></div>
                        </div>
                        <div className="row" style={{paddingTop: '110px'}}>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <div className="element-wrapper">
                                    <h6 className="element-header">
                                        Register Below:
                                    </h6>
                                    <div className="element-box">
                                        <form  onSubmit={this.onSubmit}>
                                                <div class="form-group">
                                                    <label htmlfor="email">Email address:</label>
                                                    <input type="email"
                                                     onChange={this.handleInputChange}
                                                     class="form-control"
                                                     value={email}
                                                     name='email'
                                                     id="email" />
                                                </div>
                                                <div class="form-group">
                                                    <label htmlfor="pwd">Password:</label>
                                                    <input type="password"
                                                     onChange={this.handleInputChange}
                                                     class="form-control"
                                                     value={password}
                                                     name='password'
                                                    id="pwd" />
                                                </div>
                                                <div class="form-group">
                                                    <label htmlfor="cpwd">Confirm Password:</label>
                                                    <input type="password"
                                                     onChange={this.handleInputChange} 
                                                    class="form-control"
                                                    value={confirmpassword}
                                                    name='confirmpassword'
                                                    id="cpwd" />
                                                </div>
                                                <div class="checkbox">
                                                    <label><input type="checkbox" /> Remember me</label>
                                                </div>
                                                <button type="submit" 
                                                disabled={btndisabled}
                                                className="btn btn-danger">Register
                                                </button>
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
        )
    }
}
