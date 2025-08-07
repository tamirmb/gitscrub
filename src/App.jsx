import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ApiKeyInput from './components/ApiKeyInput'
import GitHubApiService from './services/GitHubApi.js'

function App() {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [repos, setRepos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleApiKeyChange = (value) => {
    setApiKey(value);
  }

  const handleIsSavedClicked = async (value) => {
    setIsSaved(true);

    //Execute logic for loading repos
    const url = 'http://api.github.com/users/tamirmb/repos';
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `token ${apiKey}`;
    }

    try {
      const response = await fetch(url, headers);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      
      const repos = await response.json();
      console.log(repos);
      setRepos(repos)
      setIsLoaded(true)
    } catch (error) {
      console.error('Github API request failed', error);
      throw error;
    }
  }

  const repoList = (repos) => {
    return (
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <label className='flex gap-1'>
              <input type="checkbox"/>
              {repo.name}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <ApiKeyInput 
        apiKey={apiKey}
        setApiKey={setApiKey}
        isSaved={isSaved}
        onClickSave={handleIsSavedClicked}
      /> 
      {isSaved && isLoaded && repos.length == 0 && <p>no repos</p>}
      {isSaved && isLoaded && repos.length > 0 && repoList(repos)}


    </>
  )
}

export default App
