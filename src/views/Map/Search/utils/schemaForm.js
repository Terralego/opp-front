import { TYPE_MANY, TYPE_RANGE, TYPE_SINGLE } from '@terralego/core/modules/Forms/Filters';

export const getSchema = ({ i18n: { language }, t }) => [
  {
    name: 'cities',
    property: 'city',
    label: t('form.fields.cities'),
    type: TYPE_SINGLE,
  },
  {
    name: 'themes',
    property: 'themes',
    label: t('form.fields.themes'),
    type: TYPE_MANY,
    placeholder: t('form.fields.themesPlaceholder'),
    display: 'select',
  },
  {
    name: 'date',
    property: 'viewpointDate',
    label: t('form.fields.date'),
    format: 'date',
    shortcuts: false,
    allowSingleDayRange: true,
    singleMonthOnly: true,
    formatDate: date => date.toLocaleDateString(language),
    startInputProps: {
      placeholder: t('form.fields.datePlaceholder'),
      className: 'input-range input-range--start',
    },
    endInputProps: {
      placeholder: t('form.fields.datePlaceholder'),
      className: 'input-range input-range--end',
    },
    type: TYPE_RANGE,
  },
  {
    name: 'keywords',
    property: 'properties__keywords',
    label: t('form.fields.keywords'),
    type: TYPE_SINGLE,
    placeholder: t('form.fields.filtersPlaceholder'),
    display: 'select',
  },
  {
    name: 'typology',
    property: 'typology',
    label: t('form.fields.typology'),
    type: TYPE_SINGLE,
    placeholder: t('form.fields.filtersPlaceholder'),
    display: 'select',
  },
  {
    name: 'photographers',
    property: 'photographer',
    label: t('form.fields.photographers'),
    type: TYPE_SINGLE,
  },
  {
    name: 'label',
    property: 'search',
    label: t('form.fields.label'),
    type: TYPE_SINGLE,
  },
  {
    name: 'pictures__id',
    property: 'pictures__id',
    label: t('form.fields.id'),
    type: TYPE_SINGLE,
  },
];

export default { getSchema };
