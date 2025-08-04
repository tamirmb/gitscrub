import {useState} from 'react';

const ApiKeyInput = ({ apiKey, setApiKey }) => {
  const [error, setError] = useState({
    error: false,
    message: ''
  })

  return (
    <>
      <div className='flex gap-2'>
        <input className='border px-2' type="password" name="" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="enter your api key"/>
        <a className='text-blue-600 hover:text-blue-700 hover:underline' href="https://github.com/settings/tokens/new" target="_blank">create an api key</a>
      </div>
    </>
  )
}

export default ApiKeyInput
