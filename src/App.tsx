import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import UsersController from './pages/users';
import LoginController from './pages/login';
import CommentsController from './pages/comments';
import ProductsController from './pages/products';

import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/scss/main.scss';
import ProductCreateController from './pages/products/create';
import { useAppSelector } from './redux/hooks.ts';
import Profile from './pages/Profile.tsx';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {auth} = useAppSelector(state => state.auth)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (auth) {
      if (pathname === '/login') {
        navigate('/');
      }
    } else {
      if (pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [auth, pathname]);

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
      path: '/profile',
      title: 'Profile | TailAdmin - Tailwind CSS Admin Dashboard Template',
      component: <Profile />
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
