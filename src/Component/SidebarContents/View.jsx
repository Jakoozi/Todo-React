import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Swal from 'sweetalert2';


export default class View extends Component {

         state= {
            data:[

            ],
            loaded:false,
            filtered:false,
            item:7
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
                      title:'Opps!!',
                      text: 'Tasks cant load please Check your internet Connection'
                    }
                  )
            } );
           
    }

    addDataToState = (data) => {
        this.setState({data,loaded:true});
        console.log(this.state);
    }


    handleClick = (e,id) => {
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
                let data = this.state.data;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'delete'
                })
                .then(response => response.json())
                .then(json => console.log(json)) 
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'Tasks cant load please Check your internet Connection'
                        }
                      )
                } );
                
                let dataUpdate = data.filter(task => task.id !== id);
                this.setState({data:dataUpdate});

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your Task has been deleted.',
                    type: 'success'
                }) 
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Task is safe :)',
                    'error'
                  )
            }
          }
        )
                    
                    
            
    }
   


    render() {
        let all;
        let data = this.state.data;
        let loaded = this.state.loaded;
        if(loaded === true)
        {
            all = data.map(data => {
                return (
                
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1">{data.name}</td>
                                        <td>{data.category}</td>
                                        <td>{data.startTime}</td>                 
                                        <td>{data.endTime}</td>
                                       <td onClick={(e,id = data.id) => this.handleClick(e,id)}>
                                           <a class="task-btn-delete" ><span>Delete</span><i class="os-icon os-icon-ui-15"></i></a>
                                        </td>
                                       
                                   </tr>
                                </tbody>
                                
                );
            });
            console.log(all);
        }
        else
        {
            all = <h3>Loading...</h3>
        }


        return (
            <div>
                <Layout>
                    <div class="content-i">
                        <div class="content-box">   
                            <div class="element-wrapper">
                                <h4 class="element-header">All Tasks</h4>
                                <div class="element-box" key={data.id}>
                                    <div class="table-responsive">
                                        {/* <div id="dataTable1_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4"> */}
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table id="dataTable1" width="100%" class="table table-striped table-lightfont dataTable" role="grid" aria-describedby="dataTable1_info"  style={{width: '100%'}}>
                                                        <thead>
                                                                    <tr role="row">
                                                                        <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                                            Task
                                                                        </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending"  style={{width: '280px'}}>
                                                                                Category
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                                                Start Date
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                                                End Date
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                                                Delete Task
                                                                            </th>
                                                                    </tr>
                                                        </thead>
                                                        <tfoot>
                                                            <tr>
                                                                <th rowspan="1" colspan="1">Task</th>
                                                                <th rowspan="1" colspan="1">Category</th>
                                                                <th rowspan="1" colspan="1">Start Date</th>
                                                                <th rowspan="1" colspan="1">End Date</th>
                                                                <th rowspan="1" colspan="1">Delete Task</th>

                                                            </tr>
                                                        </tfoot>
                                                        {all}
                                                    </table>
                                                </div>         
                                           </div>
                                         {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}
    

                                            // <div class="row">
                                            //     <div class="col-sm-12 col-md-6">
                                            //         <div class="dataTables_length" id="dataTable1_length">
                                            //             <label>
                                            //                 Show 
                                            //                 <select name="dataTable1_length" aria-controls="dataTable1" class="form-control form-control-sm">
                                            //                     <option value="10">10</option>
                                            //                     <option value="25">25</option>
                                            //                     <option value="50">50</option>
                                            //                     <option value="100">100</option>
                                            //                 </select>
                                            //                 entries
                                            //             </label>
                                            //         </div>
                                            //     </div>
                                            //     <div class="col-sm-12 col-md-6">
                                            //         <div id="dataTable1_filter" class="dataTables_filter">
                                            //             <label>Search:
                                            //                 <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="dataTable1" />
                                            //             </label>
                                            //         </div>
                                            //     </div>
                                            // </div>              

                                            // <div class="row">
                                            //    <div class="col-sm-12 col-md-5">
                                            //         <div class="dataTables_info" id="dataTable1_info" role="status" aria-live="polite">    
                                            //             Showing 1 to 10 of 57 entries
                                            //         </div>
                                            //     </div>
                                            //     <div class="col-sm-12 col-md-7">
                                            //         <div class="dataTables_paginate paging_simple_numbers" id="dataTable1_paginate">
                                            //             <ul class="pagination">
                                            //                 <li class="paginate_button page-item previous disabled" id="dataTable1_previous">
                                            //                     <a href="#" aria-controls="dataTable1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                            //                 </li>
                                            //                 <li class="paginate_button page-item active">
                                            //                     <a href="#" aria-controls="dataTable1" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                            //                 </li>
                                            //                 <li class="paginate_button page-item ">
                                            //                     <a href="#" aria-controls="dataTable1" data-dt-idx="2" tabindex="0" class="page-link">2</a>
                                            //                 </li>
                                            //                 <li class="paginate_button page-item ">
                                            //                     <a href="#" aria-controls="dataTable1" data-dt-idx="3" tabindex="0" class="page-link">3</a>
                                            //                 </li>
                                            //                 <li class="paginate_button page-item ">
                                            //                     <a href="#" aria-controls="dataTable1" data-dt-idx="4" tabindex="0" class="page-link">4</a>
                                            //                 </li>
                                            //                 <li class="paginate_button page-item ">
                                            //                     <a href="#" aria-controls="dataTable1" data-dt-idx="5" tabindex="0" ////class="page-link">5</a>
                                            //                 </li>
                                            //             </ul>
                                            //         </div>
                                            //     </div>
                                            // </div>