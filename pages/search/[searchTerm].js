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
      post.data().caption.toLowerCase().includes(searchTerm)
  );

  if (!user) {
    push('/login');
  }
  return (
    <section className="container">
      <button className="btn mt-4" onClick={() => back()}>
        Go Back
      </button>
      {filteredPosts.length < 1 ? (
        <NoResults text={'No results found for the search term.'} />
      ) : (
        filteredPosts.map((post) => (
          <Post
            key={post.data().id}
            id={post.data().id}
            post={post.data()}
            small
          />
        ))
      )}
    </section>
  );
};

export default SearchPage;
