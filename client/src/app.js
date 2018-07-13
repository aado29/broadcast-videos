import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

// Making the App component
class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: socketIOClient('http://localhost:4113'),
      auth: false,
      user: {},
      username: ''
    }
  }

  handleChange = e => {
    this.setState({username: e.target.value})
  }

  joinUser = e => {
    e.preventDefault()
    this.state.socket.emit('join', this.state.username, this.joinUserSuccess)
  }

  joinUserSuccess = (err, user) => {
    console.log(err, user)
    if (err) {
      console.log(err)
      return
    }
    this.setState({user, auth: true, username: ''})
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
              <a className="navbar-brand">Navbar</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link to="/" className="nav-item nav-link">Home</Link>
                  <Link to="/room/100" className="nav-item nav-link">Room 100</Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {!this.state.auth && (
          <div className="row">
            <div className="col-12">
              <form>
                <div className="form-row align-items-center">
                  <div className="col-auto">
                    <label className="sr-only" htmlFor="name">Username</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                      </div>
                      <input onChange={this.handleChange} type="text" className="form-control" id="name" placeholder="Username" value={this.state.username}/>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button onClick={this.joinUser} type="submit" className="btn btn-primary mb-2">Crear</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {this.state.auth && (
          <div className="row">
            <div className="col-12">
              {this.state.user.name}
              <button className="btn btn-primary">Crear Grupo</button>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    )
  }
}

export default App
