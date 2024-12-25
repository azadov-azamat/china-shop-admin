import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
import Settings from './pages/Settings';
// import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import UsersController from './pages/users';
import LoginController from './pages/login';
import CommentsController from './pages/comments';
import ProductsController from './pages/products';

import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/scss/main.scss';
import ProductCreateController from './pages/products/create';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  const routes = [
    {
      path: '/',
      title: 'Users | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <UsersController />
    },
    {
      path: '/comments',
      title: 'Comments | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <CommentsController />
    },
    {
      path: '/products',
      title: 'Products | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <ProductsController />
    },
    {
      path: '/products/:action',
      title: 'Product | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <ProductCreateController />
    },
    {
      path: '/forms/form-elements',
      title: 'Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <FormElements />
    },
    {
      path: '/forms/form-layout',
      title: 'Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <FormLayout />
    },
    // { path: '/tables', title: 'tables | TailAdmin - Tailwind CSS Admin Dashboard Template', component: <Tables /> },
    {
      path: '/settings',
      title: 'Settings | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <Settings />
    },
    { path: '/chart', title: 'Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template', component: <Chart /> },
    { path: '/ui/alerts', title: 'Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template', component: <Alerts /> },
    {
      path: '/ui/buttons',
      title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <Buttons />
    },
    {
      path: '/auth/signin',
      title: 'Signin | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <SignIn />
    },
    {
      path: '/auth/signup',
      title: 'Signup | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <SignUp />
    }
  ];

  return (
    <Routes>
      <Route path="/login" element={<LoginController />} />
      <Route>
        {routes.map(({ path, title, component }) => (
          <Route
            key={path}
            path={path}
            element={
              <DefaultLayout>
                <PageTitle title={title} />
                {component}
              </DefaultLayout>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
