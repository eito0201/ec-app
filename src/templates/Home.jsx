import React from 'react';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { useSelector } from 'react-redux';

const Home = () => {
  // Store全体のstateを取得する
  const selector = useSelector(state => state);
  // Usersのuidを取得する
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID: {uid}</p>
      <p>ユーザー名: {username}</p>
    </div>
  );
};

export default Home;
