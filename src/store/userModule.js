/** VUEX user module**/
const fb = require("@/api/firebaseConfig.js");

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    wishlist: [],
    //currentOrder
    shoppingCart: [],
    address: null,
    payment: null,
    shipping: null,

    //history
    //only get orderHistory and use it to fill the other history arrays
    orderHistory: [],
    shoppingCartHistory: [],
    addressHistory: [],
    paymentHistory: [],
    price: 20

    //
  },
  // -----------------------------------------------------------------
  getters: {
    getShoppingCart: state => {
      return state.shoppingCart;
    },
    getAddress: state => {
      return state.address;
    },
    getAddressHistory: state => {
      return state.addressHistory;
    },
    getPayment: state => {
      return state.payment;
    },
    getShipping: state => {
      return state.shipping;
    },
    getShoppingCartCalulations: state => {
      let total = { amount: 0, price: 0, freeShipping: false };

      if (!state.shoppingCart.length) {
        return total;
      }

      let amount = state.shoppingCart.map(item => {
        return item.amount;
      });
      let totalAmount = amount.reduce((acc, cur) => {
        return acc + cur;
      });

      total.amount = totalAmount;
      total.price = totalAmount * state.price;
      total.freeShipping = totalAmount >= 3 ? true : false;

      return total;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    PRODUCT_setShoppingCart(state, cart) {
      //set the whole shopping cart
      state.shoppingCart = cart;
    },

    PRODUCT_addToShoppingCart(state, product) {
      //add product to shopping cart
      state.shoppingCart.push(product);
    },
    PRODUCT_deleteFromShoppingCart(state, index) {
      //add product to shopping cart
      state.shoppingCart.splice(index, 1);
    },
    PRODUCT_editShoppingCart(state, combinedProduct) {
      state.shoppingCart.splice(
        combinedProduct.index,
        1,
        combinedProduct.product
      );
    },
    USER_setCurrentOrder(state, data) {
      /*{type: info.id,data: info.data()}*/
      state[data.type] = data.data;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    INIT_userSaveLocal: ({ commit }) => {
      //check if there is a local save
      let localSave = JSON.parse(localStorage.getItem("shoppingCart"));
      if (!localSave) {
        //if it is not, return early
        return;
      }
      console.log("updated the cart from a local save");
      commit("PRODUCT_setShoppingCart", localSave);
    },

    PRODUCT_addToShoppingCart: ({ commit }, product) => {
      //TODOcheck if the color and size combination already exists, if so, add the amount to the existing product
      commit("PRODUCT_addToShoppingCart", product);
    },
    PRODUCT_deleteFromShoppingCart: ({ commit }, index) => {
      commit("PRODUCT_deleteFromShoppingCart", index);
    },
    PRODUCT_editShoppingCart: ({ commit }, combinedProduct) => {
      commit("PRODUCT_editShoppingCart", combinedProduct);
    },
    PRODUCT_saveShoppingCart: ({ state, rootState }) => {
      //save cart locally
      let cart = state.shoppingCart;
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      console.log("updated the local save");

      //check if the user is logged
      let user = rootState.authModule.currentUser;
      if (!user) {
        //if not, return early
        console.log("no user is logged in");
        return;
      }

      //update their cart remotly
      console.log("uploading user search");
      //uploads the search result to firebase
      // convert cart array into an object
      let objectToUpload = {};
      state.shoppingCart.forEach(entry => {
        objectToUpload[entry.timestamp] = entry;
      });
      //upload object
      fb.usersCollection
        .doc(user.uid)
        .collection("currentOrder")
        .doc("shoppingCart")
        .set(objectToUpload);
    },

    PRODUCT_saveCurrentData: ({ state, rootState }, dataType) => {
      //dont save address and payment info locally

      let user = rootState.authModule.currentUser;
      //at this point there shouldn't be an unauthenticated user but in case return early
      if (!user) {
        return;
      }
      //adds payment or address to firebase
      fb.usersCollection
        .doc(user.uid)
        .collection("currentOrder")
        .doc(dataType)
        .set(state[dataType]);
    },

    USER_getCurrentOrder: ({ commit }, user) => {
      //get all the available user data
      fb.usersCollection
        .doc(user.uid)
        .collection("currentOrder")
        .get()
        //get every doc in the currentOrder Collection
        .then(currentOrderInfo => {
          currentOrderInfo.forEach(info => {
            //check if there is content in the doc
            let emptyDoc = Object.entries(info.data()).length === 0;
            if (emptyDoc) {
              //if the doc is empty, return early
              return;
            }

            //set data to the store
            if (info.id === "shoppingCart") {
              // modify data for the shopping cart
              commit("USER_setCurrentOrder", {
                type: info.id,
                data: Object.values(info.data())
              });
              return;
            }
            commit("USER_setCurrentOrder", {
              type: info.id,
              data: info.data()
            });
          });
        });
    },

    USER_setCurrentData: ({ commit }, updatedData) => {
      /*{type: "address",data: updatedAdress}*/
      commit("USER_setCurrentOrder", updatedData);
    }

    //adds to an existing doc, even if it is empty but exists
    /*fb.usersCollection
        .doc(user.uid)
        .collection("currentOrder")
        .doc("shoppingCart")
        .update({
          timestamp2: { amount: "asdf2", size: "1" }
        });*/

    //update a nested field
    /*fb.usersCollection
        .doc(user.uid)
        .collection("currentOrder")
        .doc("shoppingCart")
        .update({
          "timestamp2.amount": "asdf"
        }); */

    //update a  field
    /*fb.usersCollection
          .doc(user.uid)
          .collection("currentOrder")
          .doc("address")
          .update({
            "street": "asdf"
          }); */

    //delete a shoppingCart entry
    /*  fb.usersCollection
        .doc(user.uid)
        .collection("currentOrder")
        .doc("shoppingCart")
        .update({
          timestamp1: fb.fieldValue.delete()
        });*/
  }
};
