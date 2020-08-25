import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../reducks/users/operations';

const Login = () => {
  // ActionをStoreへ送る操作を取得する
  const dispatch = useDispatch();
  // Store内の全てのstateを取得する
  // const selector = useSelector(state => state);

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(signIn())}>ログインする</button>
    </div>
  );
};

export default Login;
