import React from 'react';

const Search: React.FC = () => {
  const [_, query] = window.location.href.split('?q=');
  if (query) console.log(query);
  return (
    <div>
      Search
    </div>
  );
}

export default Search;