import React from 'react';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useAppDispatch } from '../../redux/hooks.ts';

import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { getProducts } from '../../redux/reducers/product.ts';
import ProductsTable from '../../components/tables/products.tsx';

const ProductsController = () => {

  const location = useLocation();
  const naviate = useNavigate();
  const dispatch = useAppDispatch();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  React.useLayoutEffect(() => {
    if (location.search) {
      dispatch(getProducts({ ...query }));
    } else {
      dispatch(getProducts({}));
    }
  }, [location.search]);

  return (
    <>
      <Breadcrumb pageName="Products" />
      <div>
        <button className={'text-primary'} onClick={() => naviate('/products/create')}>
          +
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <ProductsTable />
      </div>
    </>
  );
};

export default ProductsController;
