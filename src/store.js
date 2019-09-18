import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routeArray: [],
    },
    getters: {
        getRouteArray(state) {
            return state.routeArray;
        },
        getRoute: (state) => (path) => {
            for (let i = 0; i < state.routeArray.length; i++) {
                if (state.routeArray[i].path == path) {
                    return state.routeArray[i];
                }
            }

        }
    },

    mutations: {
        SET_DROPBOX_DATA(state, item) {
            state.routeArray.push(item)

        },
        ADD_TEMPORARY_LINK(state, item) {

            for (let i = 0; i < state.routeArray.length; i++) {
                let routes = state.routeArray[i].data;
                for (let j = 0; i < routes.length; i++) {
                    if (routes[i].path_lower == item.path) {
                        routes[i].link = item.link;
                    }
                }

            }
        },
        ADD_ROUTE(state, route) {
            state.routeArray[state.routeArray.length] = route;
        }
    },
    actions: {
        setDropboxData(context, path) {
            var Dropbox = require("dropbox").Dropbox;
            let ACCESS_TOKEN =
                "Gec_gkL8oEAAAAAAAAAAVkT645DyRB8V7IiMzsXAs8yL4-vgRUa67Fe6KegNzBsl";
            var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

            dbx
                .usersGetCurrentAccount()
                .then(function(response) {
                    //
                })
                .catch(function(error) {
                    console.error(error);
                });
            dbx
                .filesListFolder({ path: path.toLowerCase() })
                .then(function(response) {
                    context.commit("SET_DROPBOX_DATA", {
                        path: path,
                        data: response.entries
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        },
        addTemporaryLink(context, entry) {
            var Dropbox = require("dropbox").Dropbox;
            let ACCESS_TOKEN =
                "Gec_gkL8oEAAAAAAAAAAVkT645DyRB8V7IiMzsXAs8yL4-vgRUa67Fe6KegNzBsl";
            var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
            dbx
                .filesGetTemporaryLink({ path: entry.path_lower })
                .then(function(response) {
                    window.open(response.link);
                    context.commit("ADD_TEMPORARY_LINK", {
                        path: entry.path_lower,
                        link: response.link
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    }
})