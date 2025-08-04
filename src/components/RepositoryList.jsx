const RepositoryList = ({ repositories, loading, error }) => {
  if (loading) {
    return <div className="text-center py-4">Loading repositories...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-4">Error: {error}</div>;
  }

  if (repositories.length === 0) {
    return <div className="text-gray-600 py-4">No repositories found.</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Repositories ({repositories.length})</h2>
      <div className="space-y-3">
        {repositories.map((repo) => (
          <div key={repo.id} className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-blue-600 hover:text-blue-800">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {repo.language && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {repo.language}
                  </span>
                )}
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </div>
            {repo.description && (
              <p className="text-gray-700 mt-2">{repo.description}</p>
            )}
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
              {repo.private && (
                <span className="ml-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  Private
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;