import Post from './Post';
import { usePost } from '../context/postContext';
import CategoriesBar from './CategoriesBar';
import NoResults from './NoResults';

const Feed = () => {
  const { posts, categoryPosts, noResults } = usePost();

  return (
    <section className="container mx-auto mt-4">
      <aside>
        <CategoriesBar />
      </aside>
      <section className={`posts mt-4`}>
        {categoryPosts.length >= 1 &&
          categoryPosts?.map((post) => (
            <Post
              key={post.data().id}
              id={post?.data().id}
              post={post?.data()}
            />
          ))}
      </section>
      <section
        className={`${
          categoryPosts.length >= 1 || noResults ? 'd-none' : ''
        } posts mt-4`}
      >
        {posts.map((post) => (
          <Post key={post.data().id} id={post?.data().id} post={post?.data()} />
        ))}
      </section>
      {noResults && (
        <NoResults text={'There are no posts found in this category.'} />
      )}
    </section>
  );
};

export default Feed;
