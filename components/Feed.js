import Post from './Post';
import { usePost } from '../context/postContext';
import CategoriesBar from './CategoriesBar';
import NoResults from './NoResults';

const Feed = () => {
  const { posts, categoryPosts, noResults } = usePost();

  console.log(noResults);
  console.log(categoryPosts);

  return (
    <section className="container mx-auto mt-4">
      <aside>
        <CategoriesBar />
      </aside>
      <section className={`${noResults ? '' : 'posts'} mt-4`}>
        {categoryPosts.length >= 1
          ? categoryPosts?.map((post) => (
              <Post
                key={post.data().id}
                id={post?.data().id}
                post={post?.data()}
              />
            ))
          : noResults && (
              <NoResults text={'There are no posts found in this category.'} />
            )}
        {categoryPosts.length === 0 &&
          !noResults &&
          posts?.map((post) => (
            <>
              <Post
                key={post.data().id}
                id={post?.data().id}
                post={post?.data()}
              />
            </>
          ))}
      </section>
      {/* {categoryPosts.length === 0 && !noResults && } */}
    </section>
  );
};

export default Feed;
