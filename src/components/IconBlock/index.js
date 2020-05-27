import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';

import './icon-block.scss';

export const IconBlock = ({ icon, content, title }) => (
  <div className="icon-block">
    <div className="icon-block--title">
      <Icon icon={icon} />
      <h4>{title}</h4>
    </div>
    <div className="icon-block--content">
      {typeof content === 'string' ? <p>{content}</p> : content}
    </div>
  </div>
);

export default IconBlock;

IconBlock.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
};

IconBlock.defaultProps = {
  icon: 'arrow-right',
  title: '',
  content: '',
};
