import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { css } from 'glamor';

class SidebarComponent extends React.Component {

  componentDidMount(){
    this.notifyMethod();
  }
  notifierMethod = () => {
    let notifier = Number(window.localStorage.getItem("pendingtasks"));

    console.log(notifier, "Notifier is console logged here");
    return notifier;
  }
  notifyMethod = () =>{
     let notify = this.notifierMethod();
    if(notify == 0){
      // return null;
      return toast.info(`Hey!  You Have ${notify} Pending Tasks 😎😎 !`)
    }
    else{
      return toast.info(`Hey! You Have ${notify}  Pending Tasks 😎 !`,
        {
          autoClose: 60000 
        }
      );
    }
  }

  render() {

    return (
      
      <div className="menu-and-user">
        <ToastContainer />
        <div className="logged-user-w">
          <div className="avatar-w">
            <img src="img/avatar1.jpg" alt="User" className="img-circle" />
          </div>
          <div className="logged-user-info-w">
            <div className="logged-user-name">Ogba Anthony</div>
            <div className="logged-user-role">Administrator</div>
          </div>
        </div>
        <ul className="main-menu">
          <li className="sub-menu">
            <Link to="/Dashboard" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-window-content"></div>
              </div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sub-menu">
            <Link to="/Create" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-edit-1"></div>
              </div>
              <span>Create Task</span>
            </Link>
          </li>
          <li className="sub-menu">
            <Link to="/View" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-grid-squares"></div>
              </div>
              <span>View Task</span>
            </Link>
          </li>
          <li className="sub-menu">
            <Link to="/Notification" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-others-43"></div>
              </div>
              <span>Notification</span>
              {this.notifierMethod() === 0 ? (
                <div className="badge badge-pill badge-info">0</div>
              ) : (
                <div className="badge badge-pill badge-danger">
                  {this.notifierMethod()}
                </div>
              )}
            </Link>
          </li>
          <li className="sub-menu">
            <Link to="/Setting" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-robot-2"></div>
              </div>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      
    );
  }
}
export default SidebarComponent;
