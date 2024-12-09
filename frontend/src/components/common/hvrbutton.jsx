import PropTypes from 'prop-types';
export default function HButton({content}){
    return(<button className='border border-white px-4 py-1 rounded-md hover:bg-white hover:text-black transition-all duration-500 font-semibold'>{content}</button>)
}

HButton.propTypes = {
    content: PropTypes.string
}