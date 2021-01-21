// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

const USERNAME_ERROR =
  'Username should be lowercase, and cannot contain spaces or special characters'
const USERNAME_DUPLICATE = 'Please choose a unique username'
const USERNAME_EMPTY = 'Please enter a username'

function UsernameForm({onSubmitUsername}) {
  window.fetchStyle('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css')

  const [username, setUsername] = React.useState('')
  const [error, setError] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState(USERNAME_ERROR)
  const [usernames, setUsernames] = React.useState([])

  const usernameInputRef = React.useRef(null)
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  let errorTimeout = null

  const errorTimeRender = errorMessage => {
    setErrorMessage(errorMessage)
    setError(true)
    clearTimeout(errorTimeout)
    errorTimeout = setTimeout(() => {
      setError(false)
    }, 5000)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!username) {
      errorTimeRender(USERNAME_EMPTY)
    } else if (usernames.indexOf(username) === -1) {
      setUsername('')
      setUsernames([usernameInputRef.current.value, ...usernames])
    } else {
      errorTimeRender(USERNAME_DUPLICATE)
    }
  }

  const handleChange = event => {
    let {value} = event.target
    const formattedValue = value
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z\d]/, '')
    const isValid = value === formattedValue
    if (!error && !isValid) {
      errorTimeRender(USERNAME_ERROR)
    }
    // Trim, lowercase, filter out non-alphanumeric input
    setUsername(formattedValue)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col py-24 bg-gray-200 justify-start items-center"
      style={{height: '100vh', width: '100vw'}}
    >
      <div className="flex w-full flex-col shadow p-10 max-w-lg mx-auto bg-white rounded z-10">
        <label className="flex w-full mb-4 items-center align-center">
          Username:
          <input
            className="ml-4 border-2 rounded p-2 flex-grow"
            ref={usernameInputRef}
            value={username}
            name="usernameInput"
            type="text"
            onChange={handleChange}
          />
        </label>
        <button
          className={['bg-blue-500 text-white py-2 rounded', ''].join(' ')}
          type="submit"
        >
          Submit
        </button>
      </div>
      <p
        role="alert"
        className={[
          'text-gray-700 bg-gray-100 max-w-lg p-5 opacity-75 rounded mt-4 mb-2 border-2 border-gray-300 leading-6 transform transition-all duration-500',
          error
            ? 'mt-0 translate-y-0 scale-100'
            : '-mt-8 -translate-y-full scale-50',
        ].join(' ')}
      >
        {errorMessage}
      </p>
      <div>
        {usernames.map(selectedUserName => (
          <div className="text-center border-2 bg-blue-200 color-blue-500 border-blue-700 rounded p-2 my-2 flex items-center justify-between">
            {selectedUserName}
            <span
              className="inline-flex items-center justify-center bg-red-500 text-white text-xl leading-4 pb-1 ml-2 w-6 h-6 rounded-full cursor-pointer"
              onClick={() => {
                setUsernames(
                  usernames.filter(user => user !== selectedUserName),
                )
              }}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
