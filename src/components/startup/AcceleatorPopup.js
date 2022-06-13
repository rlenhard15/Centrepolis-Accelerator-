import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { InputField } from '../common/InputField';
import { CustomButton } from '../common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import validate from '../../validationRules/createAccelerator';

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg';

function AcceleratorPopup(props) {
  const {
    handleClosePopup,
    handleCreateAccelerator,
    startupId,
    startupName,
  } = props;

  const formData = {
    startupName: startupName || '',
  };

  const {
    loading,
    request,
  } = useHttp();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(() => createAccelerator(), validate, formData);

  const createAccelerator = async () => {
    const name = values.name;

    const accelerator = await request('/api/accelerators', 'POST', { name });
    handleCreateAccelerator(accelerator);
    handleClosePopup();
  };

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">{startupId ? 'Update' : 'Create'} Accelerator</p>
          <button
            className="popup-close-btn"
            onClick={handleClosePopup}
          >
            <CloseIcon />
          </button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <InputField
              label="Accelerator Name"
              placeholder="Enter Accelerator name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              errorText={errors.name}
            />
            <CustomButton
              type="submit"
              label={'Create'}
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default AcceleratorPopup;
