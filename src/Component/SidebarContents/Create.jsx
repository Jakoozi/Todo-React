import React, { Component } from "react";
import Layout from "../Layout/Layout";
import Swal from "sweetalert2";

export default class Create extends Component {
  state = {
    data: {
      name: "",
      category: "",
      startTime: "",
      endTime: ""
    },
    btndisabled: false,
    success: false,
    failed: true,
    clearState: false
  };

  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    let data = { ...this.state.data };
    data[name] = value;
    console.log(data);

    this.setState({ data });
  };
  onSubmit = e => {
    this.setState({ btndisabled: true });
    console.log(this.state);
    let { name, category, startTime, endTime } = this.state.data;
    if (name && category && startTime && endTime) {
      if (endTime > startTime)
      {
        e.preventDefault();
        const data = JSON.stringify(this.state.data);
        let url = `http://localhost:5000/api/todo`;
        console.log("this is before making api call");
        fetch(url, {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(json => {
            console.log(json, "this is where json is logged");
            if(json == 1){
              Swal.fire({
                type: "info",
                title: "Inalid Task!",
                text: "You Created An Empty Task"
              });
            }
            else if(json == 2){
                Swal.fire({
                  type: "info",
                  title: "Inalid Date!",
                  text: "Please Check Your Date And Try Again."
                });
            }
            else if(json == 20){
              Swal.fire({
                type: "success",
                title: "Successful!",
                text: "Your Task Has Been Created Successfully."
              });
          }
          })
          .catch(error => {
            console.log(error, "error is console logged");
            Swal.fire({
              type: "error",
              title: "Something Went Wrong",
              text: "Something Went Wrong, Please Try Again."
            });
          });
      }
      else{
        Swal.fire({
          type: "warning",
          title: "Please!",
          text: "Please Enter a valid End Time!!"
        });
      }
    }
    else {
      Swal.fire({
        type: "warning",
        title: "Please!",
        text: "Fill In Your Complete Information"
      });
    }
    this.setState({data:[], btndisabled: false, clearState: true });
    console.log(this.state, `state after creation of task`);
  };

  render() {
    console.log(this.state.data, `data from the render method`)
    const { name, category, startTime, endTime } = this.state.data;
    let btndisabled = this.state.btndisabled;

    return (
      <Layout>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
              <h4
                className="form-header"
                style={{ paddingTop: "15px", textAlign: "center" }}
              >
                Create A Task
              </h4>

              <div className="form-group">
                <label htmlfor="name">Name</label>
                {/* <label>Name</label> */}
                <input
                  onChange={this.handleInputChange}
                  type="text"
                  name="name"
                  className="form-control form-control-md"
                  placeholder="Enter.."
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlfor="Sel1">Category</label>
                <select
                  name="category"
                  onChange={this.handleInputChange}
                  className="form-control form-control-md"
                  value={category}
                >
                  <option hidden>Please Select</option>
                  <option value="1">School</option>
                  <option value="2">Leisure</option>
                  <option value="3">Work</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlfor="startdate">Start Date and Time</label>
                <br />
                <input
                  onChange={this.handleInputChange}
                  type="datetime-local"
                  name="startTime"
                  className="form-control form-control-md"
                  min="2019-02-20"
                  value={startTime}
                />
                <br />
              </div>
              <div className="form-group">
                <label htmlfor="enddate">End Date and Time</label>
                <input
                  onChange={this.handleInputChange}
                  type="datetime-local"
                  name="endTime"
                  className="form-control form-control-md"
                  min="2019-02-20"
                  value={endTime}
                />
              </div>
              <p>
                <button
                  type="submit"
                  // disabled={btndisabled}
                  className="btn btn-light btn-block btn-success"
                >
                  create Task
                </button>
              </p>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Layout>
    );
  }
}
