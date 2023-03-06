/* eslint-disable @next/next/no-img-element */
import { usePost } from '../context/postContext';
import { categories } from '../utils/categories';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/themeContext';
import { useRouter } from 'next/router';

const CategoriesBar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { filterCategory } = usePost();
  const { darkTheme } = useTheme();
  const { push } = useRouter();

  return (
    <>
      <div className="d-md-flex d-flex flex-wrap align-items-center mt-3 border-top border-bottom py-3 d-none">
        <Link href="/">
          <a className={`${darkTheme ? 'text-white' : ''} m-3 fs-5 fw-fold`}>
            All
          </a>
        </Link>
        {categories.map((category, i) => (
          <article
            key={i}
            onClick={() => {
              filterCategory(category);
              setActiveCategory(category);
            }}
          >
            <span
              style={{ cursor: 'pointer' }}
              className={` ${
                category === activeCategory ? 'category active' : 'category'
              } m-3 text-capitalize fs-5`}
            >
              {category}
            </span>
          </article>
        ))}
      </div>
      <div className="d-block d-md-none">
        <select
          className="text-capitalize w-50"
          onChange={(e) => {
            if (e.target.value === 'all') push('/');
            filterCategory(e.target.value);
          }}
        >
          <option key={'all'} className="text-capitaliz" value={'all'}>
            All
          </option>
          {categories.map((category, i) => (
            <option key={i} className="text-capitaliz" value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategoriesBar;
