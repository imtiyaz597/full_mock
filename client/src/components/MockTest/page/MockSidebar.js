// import { Link } from "react-router-dom";
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./mocksidebar.css"; // ✅ Import your custom CSS

// const MockSidebar = () => {
//   return (
//     <div
//       className="bg-light border-end p-3 sidebar position-fixed"
//       style={{
//         minWidth: "250px",
//         maxWidth: "250px",
//         height: "100vh",
//         zIndex: 1050,
//       }}
//     >
//       <h4 className="mb-4">Admin Panel</h4>
//       <ul className="list-unstyled sidebar-links">
//         <li className="mb-2">
//           <Link to="/admin-dashboard" className="sidebar-link">
//             Dashboard
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link to="/mock-tests" className="sidebar-link">
//             Mock Tests
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link to="/profile" className="sidebar-link">
//             Profile
//           </Link>
//         </li>
//         <li className="mb-2">
//           <Link to="/accounts" className="sidebar-link">
//             Accounts
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default MockSidebar;

import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTachometerAlt, FaFileAlt, FaUser, FaWallet, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
 
const MockSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isExamPage = location.pathname.includes("/exam");
 
  useEffect(() => {
    if (isExamPage) {
      setIsCollapsed(true);
    }
  }, [location.pathname, isExamPage]);
 
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
 
  return (
    !isExamPage && (
      <div>
        {/* Sidebar */}
        <div
          className={`bg-light border-end p-3 sidebar position-fixed d-flex flex-column align-items-start`}
          style={{
            width: isCollapsed ? "60px" : "250px",
            height: "100vh",
            zIndex: 1050,
            overflow: "hidden",
            transition: "width 0.3s ease",
          }}
        >
          {!isCollapsed && (
            <h4 className="mb-4" style={{ whiteSpace: "nowrap" }}>
              Admin Panel
            </h4>
          )}
 
          <ul className="list-unstyled sidebar-links w-100">
            <li className="mb-3 d-flex align-items-center">
              <Link to="/admin-dashboard" className="sidebar-link d-flex align-items-center">
                <FaTachometerAlt className="me-2" />
                {!isCollapsed && "Dashboard"}
              </Link>
            </li>
            <li className="mb-3 d-flex align-items-center">
              <Link to="/mock-tests" className="sidebar-link d-flex align-items-center">
                <FaFileAlt className="me-2" />
                {!isCollapsed && "Mock Tests"}
              </Link>
            </li>
            <li className="mb-3 d-flex align-items-center">
              <Link to="/profile" className="sidebar-link d-flex align-items-center">
                <FaUser className="me-2" />
                {!isCollapsed && "Profile"}
              </Link>
            </li>
            <li className="mb-3 d-flex align-items-center">
              <Link to="/accounts" className="sidebar-link d-flex align-items-center">
                <FaWallet className="me-2" />
                {!isCollapsed && "Accounts"}
              </Link>
            </li>
          </ul>
        </div>
 
        {/* Toggle Button */}
        <div
          className="position-fixed"
          style={{
            top: "20px",
            left: isCollapsed ? "60px" : "250px",
            zIndex: 1060,
            cursor: "pointer",
            transition: "left 0.3s ease",
          }}
          onClick={toggleSidebar}
        >
          <span style={{ fontSize: "20px", color: "#000" }}>
            {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </span>
        </div>
 
        {/* Internal CSS */}
        <style>
          {`
            .sidebar-links .sidebar-link {
              display: block;
              padding: 10px 15px;
              color: #343a40;
              font-weight: 600;
              border-radius: 4px;
              transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s;
              white-space: nowrap;
              text-decoration: none;
            }
 
            .sidebar-links .sidebar-link:hover {
              background-color: #4748ac;
              color: #fff;
              transform: translateX(4px);
            }
          `}
        </style>
      </div>
    )
  );
};
 
export default MockSidebar;
 
