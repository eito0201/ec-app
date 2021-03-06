import { signInAction } from './actions';
import { push } from 'connected-react-router';
import { isValidEmailFormat, isValidRequiredInput } from '../../function/common';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = 'https://api.github.com/users/eito0201';
      const response = await fetch(url)
        .then(res => res.json())
        .catch(() => null);
      const username = response.login;

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: '00001',
          username: username,
        })
      );

      dispatch(push('/'));
    }
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async dispatch => {
    // バリデーションチェック
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です。');
      return false;
    }
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。');
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。');
      return false;
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。');
      return false;
    }

    return auth.createUserWithEmailAndPassword(email, password).then(result => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const userInitialData = {
          uid: uid,
          username: username,
          email: email,
          role: 'customer',
          created_at: timestamp,
          updated_at: timestamp,
        };

        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push('/'));
          });
      }
    });
  };
};
