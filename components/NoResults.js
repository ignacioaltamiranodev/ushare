import { MdOutlineVideocamOff } from 'react-icons/md';

const NoResults = ({ text }) => {
  return (
    <section className="no-results">
      <i className="mt-auto camera-icon">
        <MdOutlineVideocamOff />
      </i>
      <h3 className="mb-auto text-center">{text}</h3>
    </section>
  );
};

export default NoResults;
