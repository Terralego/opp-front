import React, { useState } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';

import DescriptionTab from '../SidebarTabsContent/DescriptionTab';
import InformationTab from '../SidebarTabsContent/InformationTab';

import './sidebar-tabs-nav.scss';
import '../SidebarTabsContent/sidebar-tabs-content.scss';

const TABS = 'Tabs__Sidebar';
const ID_DESCRIPTION_TAB = 'description_tab';
const ID_INFORMATION_TAB = 'information_tab';

export const SidebarTabsNav = () => {
  const [navTabId, setNavTabId] = useState(ID_INFORMATION_TAB);
  const { t } = useTranslation();

  return (
    <Tabs id={TABS} onChange={setNavTabId} selectedTabId={navTabId}>
      <Tab
        id={ID_INFORMATION_TAB}
        title={t('viewPoint.detail.information.title')}
        panel={<InformationTab />}
      />
      <Tab
        id={ID_DESCRIPTION_TAB}
        title={t('viewPoint.detail.description.title')}
        panel={<DescriptionTab />}
      />
    </Tabs>
  );
};

export default SidebarTabsNav;
