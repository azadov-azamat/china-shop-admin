import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useAppDispatch } from '../../redux/hooks.ts';
import { getUsers } from '../../redux/reducers/variable.ts';

import UsersTable from '../../components/tables/users.tsx';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

const UsersController = () => {

  const dispatch = useAppDispatch()
  const location = useLocation()
  const query = qs.parse(location.search, {ignoreQueryPrefix: true})

  React.useLayoutEffect(() => {
    if (location.search) {
      dispatch(getUsers({...query}))
    } else {
      dispatch(getUsers({}))
    }
  }, [location.search]);

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <UsersTable/>
      </div>
    </>
  );
};

export default UsersController;
