import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  keywords: PropTypes.string.isRequired,
};

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics',
};

export default Meta;
