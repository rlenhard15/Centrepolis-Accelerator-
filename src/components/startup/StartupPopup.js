import React, { useEffect, useRef, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { InputField } from '../common/InputField';
import CustomSelect from '../common/Select';
import { CustomButton } from '../common/Button';

import useHttp from '../../hooks/useHttp.hook';
import useForm from '../../hooks/useForm.hook';
import { useAuthContext } from '../../utils/context';
import validate from '../../validationRules/createStartup';

import { ReactComponent as CloseIcon } from '../../images/icons/close-icon.svg';

function StartupPopup(props) {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentAdmins, setCurrentAdmins] = useState([]);

  const {
    handleClosePopup,
    handleCreateStartup,
    startupId,
    startupName,
  } = props;

  const formData = {
    startupName: startupName || '',
  };

  const { isSuperAdmin } = useAuthContext();
  const observer = useRef();

  const {
    loading,
    request,
  } = useHttp();
  const {
    loading: startupLoading,
    request: startupRequest,
  } = useHttp();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(() => createStartup(), validate, formData);

  useEffect(() => {
    if (startupId) {
      getInitStartupData();
    }
  }, []);

  useEffect(() => {
    if (isSuperAdmin) {
      fetchAdmins();
    }
  }, [currentPage]);

  async function getInitStartupData() {
    const { admins } = await startupRequest(`api/startups/${startupId}`);
    setCurrentAdmins(admins.map(admin => ({
      value: admin.id,
      label: `${admin.first_name} ${admin.last_name}`,
    })));
  }

  async function fetchAdmins() {
    const response = await request(`api/admins?page=${currentPage}`);
    setTotalPage(response.total_pages);
    setAdmins(admins => admins.concat(response.admins));
  }

  const createStartup = async () => {
    const startup = isSuperAdmin
      ? {
        name: values.startupName,
        admins_startups_attributes: currentAdmins.map(({ value }) => ({ admin_id: value })),
      } : { name: values.startupName };

    if (startupId) {
      const updatedStartup = await request(`api/startups/${startupId}`, 'PUT', { startup });
      handleCreateStartup(updatedStartup);
    } else {
      const newStartup = await request('api/startups', 'POST', { startup });
      handleCreateStartup(newStartup);
    }

    handleClosePopup();
  };

  const handleChangeSelect = e => {
    setCurrentAdmins(e);
  };

  const ref = node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && totalPage > currentPage) {
        setCurrentPage(page => page + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  const adminOptions = admins
    .map((admin, i) => ({
      value: admin.id,
      label:
  <div ref={i + 1 === admins.length ? ref : null}>
    {admin.first_name} {admin.last_name}
  </div>,
    }));

  return (
    <div className="popup">
      <ClickAwayListener onClickAway={handleClosePopup}>
        <div className="popup-content invite-popup">
          <p className="popup-content-title">{startupId ? 'Update' : 'Create'} Startup</p>
          <button
            className="popup-close-btn"
            onClick={handleClosePopup}
          >
            <CloseIcon />
          </button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <InputField
              label="Startup Name"
              placeholder="Enter startup name"
              name="startupName"
              value={values.startupName}
              onChange={handleChange}
              error={errors.startupName}
              errorText={errors.startupNameMessage}
            />
            {isSuperAdmin && (
              <CustomSelect
                label="Assigned User"
                isDisabled={adminOptions.length === 0 || startupLoading}
                options={adminOptions}
                placeholder="List of admins"
                value={currentAdmins}
                onChange={handleChangeSelect}
                maxMenuHeight={180}
                isMulti
              />
            )}
            <CustomButton
              type="submit"
              label={startupId ? 'Save' : 'Create'}
              disabled={loading}
            />
          </form>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default StartupPopup;
