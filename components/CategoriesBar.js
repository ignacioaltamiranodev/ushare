/* eslint-disable @next/next/no-img-element */
import { usePost } from '../context/postContext';
import { categories } from '../utils/categories';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

const CategoriesBar = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { filterCategory } = usePost();

  return (
    <>
      <div className="d-md-flex d-flex flex-wrap align-items-center mt-3 border-top border-bottom py-3 d-none">
        {categories.map((category, i) => (
          <article
            key={i}
            onClick={() => {
              filterCategory(category);
              setActiveCategory(category);
            }}
          >
            <span
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
            filterCategory(e.target.value);
          }}
        >
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
