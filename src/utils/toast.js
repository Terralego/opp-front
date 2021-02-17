import { Intent, Toaster } from '@blueprintjs/core';

const submitToaster = Toaster.create();

function displayToaster(elem, msgSuccess, msgError) {
  submitToaster.show({
    message: elem ? msgSuccess : msgError,
    intent: elem ? Intent.SUCCESS : Intent.DANGER,
  });
}

function displayError(msgError) {
  submitToaster.show({
    message: msgError,
    intent: Intent.DANGER,
  });
}

export const toast = {
  submitToaster,
  displayToaster,
  displayError,
};

export default { toast };
