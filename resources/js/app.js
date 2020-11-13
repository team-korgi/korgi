require('./bootstrap');

import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import PubNub from 'pubnub'

import { InertiaApp } from '@inertiajs/inertia-vue';
import { InertiaForm } from 'laravel-jetstream';
import PortalVue from 'portal-vue';

import GroupView from './Pages/group-view'
import Events from './Pages/events'
import Settings from './Pages/settings'
import Group from './Pages/group'
import Chat from './Pages/chat'

Vue.mixin({ methods: { route } });
Vue.use(InertiaApp);
Vue.use(InertiaForm);
Vue.use(PortalVue);
Vue.use(Vuex);
Vue.use(VueRouter);

const app = document.getElementById('app');

//TODO aus der Datenbank holen
function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//TODO aus der Datenbank holen
function getPublishKey() {
    return 'pub-c-3b6e9ed9-1191-4e64-a5b8-c835f42b776f';
}

//TODO aus der Datenbank holen
function getSubscribeKey() {
    return 'sub-c-d87417d8-157a-11eb-a3e5-1aef4acbe547';
}

//TODO aus der Datenbank holen
function getUsername() {
    return "Alex";
}

//TODO aus der Datenbank holen
function getGroups() {
    return {
        "gruppe-1": {
            name: "Gruppe 1",
            url: "gruppe-1",
            admins: [],
            channels: {
                "allgemein": {
                    name: "Allgemein",
                    url: "allgemein",
                    uuid: "2532ef1c-4c1b-4a8a-8975-43149bca27e9",
                    messages: {}
                },
                "wichtig": {
                    name: "Wichtig",
                    url: "wichtig",
                    uuid: "091c147f-c2ca-4232-ade9-3c9fb242d2aa",
                    messages: {}
                }
            }
        },
        "gruppe-2": {
            name: "Gruppe 2",
            url: "gruppe-2",
            admins: [],
            channels: {
                "allgemein": {
                    name: "Allgemein",
                    url: "allgemein",
                    uuid: "78ac78a6-54bd-46b2-8b4c-be073717e94c",
                    messages: {}
                },
                "wichtig": {
                    name: "Wichtig",
                    url: "wichtig",
                    uuid: "6c8716bb-84c2-47e5-83fd-d0c19fa61189",
                    messages: {}
                }
            }
        },
    };
}

const store = new Vuex.Store({
    state: {
        pubnub: new PubNub({
            publishKey: getPublishKey(),
            subscribeKey: getSubscribeKey(),
            uuid: getUUID()
        }),
        user: getUsername(),
        groups: getGroups()
    },
    mutations: {
        publish(state, payload) {
            state.pubnub.publish(
                {
                    channel: payload.channel,
                    message: {
                        'text': payload.message,
                        'user': state.user,
                        'group': payload.group,
                        'chat': payload.chat
                    }
                }
            );
        },
        addMessage(state, payload) {
            Vue.set(state.groups[payload.message.message.group].channels[payload.message.message.chat].messages, payload.message.timetoken, payload.message);
        }
    },
    getters: {
        getGroups: state => {
            return state.groups;
        },
        getGroup: state => group => {
            return state.groups[group];
        },
        getChannels: state => group => {
            return state.groups[group].channels;
        },
        getChannel: state => (group, channel) => {
            return state.groups[group].channels[channel];
        },
        getAllChannelUuids: state => {
            let r = [];

            Object.keys(state.groups).forEach(groupKey => {
                Object.keys(state.groups[groupKey].channels).forEach(channelKey => {
                    r.push(state.groups[groupKey].channels[channelKey].uuid);
                });
            });

            return r;
        }
    }
});

store.state.pubnub.addListener({
    message: function (event) {
        store.commit('addMessage', {
            message: event
        });
    }
});

store.state.pubnub.subscribe({
    channels: store.getters.getAllChannelUuids,
    withPresence: true
});

const routes = [
    {
        path: '/',
        redirect: '/gruppen'
    }, {
        path: '/gruppen',
        name: 'groups',
        component: GroupView,
    }, {
        path: '/gruppen/:url/',
        name: 'group',
        component: Group,
        props: true,
        children: [
            {
                name: 'chat',
                path: ':type',
                component: Chat,
                props: true
            }
        ]
    }, {
        path: '/termine',
        component: Events
    }, {
        path: '/einstellungen',
        component: Settings
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    store,
    router,
    render: (h) =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                resolveComponent: (name) => require(`./Pages/${name}`).default,
            },
        }),
}).$mount(app);
