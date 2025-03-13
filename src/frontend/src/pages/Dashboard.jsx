import React from "react";
import Header from "../components/Header";
import InfoTable from "../components/Table";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />
            
            <InfoTable />
        </div>
    )
}

export default Dashboard;