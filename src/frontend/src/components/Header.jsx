import React from 'react';
import "../styles/header.css";

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <a href="/">
                    <img src="/logoKHTN.png" alt="HCMUS" className="logo-img" />
                </a>
            </div>
            <nav className="nav">
                <a href="/" className="nav-link">Trang chủ</a>
                <a href="/settings" className="nav-link">Cài đặt</a>
            </nav>
        </div>
    );
}

export default Header;
