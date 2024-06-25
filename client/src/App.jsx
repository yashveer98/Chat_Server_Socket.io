import { useState, useEffect } from 'react'
import { socket } from './socket'
function App() {
  const [sentMessage, setSentMessage] = useState('')
  const [recievedMessage, setRecievedMessage] = useState('')
  const [receiver, setReceiver] = useState('')

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log(msg)
      setRecievedMessage(msg)
    })
    socket.on('connect', (users) => {
      console.log(users)
    })
  }, [])

  const connectHandler = () => {
    socket.connect()
  }
  const disConnectHandler = () => {
    socket.disconnect()
  }
  const sendMessage = (e) => {
    e.preventDefault()
    socket.timeout(5000).emit('chat message', { sender: socket.id, reciver: receiver, message: sentMessage }, () => {

    })
    setSentMessage('')
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <ul>
          <li>
            {recievedMessage}
          </li>
        </ul>
        <input type="text" onChange={(e) => setSentMessage(e.target.value)} />
        <input type="text" onChange={(e) => setReceiver(e.target.value)} />
        <button type='button' onClick={() => { connectHandler() }}>
          Connect
        </button>
        <button type='button' onClick={() => { disConnectHandler() }}>
          Disconnect
        </button>
        <button type='submit'>
          send
        </button>
      </form>
    </>
  )
}

export default App