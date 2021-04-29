import React from 'react';
import { Button, Toaster, Intent, FormGroup, InputGroup } from '@blueprintjs/core';
import { Form, Field as FFField } from 'react-final-form';
import Api from '@terralego/core/modules/Api';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';

const Field = ({ label, required, ...props }) => {
  const { t } = useTranslation();
  return (
    <FFField
      {...props}
      validate={v => (!required || v ? null : t('auth.resetform.errorRequired'))}
      render={({ input, meta }) => (
        <FormGroup
          label={label}
          helperText={meta.touched && meta.error}
          intent={meta.touched && meta.error ? Intent.DANGER : Intent.PRIMARY}
        >
          <InputGroup {...input} />
        </FormGroup>
      )}
    />
  );
};

const PasswordResetForm = ({ id, token }) => {
  const toasterRef = React.useRef(null);
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = async ({ password, password2 }) => {
    try {
      await Api.request(`accounts/change-password/reset/${id}/${token}/`, {
        method: 'post',
        body: {
          new_password1: password,
          new_password2: password2,
        },
      });
      toasterRef.current.show({
        message: t('auth.resetform.submitSuccess'),
        intent: Intent.SUCCESS,
      });
      history.push('/');
    } catch (e) {
      toasterRef.current.show({
        message: t('auth.resetform.submitError'),
        intent: Intent.DANGER,
      });
    }
  };

  const validate = ({ password = '', password2 = '' }) => {
    const errors = {};

    if (password && password.length < 8) {
      errors.password = t('auth.resetform.password.errorShort');
    }
    if (password !== password2) {
      errors.password2 = t('auth.resetform.password2.errorDiff');
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>{t('auth.resetform.title')}</h2>
          <fieldset className="profile-form__fieldset">
            <Field
              name="password"
              label={t('auth.resetform.password.label')}
              type="password"
              required
            />
            <Field
              name="password2"
              label={t('auth.resetform.password2.label')}
              type="password"
              required
            />
          </fieldset>
          <fieldset className="profile-form__fieldset">
            <Link to="/" style={{ marginRight: '5px' }}>
              {t('auth.resetform.back')}
            </Link>
            <Button type="submit" disabled={pristine || invalid}>
              {t('auth.resetform.submit')}
            </Button>
          </fieldset>
          <Toaster className="profile-form__toaster" ref={toasterRef} canEscapeKeyClear />
        </form>
      )}
    />
  );
};

export default PasswordResetForm;
