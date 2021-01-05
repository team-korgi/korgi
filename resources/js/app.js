require('./bootstrap');

import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import PubNub from 'pubnub'

import {InertiaApp} from '@inertiajs/inertia-vue';
import {InertiaForm} from 'laravel-jetstream';
import PortalVue from 'portal-vue';

import GroupView from './Pages/group-view'
import Events from './Pages/events'
import Settings from './Pages/settings'
import Group from './Pages/group'
import Chat from './Pages/chat'

Vue.mixin({methods: {route}});
Vue.use(InertiaApp);
Vue.use(InertiaForm);
Vue.use(PortalVue);
Vue.use(Vuex);
Vue.use(VueRouter);

const app = document.getElementById('app');

//TODO aus der Datenbank holen
//unnötig, sobald uui vom Server kommt
let uuid;

function getUUID() {
    if (!uuid) {
        uuid = generateUUID()
    }
    return uuid;
}

function generateUUID() {
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

function getUrlFromName(name) {
    return name.toLowerCase().replace(' ', '-');
}

function getMessagesFromLocalStorage(channel) {
    return JSON.parse(localStorage.getItem(channel)) || {};
}

function saveMessagesToLocalStorage(group, chat, channel) {
    localStorage.setItem(channel, JSON.stringify(store.getters.getChannel(group, chat).messages))
}

function getAllMissedMessagesFromPubNub() {
    Object.keys(store.state.groups).forEach(group => {
        Object.keys(store.state.groups[group].channels).forEach(chat => {
            let channel = store.getters.getChannel(group, chat)
            let messageValues = Object.values(channel.messages);
            if (messageValues.length > 0) {
                getMissedMessagesFromPubNub(group, chat, channel.uuid, messageValues[messageValues.length - 1].timetoken);
            }
        })
    })
}

let messages = [];

function getMissedMessagesFromPubNub(group, chat, channel, endTimetoken, startTimetoken) {
    store.state.pubnub.fetchMessages(
        {
            channels: [channel],
            start: startTimetoken,
            end: endTimetoken,
            count: 25 // default/max is 25
        },
        function (status, response) {
            let newMessages = Object.values(response.channels)[0];

            messages = messages.concat(newMessages);

            let currentTimetoken = newMessages[0].timetoken;

            if (currentTimetoken !== endTimetoken) {
                getMissedMessagesFromPubNub(group, chat, channel, endTimetoken, currentTimetoken);
                return
            }

            messages.sort((a, b) => {
                if (parseInt(a.timetoken) > parseInt(b.timetoken)) {
                    return 1;
                }
                if (parseInt(a.timetoken) < parseInt(b.timetoken)) {
                    return -1;
                }
                return 0;
            })

            messages.forEach(message => {
                Vue.set(store.state.groups[group].channels[chat].messages, message.timetoken, message);
            });

            saveMessagesToLocalStorage(group, chat, channel);
            messages = [];
        }
    )


    // store.state.pubnub.fetchMessages(
    //     {
    //         channels: [channel],
    //         start: startTimetoken,
    //         end: endTimetoken,
    //         count: 1 // default/max is 25
    //     },
    //     function (status, response) {
    //         let messages = Object.values(response.channels)[0];
    //         messages.forEach(message => {
    //             Vue.set(store.state.groups[group].channels[chat].messages, message.timetoken, message);
    //         });
    //         console.log(messages)
    //         console.log(messages[messages.length-1].timetoken);
    //         console.log(endTimetoken);
    //         let currentTimetoken = messages[messages.length-1].timetoken;
    //         if (currentTimetoken !== endTimetoken) {
    //             getMissedMessagesFromPubNub(group, chat, channel, endTimetoken, currentTimetoken)
    //         }
    //         saveMessagesToLocalStorage(group, chat, channel);
    //     }
    // )
}

//TODO aus der Datenbank holen
function getGroups() {
    return {
        "schmetterlinge": {
            name: "Schmetterlinge",
            url: "schmetterlinge",
            hasAdminPermissions: true,
            events: [],
            channels: {
                "allgemein": {
                    name: "Allgemein",
                    url: "allgemein",
                    uuid: "2532ef1c-4c1b-4a8a-8975-43149bca27e9",
                    messages: getMessagesFromLocalStorage("2532ef1c-4c1b-4a8a-8975-43149bca27e9")
                },
                "wichtig": {
                    name: "Wichtig",
                    url: "wichtig",
                    uuid: "091c147f-c2ca-4232-ade9-3c9fb242d2aa",
                    messages: getMessagesFromLocalStorage("091c147f-c2ca-4232-ade9-3c9fb242d2aa")
                }
            }
        },
        "raupen": {
            name: "Raupen",
            url: "raupen",
            hasAdminPermissions: false,
            events: [],
            channels: {
                "allgemein": {
                    name: "Allgemein",
                    url: "allgemein",
                    uuid: "78ac78a6-54bd-46b2-8b4c-be073717e94c",
                    messages: getMessagesFromLocalStorage("78ac78a6-54bd-46b2-8b4c-be073717e94c")
                },
                "wichtig": {
                    name: "Wichtig",
                    url: "wichtig",
                    uuid: "6c8716bb-84c2-47e5-83fd-d0c19fa61189",
                    messages: getMessagesFromLocalStorage("6c8716bb-84c2-47e5-83fd-d0c19fa61189")
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
        user: {
            username: getUsername(),
            uuid: getUUID(),
            settings: {
                darkmode: false
            }
        },
        groups: getGroups(),
        currentPage: "",
        showArrow: false
    },
    mutations: {
        setShowArrow(state, payload) {
            state.showArrow = payload.showArrow;
        },
        setCurrentPage(state, payload) {
            state.currentPage = payload.page;
        },
        toggleDarkmode(state) {
            state.user.settings.darkmode = !state.user.settings.darkmode;
        },
        addReadBy(state, payload) {
            Vue.set(state.groups[payload.group].channels[payload.chat].messages[payload.messageTimetoken].message.readBy, payload.user, payload.time);
            saveMessagesToLocalStorage()
        },
        addMessageAction(state, payload) {
            state.pubnub.addMessageAction(
                {
                    channel: payload.message.channel,
                    messageTimetoken: payload.message.timetoken,
                    action: {
                        type: 'readConfirm',
                        value: JSON.stringify({
                            user: state.user.username,
                            time: new Date(),
                            chat: payload.message.message.chat,
                            group: payload.message.message.group
                        }),
                    }
                }
            );
        },
        publishMessage(state, payload) {
            state.pubnub.publish(
                {
                    channel: payload.channel,
                    message: {
                        'text': payload.message,
                        'user': state.user,
                        'group': payload.group,
                        'chat': payload.chat,
                        'messageType': 'message'
                    }
                }
            );
        },
        publishImportantMessage(state, payload) {
            console.log(payload.subject);
            state.pubnub.publish(
                {
                    channel: payload.channel,
                    message: {
                        'text': payload.message,
                        'subject': payload.subject,
                        'user': state.user,
                        'group': payload.group,
                        'chat': payload.chat,
                        'readBy': {},
                        'messageType': 'importantMessage'
                    }
                }
            );
        },
        publishFile(state, payload) {
            state.pubnub.publish(
                {
                    channel: payload.channel,
                    message: {
                        'text': payload.message,
                        'fileName': payload.fileName,
                        'fileType': payload.fileType,
                        'user': state.user,
                        'group': payload.group,
                        'chat': payload.chat,
                        'url': payload.url,
                        'messageType': 'file'
                    }
                }
            );
        },
        publishEventAnnouncement(state, payload) {
            state.pubnub.publish(
                {
                    channel: payload.channel,
                    message: {
                        'text': payload.message,
                        'date': payload.date,
                        'user': state.user,
                        'group': payload.group,
                        'chat': payload.chat,
                        'messageType': 'eventAnnouncement'
                    }
                }
            );

            // Unnötig, wenn groups vom server kommen
            store.commit('addEvent', {
                subject: payload.message,
                date: payload.date,
                group: payload.group
            })
        },
        publishDateVoting(state, payload) {
            state.pubnub.publish(
                {
                    channel: payload.channel,
                    message: {
                        'text': payload.message,
                        'options': payload.dates,
                        'user': state.user,
                        'group': payload.group,
                        'chat': payload.chat,
                        'messageType': 'dateVoting'
                    }
                }
            );
        },
        addMessage(state, payload) {
            Vue.set(state.groups[payload.message.message.group].channels[payload.message.message.chat].messages, payload.message.timetoken, payload.message);
            saveMessagesToLocalStorage(payload.message.message.group, payload.message.message.chat, payload.message.channel)
        },
        addEvent(state, payload) {
            // TODO push to server

            let newEvent = {
                subject: payload.subject,
                date: payload.date
            }

            state.groups[payload.group].events.push(newEvent);
        },
        addGroup(state, payload) {
            // TODO push to server

            let newGroup = {
                name: payload.name,
                url: getUrlFromName(payload.name),
                hasAdminPermissions: true,
                events: [],
                channels: {
                    "allgemein": {
                        name: "Allgemein",
                        url: "allgemein",
                        uuid: generateUUID(),
                        messages: {}
                    },
                    "wichtig": {
                        name: "Wichtig",
                        url: "wichtig",
                        uuid: generateUUID(),
                        messages: {}
                    }
                }
            }

            Vue.set(state.groups, getUrlFromName(payload.name), newGroup)

            store.state.pubnub.subscribe({
                channels: store.getters.getAllChannelUuids,
                withPresence: true
            });
        }
    },
    getters: {
        getShowArrow: state => {
            return state.showArrow
        },
        getPage: state => {
            return state.currentPage
        },
        getUser: state => {
            return state.user;
        },
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
        },
        getEvents: state => {
            let events = [];

            Object.values(state.groups).forEach(group => {
                group.events.forEach(event => {
                    events.push(event);
                })
            })

            return events.sort((e1, e2) => {
                if (e1.date.getTime() > e2.date.getTime()) {
                    return 1
                }
                if (e1.date.getTime() === e2.date.getTime()) {
                    return 0
                }
                return -1;
            })
        }
    }
});

store.state.pubnub.addListener({
    message: function (event) {
        store.commit('addMessage', {
            message: event
        });
    },
    messageAction: function (event) {
        let data = JSON.parse(event.data.value);

        store.commit("addReadBy", {
            group: data.group,
            chat: data.chat,
            time: new Date(data.time),
            user: data.user,
            messageTimetoken: event.data.messageTimetoken
        })

        // TODO handle message action
        // var channelName = ma.channel; // The channel to which the message was published
        // var publisher = ma.publisher; //The Publisher
        // var event = ma.message.event; // message action added or removed
        // var type = ma.message.data.type; // message action type
        // var value = ma.message.data.value; // message action value
        // var messageTimetoken = ma.message.data.messageTimetoken; // The timetoken of the original message
        // var actionTimetoken = ma.message.data.actionTimetoken; // The timetoken of the message action
    },
});

store.state.pubnub.subscribe({
    channels: store.getters.getAllChannelUuids,
    withPresence: true
});

getAllMissedMessagesFromPubNub();

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
