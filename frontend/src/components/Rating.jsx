import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'
import PropTypes from 'prop-types'

const Rating = ({value, text}) => {
  const getStarIcon = (highest, middle, value) => {
    if (value >= highest){
      return <FaStar/>
    }
    else if (value >= middle){
      return <FaStarHalfAlt/>
    }
    else {
      return <FaRegStar/>
    }
  }
  return (
    <div className='rating'>
        <span>
            {getStarIcon(1, 0.5, value)}
        </span>
        
        <span>
            {getStarIcon(2, 1.5, value)}
        </span>

        <span>
            {getStarIcon(3, 2.5, value)}
        </span>
      
        <span>
            {getStarIcon(4, 3.5, value)}
        </span>
      
        <span>
            {getStarIcon(5, 4.5, value)}
        </span>
        <span className="rating-text">{text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
};
export default Rating
