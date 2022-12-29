const LoginForm = ({ handleLogin, username, usernameOnChange, 
  password, passwordOnChange}) => (

    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={usernameOnChange}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={passwordOnChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
)

export default LoginForm
