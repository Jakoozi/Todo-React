import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Swal from 'sweetalert2';


export default class Notification extends Component {

    state={
        data:[

        ],
        pending:[

        ],
        completed:[

        ],
        skipped:[

        ],
        loaded:false
    }

    componentDidMount(){
        let url = 'http://localhost:5000/api/todo';
    
            fetch(url)
            .then(response => response.json())
            .then(json => this.addDataToState(json)) 
            .catch(error => { 
                console.log(error)
                Swal.fire(
                    {
                      type: 'error',
                      title:'Sorry!!',
                      text: 'Tasks cant be loaded please Check your internet Connection'
                    }
                  )
            } );
           
    }

    addDataToState = (data) => {
        let pendingtasks = [];
        let completedtasks = [];
        let skippedtasks = []

        data.map(task => 
            {
                if(task.statusReturner == 3)
                {
                    pendingtasks.push(task);
                }
                else if(task.statusReturner == 5)
                {
                    completedtasks.push(task);
                }
                else if(task.statusReturner == 6)
                {
                    skippedtasks.push(task);
                }
                
            }
        )

        this.setState({pending:pendingtasks, completed:completedtasks, skipped:skippedtasks, loaded:true});
        console.log(this.state);
    }

    handleskipClick = (e,id) => {
        //Not tested
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Task again!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          })
          .then((result) => {
            if (result.value) {
                let skipped = this.state.skipped;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'delete'
                })
                .then(response => response.json())
                .then(json => {
                        console.log(json);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Task has been deleted.',
                            type: 'success'
                        }) 
                        let skipUpdate = skipped.filter(task => task.id !== id);
                        this.setState({skipped:skipUpdate});
                    }
                ) 
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'This Task Cant Be Delete Please Check Your Internet Connection'
                        }
                      )
                } );
                
               

            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled!!',
                    'Your Task is safe ',
                    'error'
                  )
            }
          }
          )  
    }

    handlecompleteClick = (e,id) => {
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Task again!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          })
          .then((result) => {
            if (result.value) {
                let complete = this.state.completed;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'delete'
                })
                .then(response => response.json())
                .then(json => {
                        console.log(json);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Task has been deleted.',
                            type: 'success'
                        }) 
                        let completeUpdate = complete.filter(task => task.id !== id);
                        this.setState({completed:completeUpdate});
                    }
                ) 
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'This Task Cant Be Delete Please Check Your Internet Connection'
                        }
                      )
                } );
                
               

            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Task is safe ',
                    'error'
                  )
            }
          }
        )
    }
    handleAcceptedClick(e,id){
        Swal.fire({
            title: 'Are you sure?',
            text: 'You Want To Accept Thiis Task!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Accept!',
            cancelButtonText: 'No, keep it!'
          })
          .then((result) => {
            if (result.value) {
                let pending = this.state.pending;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'Put'
                })
                .then(response => response.json())
                .then(json => {
                        console.log(json);
                        Swal.fire({
                            title: 'Accepted!',
                            text: 'Your Task is Currently Ongoing.',
                            type: 'success'
                        }) 
                        let accepted = pending.filter(task => task.id !== id);
                        this.setState({pending:accepted});
                    }
                ) 
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'This Task Cant Be Acceptedd Please Check Your Internet Connection'
                        }
                      )
                } );
                
               

            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Task is still Pending ',
                    'error'
                  )
            }
          }
        )
    }
    handleDeclinedClick = (e,id) =>{
        Swal.fire({
            title: 'Declined!',
            text: 'Your Task Has Been Declined Successfully.',
            type: 'success'
        }) 
        let pending = this.state.pending;
        let declined = pending.filter(task => task.id != id);
        this.setState({pending:declined});
    }


    render() {
        let loaded = this.state.loaded;
        let pend;
        let complete;
        let skip;
        let pending = this.state.pending;
        let completed = this.state.completed;
        let skipped = this.state.skipped;

        if(loaded === true)
        {
            pend = pending.map(pending => {
                return (
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">{pending.name}</td>
                                        <td>{pending.category}</td>
                                        <td>{pending.startTime}</td>                 
                                        <td>{pending.endTime}</td>
                                        <td>
                                            <a class="badge badge-success" href="#" onClick={(e,id = pending.id) => this.handleAcceptedClick(e,id)}>
                                                Accept
                                            </a>
                                            <a class="badge badge-warning" href="#"  onClick={(e,id = pending.id) => this.handleDeclinedClick(e,id)}>
                                                Decline
                                            </a>
                                         </td>
                                   </tr>
                                </tbody>
                );
            });
            console.log(pend);
        }
        else
        {
            pend = <h6>Loading...</h6>
        }

        if(loaded === true)
        {
            complete = completed.map(completed => {
                return (
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">{completed.name}</td>
                                        <td>{completed.category}</td>
                                        <td>{completed.startTime}</td>                 
                                        <td>{completed.endTime}</td>
                                        <td onClick={(e,id = completed.id) => this.handlecompleteClick(e,id)}>
                                            <a class="badge badge-danger" href="#">
                                                Delete
                                                <i class="os-icon os-icon-ui-15"></i>
                                            </a>
                                         </td>
                                   </tr>
                                </tbody>    
                );
            });
            console.log(complete);
        }
        else
        {
            complete = <h6>Loading...</h6>
        }

        if(loaded === true)
        {
            skip = skipped.map(skip => {
                return (
                
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td>{skip.name}</td>
                                        <td>{skip.category}</td>
                                        <td>{skip.startTime}</td>                 
                                        <td>{skip.endTime}</td>
                                        <td onClick={(e,id = skip.id) => this.handleskipClick(e,id)}>
                                            <a class="badge badge-danger" href="#">
                                                Delete
                                                <i class="os-icon os-icon-ui-15"></i>
                                            </a>
                                        </td>
                                   </tr>
                                </tbody>
                                
                );
            });
            console.log(skip);
        }
        else
        {
            skip = <h6>Loading...</h6>
        }
        
        // <td onClick={(e,id = data.id) => this.handleClick(e,id)}>
        //     <a class="task-btn-delete" ><span>Delete</span><i class="os-icon os-icon-ui-15"></i></a>
        // </td>
        return (
            <div>
                <Layout>
                    <div className="content-w">
                        <div className="content-i">
                            <div className="content-box">
                                <div class="element-wrapper">
                                    <h4 class="element-header">This Are Your Pending Tasks</h4>
                                    <table class="table table-padded">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Start Time</th>
                                                <th class="text-center">End Time</th>
                                                <th>Accept/Dcline Tasks</th>
                                            </tr>
                                        </thead>
                                        {pend}
                                    </table>
                                </div>
                                <div class="element-wrapper">
                                    <h4 class="element-header">This Are Your Completed Tasks</h4>
                                    <table class="table table-padded">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Start Time</th>
                                                <th class="text-center">End Time</th>
                                                <th>Accept/Dcline Tasks</th>
                                            </tr>
                                        </thead>
                                        {complete}
                                    </table>
                                </div>
                                <div class="element-wrapper">
                                    <h4 class="element-header">This Are Your Skipped Tasks</h4>
                                    <table class="table table-padded">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Start Time</th>
                                                <th class="text-center">End Time</th>
                                                <th>Accept/Dcline Tasks</th>
                                            </tr>
                                        </thead>
                                        {skip}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                
            </div>
        )
    }
}

                                        //  <tbody>
                                        //     <tr>
                                        //         <td class="nowrap">
                                        //             <span class="status-pill smaller yellow"></span>
                                        //             <span>Complete</span>
                                        //         </td>
                                        //         <td>
                                        //             <span class="status-pill smaller yellow"></span>
                                        //             <span>Complete</span>
                                        //         </td>
                                        //         <td>
                                        //             <span class="status-pill smaller yellow"></span>
                                        //             <span>Complete</span>
                                        //         </td>
                                        //         <td>
                                        //             <span class="status-pill smaller yellow"></span>
                                        //             <span>Complete</span>
                                                    
                                        //         </td>
                                        //         <td>
                                        //             <a class="badge badge-primary" href="#">Shopping</a>
                                        //         </td> 
                                        //     </tr>
                                        // </tbody>