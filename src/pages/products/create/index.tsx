import React from 'react';

// import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createProduct, getProductById, updateProduct } from '../../../redux/reducers/product.ts';
import { CATEGORIES, SIZES } from '../../../utils/constants.ts';

const ProductCreateController = () => {

  const params = useParams();

  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector(state => state.product);
  const id = params.action;

  React.useEffect(() => {
    if (id && id !== 'create') {
      dispatch(getProductById(id)); // Fetch item for editing
    }

    return () => {
      dispatch({
        type: 'product/getProductById/fulfilled',
        payload: null
      });
    };
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').min(1, 'Price must be at least 1'),
    category: Yup.string().required('Category is required'),
    amount: Yup.number().required('Amount is required').min(1, 'Amount must be at least 1'),
    sizes: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one size is required')
      .required('Sizes are required')
  });

  const initialValues = product || {
    name: '',
    description: '',
    price: 0,
    category: '',
    amount: 0,
    sizes: []
  };

  const handleSubmit = async (values: any) => {
    let res;
    if (id === 'create') {
      res = await dispatch(createProduct(values));
      navigate('/products');
    } else {
      res = await dispatch(updateProduct({ id, ...values }));
      navigate('/products');
    }
    console.log(res);
  };

  return (
    <>
      <Breadcrumb pageName={`Product ${isNaN(Number(id)) ? 'Create' : 'Edit'} `} />

      <div className="flex flex-col gap-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Enable reinitialization for edit
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="p-4 space-y-4 w-full md:max-w-xl mx-auto bg-white shadow-md rounded-md">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className={`mt-1 block w-full p-2 border ${
                    errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  rows="4"
                  className={`mt-1 block w-full p-2 border ${
                    errors.description && touched.description
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded-md`}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Field
                  name="price"
                  type="number"
                  className={`mt-1 block w-full p-2 border ${
                    errors.price && touched.price ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {errors.price && touched.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Field
                  name="category"
                  as="select"
                  className={`mt-1 block w-full p-2 border ${
                    errors.category && touched.category ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CATEGORIES.map(item => <option value={item}>{item}</option>)}
                </Field>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <Field
                  name="amount"
                  type="number"
                  className={`mt-1 block w-full p-2 border ${
                    errors.amount && touched.amount ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {errors.amount && touched.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Sizes */}
              <div>
                <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <label key={size} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="sizes"
                        value={size}
                        checked={values.sizes.includes(size)}
                        onChange={async (e) => {
                          if (e.target.checked) {
                            await setFieldValue('sizes', [...values.sizes, size]);
                          } else {
                            await setFieldValue(
                              'sizes',
                              values.sizes.filter((s) => s !== size)
                            );
                          }
                        }}
                        className="h-4 w-4"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
                {errors.sizes && touched.sizes && (
                  <p className="text-red-500 text-sm mt-1">{errors.sizes}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {id === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProductCreateController;
