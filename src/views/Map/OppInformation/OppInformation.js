import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Classes, Button, Icon, Overlay, Position, Tooltip } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';

import './oppInformation.scss';

const isHelpHidden = () => localStorage.getItem('isHelpHidden') === 'true';

export const OppInformation = ({ className, isOpen: defaultOpened }) => {
  const [isOpen, setOpen] = useState(defaultOpened);

  const { t } = useTranslation();

  useEffect(() => {
    !isHelpHidden() && setOpen(true);
  }, []);

  const toggleOpen = () => {
    localStorage.setItem('isHelpHidden', isOpen);
    setOpen(!isOpen);
  };

  return (
    <div className={classnames(Classes.DARK, className, 'opp-information')}>
      <Overlay
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        hasBackdrop
        usePortal
        onClose={toggleOpen}
        isOpen={isOpen}
        className="opp-information__overlay opp-information-overlay"
      >
        <div>
          <div className="opp-information-overlay__title">
            <h2>Information</h2>
            <Button
              icon={
                <Tooltip content={t('common.close')} position={Position.TOP_LEFT}>
                  <Icon icon="cross" iconSize="34" color="#fff" />
                </Tooltip>
              }
              onClick={toggleOpen}
            />
          </div>
          <div className="opp-information-overlay__content bp3-overlay-subcontent">
            <p>Put your information here</p>
          </div>
        </div>
      </Overlay>
      <Button className="opp-information__trigger" icon="info-sign" onClick={toggleOpen} />
    </div>
  );
};

OppInformation.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

OppInformation.defaultProps = {
  className: '',
  isOpen: false,
};

export default OppInformation;
