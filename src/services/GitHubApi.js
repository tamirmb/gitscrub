class GitHubApiService {
  constructor(token = null) {
    this.baseUrl = 'https://api.github.com';
    this.token = token || import.meta.env.VITE_GITHUB_PAT_TOKEN;
  }

  setToken(token) {
    this.token = token;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const config = {
      ...options,
      headers
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API request failed', error);
      throw error;
    }
  }

  async getUserRepositories(username) {
    if (!username) {
      throw new Error(`Error: must specify user!`);
    }

    return this.makeRequest(`/users/${username}/repos`);
  }

  async getCurrentUserRepositories() {
    return this.makeRequest('/user/repos');
  }

  async getCurrentUser() {
    return this.makeRequest('/user');
  }
}

export default GitHubApiService;
