import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section style={{ height: "80vh" }}>
    <div className="center-all">
      <h2>Page Not Found</h2>
      <p>Looks like the page you are looking for could not be found.</p>
      <br />
      <Link to={"/"}>
        <button className="--btn">Bach To Home</button>
      </Link>
    </div>
  </section>
  )
}

export default NotFound
