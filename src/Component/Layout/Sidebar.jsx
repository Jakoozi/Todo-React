
import React from 'react';
import { Link } from 'react-router-dom';

class SidebarComponent extends React.Component{
    render(){
        return(
            
            <div className="menu-and-user">
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
                        <Link to="/" className="nav-link">        
                            <div className="icon-w"><div className="os-icon os-icon-window-content"></div></div><span>Home</span>
                        </Link>
                    </li>
                    <li className="sub-menu">
                        <Link to="/Create" className="nav-link">        
                        <div className="icon-w"><div className="os-icon os-icon-edit-1"></div></div><span>Create Task</span>
                        </Link>
                    </li>    
                    <li className="sub-menu">
                        <Link to="/View" className="nav-link">        
                            <div className="icon-w"><div className="os-icon os-icon-grid-squares"></div></div><span>View Task</span>
                        </Link>
                    </li>     
                    <li className="sub-menu">
                        <Link to="/Notification" className="nav-link">        
                            <div className="icon-w"><div className="os-icon os-icon-others-43"></div></div><span>Notification</span>
                        </Link>
                    </li>                   
                </ul>
            </div>

        )
    }
}
export default SidebarComponent;

{/* <div className="side-menu-magic"></div> */}