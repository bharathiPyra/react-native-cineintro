import * as firebase from 'firebase/app';
// import 'firebase/performance';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAKDHIzSNRgFCY4cQU245ALtr8qG2Mbx2o',
//   authDomain: 'pyramidions-expo-starter.firebaseapp.com',
//   databaseURL: 'https://pyramidions-expo-starter.firebaseio.com',
  projectId: 'pyramidion-codebase',
  storageBucket: 'pyramidion-codebase.appspot.com',
  messagingSenderId: '48547493104',
  appId: '1:48547493104:android:65f9cff7afe18714e2be35',
};
export const Initialize = () => {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // const perf = firebase.performance();
  // console.log('Firebase performance', perf);
  // const perf = new Performance();
  // FPerformance();

  // const perf = firebase.performance();
  // const analytics = Analytics(app);
  // const analytics = firebase.analytics();
  // analytics.logEvent('login', { appName: 'hello there' });
  // analytics.setAnalyticsCollectionEnabled(true);
  // analytics.setUserId('Testing Analytics');
  // analytics.logEvent('page_view', { page_title: 'Main' });
  // firebase.performance();
};
