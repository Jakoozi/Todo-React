import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Swal from 'sweetalert2';


export default class Create extends Component {
    state = {
        data: {
          name: '',
          category: '',
          startTime: '',
          endTime: ''
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
      
        this.setState({data});
      }
      onSubmit = e => {
        
       
        console.log(this.state.data);
        let { name, category, startTime, endTime } = this.state.data;
          if (name && category && startTime && endTime)                                  
          { 
           
            this.setState({btndisabled:true});

            e.preventDefault();
            const data = JSON.stringify(this.state.data);
            let url = 'http://localhost:5000/api/todo';
    
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
                  title: 'Successfully Created!!!',
                  text: 'Your Task Has Been Created.'
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
                text: 'Fill In Your Complete Information'
              }
            )
         }
         this.setState({data:{}});
       
     }
     
    
      render()
       {
        const { name, category, startTime, endTime } = this.state.data
        let btndisabled = this.state.btndisabled;
       
        return (
            <Layout>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={this.onSubmit}>
                            <h4 className="form-header" style={{paddingTop: "15px", textAlign:"center"}}>Create A Task</h4> 
                                
                                    <div className='form-group'>
                                        <label htmlfor='name'>Name</label>
                                            <input
                                            onChange={this.handleInputChange}
                                            type='text'
                                            name='name'
                                            className='form-control form-control-md'
                                            placeholder='Enter..'
                                            value={name}
                                            />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlfor='Sel1'>Category</label>
                                            <select
                                            class='form-control'
                                            id='sel1'
                                            name='category'
                                            onChange={this.handleInputChange}
                                            className='form-control form-control-md'
                                            placeholder='Category'
                                            value={category}>
                                                <option value='1'>Work</option>
                                                <option value='2'>School</option>
                                                <option value='3'>Leisure</option>
                                            </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlfor='startdate'>Start Date and Time</label>
                                        <br />
                                            <input
                                            onChange={this.handleInputChange}
                                            type='datetime-local'
                                            name='startTime'
                                            className='form-control form-control-md'
                                            min="2019-02-20"
                                            value={startTime} />
                                            <br />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlfor='enddate'>End Date and Time</label>
                                            <input
                                            onChange={this.handleInputChange}
                                            type='datetime-local'
                                            name='endTime'
                                            className='form-control form-control-md'
                                            min="2019-02-20"
                                            value={endTime}
                                            />
                                    </div>
                                    <p>   
                                    <button 
                                          type='submit' 
                                          disabled={btndisabled}
                                          className='btn btn-light btn-block btn-success'>
                                            create Task
                                          </button>
                                    </p>  
                                   
                                       
                                   
                                </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </Layout>
        )
      }
}
