import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboard-detail`);
            setData(response.data.dashboard);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(data)

    return (<>
        <div className="midde_cont">
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2 className="text-white">Dashboard</h2>
                        </div>
                    </div>
                </div>
                <div className="heightDiv">
                    <div className="row column1">
                        {/* <div className="col-md-6 col-lg-6 col-xl-3 customCols">
                    <div className="full counter_section margin_bottom_30">
                        <div className="couter_icon">
                            <div> 
                                <i className="fa fa-dollar dashColor1"></i>
                            </div>
                        </div>
                        <div className="counter_no">
                            <div>
                                <p className="total_no">qwDQW</p>
                                <p className="head_couter">Subscription Revenue</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                        {/* <div className="col-md-6 col-lg-6 col-xl-3 customCols">
                    <div className="full counter_section margin_bottom_30">
                        <div className="couter_icon">
                            <div> 
                                <i className="fa fa-dollar dashColor1"></i>
                            </div>
                        </div>
                        <div className="counter_no">
                            <div>
                                <p className="total_no">DWQ</p>
                                <p className="head_couter">Ticket Revenue</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                        <div className="col-md-6 col-lg-6 col-xl-3 col-xxl-4 customCols">
                            <Link to="/view-all-user" >
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-users dashColor2"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">{data.totActive_user}</p>
                                            <p className="head_couter"><Link to='/view-all-user'>Total Active Users </Link></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 col-xxl-4 customCols">
                            <Link to="/view-all-movies" >
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon ">
                                        <div>
                                            <i className="fa fa-tv dashColor3"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">{data.tot_fest}</p>
                                            <p className="head_couter"><Link to="/view-all-festival">Total Festival</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 col-xxl-4 customCols">
                            <Link to="/view-all-movies" >
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-film dashColor4"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">{data.tot_movie}</p>
                                            <p className="head_couter"><Link to="/view-all-movies">Total Movies</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 col-xxl-4 customCols">
                            <Link to="/view-all-votes" >
                                <div className="full counter_section margin_bottom_30">
                                    <div className="couter_icon">
                                        <div>
                                            <i className="fa fa-film dashColor4"></i>
                                        </div>
                                    </div>
                                    <div className="counter_no">
                                        <div>
                                            <p className="total_no">{data.tot_votes}</p>
                                            <p className="head_couter"><Link to="/view-all-movies">Total Votes</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Dashboard;
