import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ApiKeyInput from './components/ApiKeyInput'
import RepositoryList from './components/RepositoryList'
import GitHubApiService from './services/GitHubApi.js'

function App() {
  const [apiKey, setApiKey] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiKeyChange = (value) => {
    setApiKey(value);
  }

  useEffect(() => {
    const fetchRepositories = async () => {
      const service = new GitHubApiService(apiKey);
      
      // Only fetch if we have a token (either from apiKey or env)
      if (!service.token) {
        console.log('No token available, skipping fetch');
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const repos = await service.getUserRepositories('tamirmb');
        setRepositories(repos);
        console.log('Fetched repositories:', repos);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching repositories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [apiKey])
  

  return (
    <>
      <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey}/> 
    </>
  )
}

export default App
