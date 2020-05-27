import React from 'react';
import PropTypes from 'prop-types';

export const Logo = ({ src, alt }) => {
  if (!src && !alt) {
    return null;
  }
  return src
    ? <img src={src} className="logo" alt={alt} />
    : <span>{alt}</span>;
};

Logo.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

Logo.defaultProps = {
  alt: '',
  src: '',
};

export default Logo;
