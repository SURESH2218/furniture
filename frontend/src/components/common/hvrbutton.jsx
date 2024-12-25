import PropTypes from 'prop-types';
export default function HButton({ content, onClick }) {
  return (
    <button
      className='border border-white text-md px-3 py-1  rounded-md hover:bg-white hover:text-black transition-all duration-500 font-semibold'
      onClick={onClick}
    >
      {content}
    </button>
  );
}

HButton.propTypes = {
  content: PropTypes.string,
  onClick: PropTypes.func,
};
