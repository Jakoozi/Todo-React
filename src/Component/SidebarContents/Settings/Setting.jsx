import React, { Component } from 'react';
import Layout from '../../Layout/Layout';
import { Link } from 'react-router-dom';


export default class Setting extends Component {
    render() {
        return (
            <Layout>
           
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/Create" className="nav-link">Create</Link></li>
                    <li className="breadcrumb-item"><Link to="/View" className="nav-link">Tasks</Link></li>     
                </ul>
                <div class="floated-colors-btn second-floated-btn">
                    <div class="os-toggler-w">
                        <div class="os-toggler-i">
                            <div class="os-toggler-pill"></div>
                        </div>
                    </div>
                    <span>Dark </span>
                    <span>Colors</span>
                </div>
                <div className=""></div>
            </Layout>
        )
    }
}




