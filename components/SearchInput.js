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
    <form onSubmit={handleSearch} className="ms-auto d-none d-md-block">
      <input
        className="rounded bg-light"
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
