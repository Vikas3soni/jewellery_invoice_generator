import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import './landingPage.css'; 
import { ImUserTie } from 'react-icons/im'; 
import { FaFileInvoiceDollar } from 'react-icons/fa'; 
import { GiHumanTarget } from 'react-icons/gi'; 
import { RxCube } from 'react-icons/rx'; 
import InvoiceTable from '../Invoice/components/InvoiceTable';

function LandingPage() {
    const { user, logout, isAuthenticated, isLoading, error }= useAuth0(); // Destructure user and logout from useAuth0

    useEffect(() => {
       // console.log('User:', user);
        console.log('IsAuthenticated:', isAuthenticated);
       // console.log('IsLoading:', isLoading);
        console.log('Error:', error);
    }, [user, isAuthenticated, isLoading, error]);

    const handleLogout = () => {
        logout({ returnTo: window.location.origin }); // Logout the user and redirect to the home page
    };

    return (
        <div className="landing-container">
            <div className="sidebar">
                <div className="logo">
                <img src={require('../images/image_logo.jpeg')} alt="SunarMs Logo" /> {/* <img src="" alt="Logo"></img>   */}
                    {/* SunarMs */}
                </div>  
                <ul className="nav-links">
                    <li>
                        <Link to="/product-search"><RxCube className="widget-icon" />&nbsp;Product</Link>
                    </li>
                    <li>
                    <Link to={{ pathname: "/customers-page" }}><GiHumanTarget className="widget-icon" /> &nbsp;Customer</Link>
                    </li> 
                    <li><Link to="/create-invoice"> <FaFileInvoiceDollar className="widget-icon" /> &nbsp;Invoice</Link></li>
                    
                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                </ul>
            </div>
            <div className="add-profile-button-container">
                <Link to="/jeweller-profile" className="add-profile-button"><ImUserTie className="profile-icon" /></Link>
            </div>
            <div className="main-content">
                <p>Welcome, { user.name || user.email}, Its a Beautiful Day!</p>
                <p>I am Here to  create products, invoices, and customers.</p>
                <div>
                <InvoiceTable/>
                </div>
            </div>
            
        </div>
    );
}

export default LandingPage;

