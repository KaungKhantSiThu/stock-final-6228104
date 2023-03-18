import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link href='/' className="nav-item nav-link">Home</Link>
                <Link href='/supplier' className="nav-item nav-link">Supplier Management</Link>
            </div>
        </div>
    </nav>
    )
}

export default Navbar