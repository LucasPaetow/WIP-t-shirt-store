/** VUEX auth module**/
const fb = require("@/api/firebaseConfig.js");
import router from "@/router/router.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    //store the user profile and the current user/firebase auth tokens
    currentUser: null,
    userProfile: null
  },
  // -----------------------------------------------------------------
  getters: {
    //return the information
    getUserProfile: state => {
      return state.userProfile;
    },
    getCurrentUser: state => {
      return state.currentUser;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    //set the current user to the payload/auth object
    USER_setCurrent(state, user) {
      state.currentUser = user;
    },
    //set the user profile to the retrieved user information
    USER_setProfile(state, user) {
      state.userProfile = user;
    },
    //clear both states to logout
    USER_logout(state) {
      state.userProfile = null;
      state.currentUser = null;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    AUTH_signup: ({ commit, dispatch }, signup) => {
      //stated as a return statement so the local dispatch can react to the return
      return (
        fb.auth
          //firebase auth call
          .createUserWithEmailAndPassword(signup.email, signup.password)
          .then(user => {
            //set the current user to the auth object
            commit("USER_setCurrent", user.user);

            let userID = user.user.uid;

            //retrieve the stored user data from the firestore
            fb.usersCollection
              .doc(userID)
              .set({
                name: signup.name,
                email: signup.email,
                orderHistory: {},
                searchHistory: []
              })
              .then(() => {
                //and pass it on as another action
                dispatch("USER_getProfile");
              })
              .catch(error => {
                console.log(error);
              });
          })
          .then(() => {
            //send email confirmation
            let currentUser = fb.firebase.auth().currentUser;
            currentUser.sendEmailVerification();
          })
          .then(() => {
            //return success for the local state handling
            return "successful signup";
          })
          .catch(error => {
            //or throw an error
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
              throw "Sadly, this email is already in use";
            } else {
              throw "There was a problem with the signup process. Please try again later";
            }
          })
      );
    },

    AUTH_login: ({ commit, dispatch }, login) => {
      //stated as a return statement so the local dispatch can react to the return
      return (
        fb.auth
          //firebase auth call
          .signInWithEmailAndPassword(login.email, login.password)
          .then(user => {
            //set current user and user profile
            commit("USER_setCurrent", user.user);
            dispatch("USER_getProfile");
          })
          .then(() => {
            //return success for the local state handling
            return "successful signup";
          })
          .catch(error => {
            console.log(error);
            if (error.code === "auth/user-not-found") {
              throw "Sadly, there is no user with this email adress.";
            } else if (error.code === "auth/wrong-password") {
              throw "Oh no, there was something wrong with your password. Please try again";
            } else {
              throw "There was a problem with the login process";
            }
          })
      );
    },

    AUTH_passwordForgotten: ({ commit, dispatch }, email) => {
      return fb.auth
        .sendPasswordResetEmail(email)
        .then(result => {
          console.log(result);
          return result;
        })
        .catch(error => {
          console.log(error);
          throw "Sadly, there is no user with this email adress.";
        });
    },

    AUTH_PageReload: ({ commit, dispatch }, user) => {
      //get the auth object on reloads and pass it to the store
      commit("USER_setCurrent", user);
      dispatch("USER_getProfile");
    },

    USER_getProfile: ({ commit, state }) => {
      //look up the firestore for the current user id and download the profile
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("USER_setProfile", res.data());
        })
        .catch(error => {
          console.log(error);
        });
    },

    USER_logout: ({ commit, dispatch }) => {
      //firebase logout call
      return fb.auth
        .signOut()
        .then(() => {
          //remove all stored user data
          commit("USER_logout");
          dispatch("productModule/API_deleteSearchResults", null, {
            root: true
          });
        })
        .then(() => {
          //and go to the home page
          router.replace("/");
        })
        .catch(error => {
          console.log(error);
        });
    },

    USER_uploadSearchResults: ({ state }, searchResult) => {
      console.log("uploading user search");
      //uploads the search result to firebase
      fb.usersCollection
        .doc(state.currentUser.uid)
        .collection("searches")
        .doc(searchResult.searchTerm)
        .set(searchResult, { merge: true });
      //and merges with any existing data
      //update the searchHistory entry as well

      fb.usersCollection.doc(state.currentUser.uid).update({
        searchHistory: fb.fieldValue.arrayUnion(searchResult.searchTerm)
      });
    },

    USER_uploadSearchHistory: ({ state, rootState }, searchResult) => {
      console.log("uploading user search hisory once");
      /*if the user signs in after at least one search there is a search hisory item, which will not get saved. So they have to be uploaded once*/
      const searchHistory = rootstate.productModule.allSearchResults;
      //if the user didnt search for anything before return early
      if (!searchHistory.length) {
        console.log(searchHistory.length);
        return;
      }
      //iterate over the searchHistory array and upload each entry
      searchHistory.map(searchEntry => {
        fb.usersCollection
          .doc(state.currentUser.uid)
          .collection("searches")
          .doc(searchEntry.searchTerm)
          .set(searchEntry, { merge: true });

        //update the searchHistory entry as well

        fb.usersCollection.doc(state.currentUser.uid).update({
          searchHistory: fb.fieldValue.arrayUnion(searchResult.searchTerm)
        });
      });
    },

    USER_restoreSearchResults_firebase: ({ state, rootState, dispatch }) => {
      console.log("restoring user search");

      //check if data is already available
      let searchAllHistory = rootState.productModule.allSearchResults.length;
      let searchCurrentHistory = rootState.productModule.currentSearchResult;

      //if there is data available return early
      if (searchAllHistory && searchCurrentHistory) {
        console.log("skipping restore, data already present");
        return;
      }

      //fetch user search data and sent it to the product module

      const firebaseStorageObject = {
        currentSearchResult: null,
        allSearchResults: []
      };

      fb.usersCollection
        .doc(state.currentUser.uid)
        .collection("searches")
        .orderBy("latestUpdate", "asc")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(searchTerm => {
            console.log(searchTerm.id);
            firebaseStorageObject.allSearchResults.unshift(searchTerm.data());
          });
        });
      dispatch(
        "productModule/API_restoreSearchResults_local",
        firebaseStorageObject,
        {
          root: true
        }
      );
    }
  }
};
