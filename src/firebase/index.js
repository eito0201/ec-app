import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import { firebaseConfig } from './config';

// ./config.jsの設定に従ってfirebaseを初期化
firebase.initializeApp(firebaseConfig);
// 各モジュールを他ファイルから利用しやすいようにexportしておく
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
