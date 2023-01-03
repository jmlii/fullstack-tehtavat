import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, usernameOnChange,
  password, passwordOnChange }) => (

  <form onSubmit={handleLogin}>
    <h2>Log in to application</h2>
    <div>
      Username
      <input
        type='text'
        value={username}
        name='Username'
        onChange={usernameOnChange}
        id='username-input'
      />
    </div>
    <div>
      Password
      <input
        type='password'
        value={password}
        name='Password'
        onChange={passwordOnChange}
        id='password-input'
      />
    </div>
    <button type='submit' id='login-button'>Login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  usernameOnChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordOnChange: PropTypes.func.isRequired
}

export default LoginForm
