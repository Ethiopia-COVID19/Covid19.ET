// import { Auth } from "aws-amplify";
import axios from "axios";
import qs from "qs";

export const state = () => ({
  // this is the default state
  isAuthenticated: false,
  user: null,
  apiToken: null
});

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },
  setApiToken(state, token) {
    state.apiToken = token;
  }
};

export const actions = {
  //this mutates the user based on
  //Auth.currentAuthenticatedUser();
  async load({ commit }) {
    try {
      //check for currently loggedin user
      //   const user = await Auth.currentAuthenticatedUser();
      //   //then commit the rsult
      //   commit("set", user);
      //   return user;
    } catch (err) {
      //if err set current user null
      commit("set", null);
    }
  },

  async login({ commit }, { email, password }) {
    // const user = await Auth.signIn(email, password);
    // commit("set", user);
    // return user;
  },

  async logout({ commit }) {
    // await Auth.signOut();
    commit("set", null);
  },

  async getApiToken({ commit }) {
    let authUrl = process.env.AUTH_URL;
    let clientId = process.env.CLIENT_ID;
    let clientSecret = process.env.CLIENT_SECRET;
    const AUTHORIZATION_KEY = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    let data = qs.stringify({ grant_type: "client_credentials" });
    let headers = {
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Basic ${AUTHORIZATION_KEY}`
      }
    };

    await axios
      .post(authUrl, data, headers)
      .then(function(response) {
        commit("setApiToken", response.data.access_token);
      })
      .catch(function(error) {
        console.log(error);

        commit("setApiToken", null);
      });
  }
};
