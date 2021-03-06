import firebase from 'firebase';
import moment from 'moment';

let app = firebase.initializeApp({
  apiKey: "AIzaSyCK_Smeiux1tNAOg18LL6DyvzKMZ8bLwGk",
  authDomain: "mooda-f6e38.firebaseapp.com",
  databaseURL: "https://mooda-f6e38.firebaseio.com",
  projectId: "mooda-f6e38",
  storageBucket: "mooda-f6e38.appspot.com",
  messagingSenderId: "997876679312"
});
let db = app.database();

export default {
  googleLogin() {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => {
      console.log(r.user.displayName, 'login success');

      return {
        userName: r.user.displayName,
        uid: r.user.uid,
        email: r.user.email
      }
    }).catch(e => {
      console.log(e.message)
    })
  },

  googleLogout() {
    return firebase.auth().signOut().then(() => {
      console.log('logout success');
      return true;
    }).catch(e => {
      console.log(e.message)
    });
  },

  fetchEmoji : fetchEmoji,

  createEmoji({uid, emoji, comment = '', date}) {
    if (!emoji || !uid || !date)
      throw 'Illegal Parameter';
    assertIsInstanceOfDate(date);
    // console.log('fetchEmoji dd',this);

    return fetchEmoji({uid, date})
      .then(r => {
        if (r)
          throw 'Already Exist Emoji';
        date = moment(date).format('YYYYMMDD');
        return db.ref(`daily/${uid}/${date}`).set({
          comment, emoji
        });
      }).then(() => {
        return true;
      });
  },

  updateEmoji({uid, comment = '', emoji, date}) {
    assertIsInstanceOfDate(date);
    assertIsToday(date);

    date = moment(date).format('YYYYMMDD');
    return db.ref(`daily/${uid}/${date}`).set({
      comment, emoji
    });
  },

  deleteEmoji({uid, date}) {
    assertIsInstanceOfDate(date);
    assertIsToday(date);

    date = moment(date).format('YYYYMMDD');
    return db.ref(`daily/${uid}/${date}`).remove().then(() => {
      return true;
    });
  },

  fetchEmojis({uid, baseDate, range}) {
    assertIsInstanceOfDate(baseDate);

    baseDate = moment(baseDate).format('YYYYMMDD');
    return db.ref(`daily/${uid}`).orderByKey().endAt(baseDate).limitToLast(range).once('value')
      .then(r => {
        console.log(r.val());
        return r.val();
      })
      .then(r => {
        return Object.keys(r).map(key => {
          let item = {};
          item.date = key;
          Object.assign(item, r[key]);
          item.emojiSrc = getEmojiImage(item.emoji);
          item.matchingColor =  getMatchingColor(item.emoji);
          return item
        });
      })
  }
}

function fetchEmoji({uid, date}) {
  assertIsInstanceOfDate(date);
  date = moment(date).format('YYYYMMDD');
  return db.ref(`daily/${uid}/${date}`).once('value')
    .then(r => {
      return r.val()
    });
}

function assertIsInstanceOfDate(date) {
  if (!(date instanceof Date))
    throw 'Invalid Date';
}

function assertIsToday(date) {
  if (moment(date).format('YYYYMMDD') != moment().format('YYYYMMDD'))
    throw 'Not Today';
}
function getEmojiImage(emoji) {
  if (emoji == 4) {
    return require('../assets/img/happy.png');
  }
  else if (emoji == 3) {
    return require('../assets/img/sulky.png');
  }
  else if (emoji == 2) {
    return require('../assets/img/naughty.png');
  }
  else if (emoji == 1) {
    return require('../assets/img/hungry.png');
  }
  else
    return '';
}

function getMatchingColor(emoji) {
  if (emoji == 4) {
    return 'happy';
  }
  else if (emoji == 3) {
    return 'sulky';
  }
  else if (emoji == 2) {
    return 'naughty';
  }
  else if (emoji == 1) {
    return 'hungry';
  }
  else
    return '';
}

