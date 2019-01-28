import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Connect Project</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}
    
export default Navbar