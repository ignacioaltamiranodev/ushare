import { useRouter } from 'next/router';
import NoResults from '../../components/NoResults';
import Post from '../../components/Post';
import { useAuth } from '../../context/authContext';
import { usePost } from '../../context/postContext';

const SearchPage = () => {
  const { posts } = usePost();
  const { user } = useAuth();
  const { query, back, push } = useRouter();
  const searchTerm = query.searchTerm;

  const filteredPosts = posts.filter(
    (post) =>
      post.data().username.toLowerCase().includes(searchTerm) ||
      post.data().caption.toLowerCase().includes(searchTerm) ||
      post.data().category.toLowerCase().includes(searchTerm)
  );

  if (!user) {
    push('/login');
  }

  return (
    <section className="container">
      <button className="btn mt-4" onClick={() => back()}>
        Go Back
      </button>
      <div className="posts mt-4">
        {filteredPosts.length >= 1 &&
          filteredPosts.map((post) => (
            <Post
              key={post.data().id}
              id={post.data().id}
              post={post.data()}
              small
            />
          ))}
      </div>
      {filteredPosts.length === 0 && (
        <NoResults text={`There are no results found for "${searchTerm}".`} />
      )}
    </section>
  );
};

export default SearchPage;
