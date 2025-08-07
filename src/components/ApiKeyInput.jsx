import {useState} from 'react';

const ApiKeyInput = ({ apiKey, setApiKey, isSaved, onClickSave }) => {
  const [error, setError] = useState({
    error: false,
    message: ''
  })

  return (
    <>
      <div className='flex gap-2'>
        <input className='border px-2' type="password" name="" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="enter your api key" disabled={isSaved}/>
        <button disabled={isSaved} className='border border-black bg-gray-100 px-2 hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-400' onClick={onClickSave}>save</button>
        <a className='text-blue-600 hover:text-blue-700 hover:underline' href="https://github.com/settings/tokens/new" target="_blank">create an api key</a>
      </div>
    </>
  )
}

export default ApiKeyInput
