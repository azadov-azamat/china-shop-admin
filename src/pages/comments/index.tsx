import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useAppDispatch } from '../../redux/hooks.ts';

import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { getComments } from '../../redux/reducers/comment.ts';
import CommentsTable from '../../components/tables/comments.tsx';

const CommentsController = () => {

  const dispatch = useAppDispatch()
  const location = useLocation()
  const query = qs.parse(location.search, {ignoreQueryPrefix: true})

  React.useLayoutEffect(() => {
    if (location.search) {
      dispatch(getComments({...query}))
    } else {
      dispatch(getComments({}))
    }
  }, [location.search]);

  return (
    <>
      <Breadcrumb pageName="Comments" />

      <div className="flex flex-col gap-10">
        <CommentsTable/>
      </div>
    </>
  );
};

export default CommentsController;
