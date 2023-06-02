window.onload = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAkV8lUovkLmrAaK9Kj-vKHN7jpx0rjA8U",
    authDomain: "k-lab-rwm.firebaseapp.com",
    databaseURL: "https://k-lab-rwm-default-rtdb.firebaseio.com",
    projectId: "k-lab-rwm",
    storageBucket: "k-lab-rwm.appspot.com",
    messagingSenderId: "575312651295",
    appId: "1:575312651295:web:11a43bd9e4d0e4f65c212a",
    measurementId: "G-XS7JCQSRQ9",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
};

const getUser = async (userID) => {
        const dbRef = firebase.database().ref("users");
        try {
          const snapshot = await dbRef.child(userID).get();
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
            return null; // or any default value you prefer
          }
        } catch (error) {
          console.error(error);
          throw error; // rethrow the error to handle it outside the function
        }
      };

const getBook = async (bookID) => {
    const dbRef = firebase.database().ref("books");
    try {
        const snapshot = await dbRef.child(bookID).get();
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        return null; // or any default value you prefer
          }
        } catch (error) {
          console.error(error);
          throw error; // rethrow the error to handle it outside the function
        }
      };

const updateUser = async (userID, newData) => {
  try {
    const dbRef = firebase.database().ref("users").child(userID);
    await dbRef.update(newData);
    console.log("User updated successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const countUser = async () => {
  const dbRef = firebase.database().ref("users");
  try {
    const snapshot = await dbRef.once("value");
    const userCount = snapshot.numChildren();
    return userCount;
  } catch (error) {
    console.error(error);
    throw error; // rethrow the error to handle it outside the function
  }
};

const addUser = async (userID, newData) => {
  user_num = await countUser();
  newData = {
    current_book: "-1", // Update current book
    read_book: { "-1": "-1" },
    badge_list: { "-1": "-1" },
    user_id: "u" + user_num,
  };
  try {
    const dbRef = firebase.database().ref("users").child(userID);
    await dbRef.update(newData);
    console.log("User updated successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const login = async (userID) => {
  user_status = await getUser(userID);

  if (user_status == null) {
    await addUser(userID);
    return await getUser(userID);
  } else {
    return user_status;
  }
};

const updateBook = async (bookID, newData) => {
  try {
    const dbRef = firebase.database().ref("books").child(bookID);
    await dbRef.update(newData);
    console.log("Book updated successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllBook = async () => {
  const dbRef = firebase.database().ref("books");
  try {
    const snapshot = await dbRef.get();
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null; // or any default value you prefer
    }
  } catch (error) {
    console.error(error);
    throw error; // rethrow the error to handle it outside the function
  }
};

const getRandomBook = async (bookNum) => {
  books = await getAllBook();
  books_keys = Object.keys(books);
  books_keys.sort(function () {
    return Math.round(Math.random()) - 0.5;
  });

  book_list = {};
  for (let i = 0; i < bookNum; i++) {
    book_list[books_keys[i]] = books[books_keys[i]];
  }

  return book_list;
};
