import Vue from "vue";
import Vuex from "vuex";
import {articles} from "../utils/mocks/articles";
import {categories} from "../utils/mocks/categories";
import {createApi} from "../api/api";
import {ApiRoutes} from "../utils/constants";

const api = createApi();

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: {
    homeContent: {},
    sideContent: {},
    aboutContent: {},
    events: [],
    form: {},
  },
  mutations: {
    SET_HOME_CONTENT(state, payload) {
      state.homeContent = payload;
    },
    SET_SIDE_CONTENT(state, payload) {
      state.sideContent = payload;
    },
    SET_ABOUT_CONTENT(state, payload) {
      state.aboutContent = payload;
    },
    SET_EVENTS(state, payload) {
      state.events = payload;
    },
    SET_FORM(state, payload) {
      state.form = payload;
    }
  },
  actions: {
    GET_HOME_DATA({commit}) {
      if (Object.keys(this.state.homeContent).length === 0) {
        api.get(ApiRoutes.GET_MAIN_CONTENT)
        .then(({data}) => {
          commit('SET_HOME_CONTENT', data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    GET_ABOUT_DATA({commit}) {
      if (Object.keys(this.state.aboutContent).length === 0) {
        api.get(ApiRoutes.GET_ABOUT_US)
        .then(({data}) => {
          commit('SET_ABOUT_CONTENT', data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    GET_SIDE_DATA({commit}) {
      if (Object.keys(this.state.sideContent).length === 0) {      
        api.get(ApiRoutes.GET_SIDE_CONTENT)
        .then(({data}) => {
          commit('SET_SIDE_CONTENT', data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    GET_EVENTS_DATA({commit}) {
      if (this.state.events.length === 0) {
        api.get(ApiRoutes.GET_EVENTS)
        .then(({data}) => {
          commit('SET_EVENTS', data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    GET_FORM_DATA({commit}) {
      if (Object.keys(this.state.form).length === 0) {
        api.get(ApiRoutes.GET_FORM)
        .then(({data}) => {
          commit('SET_FORM', data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    SEND_FORM_DATA({commit}, {type, date, victims, additionalData}) {
      let payload = new FormData();
      payload.append("type", type);
      payload.append("date", date);
      payload.append("victims", victims);

      switch (true) {
        case type==="acid_rain":
          payload.append("acid_power", additionalData.acid_power);
        break;
        case type==="hurricane":
          payload.append("wind_speed", additionalData.wind_speed);
        break;
        case type==="earthquake":
          payload.append("earthquake_power", additionalData.earthquake_power);
        break;
      }

      console.log(payload);

      new api.post(ApiRoutes.ADD_EVENT, payload)
      .then((res) => {
      })
      .catch((err) => console.log(err));
    }
  },
  modules: {},
  getters: {
    GET_HOME_DATA: state => state.homeContent,
    GET_SIDE_DATA: state => state.sideContent,
    GET_ABOUT_US_DATA: state => state.aboutContent,
    GET_EVENTS_DATA: state => state.events,
    GET_FORM_DATA: state => state.form,
  }
})
