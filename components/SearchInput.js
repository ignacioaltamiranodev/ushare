import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { push } = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm === '') return;
    push(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className="s-auto me-3">
      <input
        className="rounded bg-light w-md-50 w-100"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search..."
        type="text"
      />
      <button type="submit" hidden></button>
    </form>
  );
};

export default SearchInput;
