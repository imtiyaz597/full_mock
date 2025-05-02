  // import { useContext } from "react";
  // import { AuthContext } from "../context/AuthContext";
  // import { useNavigate } from "react-router-dom";
  // import "bootstrap/dist/css/bootstrap.min.css";
  // import MockSidebar from "./MockSidebar";

  // const AdminDashboard = () => {
  //   const { logout } = useContext(AuthContext);
  //   const navigate = useNavigate();

  //   return (
  //     <div className="d-flex">
  //       {/* Sidebar */}
  //       <MockSidebar />

  //       {/* Main Content */}
  //       <div className="container mt-4">
  //         <div className="text-center">
  //           <h1 className="mb-3">Admin Dashboard</h1>
  //           <p className="text-muted">Monitor User Mock Test Performance</p>
  //         </div>

  //         {/* Buttons */}
  //         <div className="d-flex justify-content-center gap-3 mt-4">
  //         <button className="btn btn-success" onClick={() => navigate("/add-user")}>
  //           Add User
  //         </button>
  //           <button className="btn btn-danger" onClick={logout}>
  //             Logout
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AdminDashboard;

  import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MockSidebar from "./MockSidebar";
 
 const REACT_APP_API_URL = "https://full-stack-mocktest.onrender.com"

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMockTests, setTotalMockTests] = useState(0);
  const [activeTests, setActiveTests] = useState(0);
 

 


  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const [usersRes, testsRes] = await Promise.all([
          fetch(`${REACT_APP_API_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${REACT_APP_API_URL}/api/admin/mock-tests`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
 
        const usersData = await usersRes.json();
        const testsData = await testsRes.json();
 
        setTotalUsers(usersData.length || 0);
        setTotalMockTests(testsData.length || 0);
        setActiveTests(testsData.filter((t) => t.status === "active").length || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
 
    fetchStats();
  }, []);
 
  return (
    <div className="d-flex">
      <MockSidebar />
 
      <div className="container mt-4" style={{ marginLeft: "250px" }}>
        <style>
          {`
            .dashboard-card {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              text-align: center;
            }
 
            .dashboard-card h4 {
              margin-bottom: 10px;
              color: #333;
            }
 
            .dashboard-card .value {
              font-size: 28px;
              font-weight: bold;
              color: #007bff;
            }
 
            @media (max-width: 768px) {
              .container {
                margin-left: 0 !important;
              }
            }
          `}
        </style>
 
        <div className="text-center">
          <h1 className="mb-3">Admin Dashboard</h1>
          <p className="text-muted">Monitor User and Mock Test Statistics</p>
        </div>
 
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="dashboard-card">
              <h4>Total Users</h4>
              <div className="value">{totalUsers}</div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="dashboard-card">
              <h4>Total Mock Tests</h4>
              <div className="value">{totalMockTests}</div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="dashboard-card">
              <h4>Active Tests</h4>
              <div className="value">{activeTests}</div>
            </div>
          </div>
        </div>
 
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-success" onClick={() => navigate("/add-user")}>
            Add User
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default AdminDashboard;
