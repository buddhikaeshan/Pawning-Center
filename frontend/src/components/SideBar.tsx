import React, {  useState } from 'react'
import { Link } from 'react-router-dom';


interface Props {
    onLogout: () => void;
}

function SideBar({ onLogout }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        console.log("clicked");
        setIsExpanded(!isExpanded);
    };

    const logout = () => {
        onLogout();
    }

    return (
        <div className="wrapper">
            <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                <div className="d-flex mt-1">
                    <button className="toggle-btn" onClick={toggleSidebar} type="button">
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/dashboard" className="sidebar-link">
                            <i className="lni lni-dashboard"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/invoice" className="sidebar-link">
                            <i className="lni lni-book"></i>
                            <span>Invoice</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/stock" className="sidebar-link">
                            <i className="lni lni-cart-full"></i>
                            <span>Stock</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/profile" className="sidebar-link">
                            <i className="lni lni-cog"></i>
                            <span>Setting</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <button className="sidebar-link" onClick={logout}>
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </div>
  )
}

export default SideBar