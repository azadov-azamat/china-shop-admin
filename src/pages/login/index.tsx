'use client';

import React, { useState } from 'react';
import { BsTelegram } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';

export default function LoginController() {

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { auth } = useAppSelector(state => state.auth);
  const [isLoading] = useState(false);

  const userId = searchParams.get('userId');
  const token = searchParams.get('token');
  const expires = searchParams.get('expires');
  const telegramId = searchParams.get('telegramId');

  React.useLayoutEffect(() => {
    if (token && expires && userId && telegramId) {
      dispatch({
        type: 'auth/login/fulfilled',
        payload: { userId, expires, token },
        meta: {
          arg: telegramId
        }
      });
    }
  }, [userId, token, expires, telegramId]);

  React.useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <a href="https://t.me/chinashoptestbot?start=from-site-user"
           aria-disabled={isLoading}
           className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          {isLoading ? (
            <span className="animate-spin mr-2">
              <BsTelegram className="h-5 w-5" />
            </span>
          ) : (
            <BsTelegram className="mr-2 h-5 w-5" />
          )}
          {isLoading ? 'Authorizing...' : 'Login with Telegram'}
        </a>
      </div>
    </div>
  );
}

