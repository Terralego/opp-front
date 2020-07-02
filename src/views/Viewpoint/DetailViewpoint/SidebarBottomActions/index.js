import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup,
} from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';

import DownloadButton from '../../../../components/DownloadButton';
import { connectViewpointProvider } from '../../context';

import './sidebar-actions.scss';

export const SidebarActions = ({ viewpoint: { id, label } = {} }) => {
  const { t } = useTranslation();
  return (
    <Navbar className="sibebarActions">
      <NavbarGroup className="navTop__viewpoint-detail" align={Alignment.CENTER}>
        <DownloadButton
          as={Button}
          endpoint={`viewpoints/${id}/pdf`}
          filename={`${label}.pdf`}
          size={25}
          className={Classes.MINIMAL}
          icon="document"
        >
          {t('viewPoint.detail.download.PDF')}
        </DownloadButton>
        <DownloadButton
          as={Button}
          endpoint={`viewpoints/${id}/zip-pictures/`}
          filename={`${label}.zip`}
          size={25}
          className={Classes.MINIMAL}
          icon="cloud-download"
        >
          {t('viewPoint.detail.download.photos')}
        </DownloadButton>
      </NavbarGroup>
    </Navbar>
  );
};

export default connectViewpointProvider('viewpoint')(SidebarActions);
