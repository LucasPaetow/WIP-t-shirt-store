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
    },
    getGuestStatus: state => {
      return state.currentUser.isAnonymous;
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

            //set the user to the store
            fb.usersCollection
              .doc(userID)
              .set({
                name: signup.name,
                email: signup.email
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
            currentUser.sendEmailVerification().then(() => {
              console.log("email sent");
            });
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
            dispatch("userModule/USER_getShoppingData", null, {
              root: true
            });
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

    AUTH_guest: ({}) => {
      return (
        fb.auth
          //firebase auth call
          .signInAnonymously()
          .then(user => {
            //set the current user to the auth object
            commit("USER_setCurrent", user.user);

            let userID = user.user.uid;

            //set the user to the store
            fb.usersCollection
              .doc(userID)
              .set({
                name: null,
                email: null
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
            //return success for the local state handling
            return "successful guest signup";
          })
          .catch(error => {
            //or throw an error
            console.log(error);
            throw "There was a problem with the signup process. Please try again later";
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
      return fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("USER_setProfile", res.data());
        })
        .then(() => {
          return "got the user data successfully";
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
          //and go to the home page
          router.replace("/");
        })
        .catch(error => {
          console.log(error);
        });
    },

    AUTH_updateUserInfo: ({ commit, dispatch, state }, userInfo) => {
      //update user information
      let userID = state.currentUser.uid;

      return fb.usersCollection
        .doc(userID)
        .update({
          name: userInfo.name,
          email: userInfo.email
        })
        .then(() => {
          return "update successful";
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
