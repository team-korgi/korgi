<template>
    <div class="message" v-bind:class="changeAlignment()">
        <div class="sender" v-if="!isOwn">{{ message.message.user.username }}</div>
        <div class="subject">{{ message.message.subject }}</div>
        <div class="text">{{ message.message.text }}</div>
        <div>{{ message.message.readBy}}</div>
        <div class="row space-between">
            <div class="row flex-start" v-show="!isOwn">
                <p id="label">Gelesen</p>
                <input class="checkbox" type="checkbox" @click="sendReadConfirmation">
            </div>
            <div class="timetoken">{{
                    new Date(message.timetoken / 10000).toLocaleTimeString('de', {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }}
            </div>
        </div>
    </div>
</template>

<script>
import Label from "@/Jetstream/Label";
export default {
    name: "important-message",
    components: {Label},
    props: {
        message: Object
    },
    computed: {
        isOwn() {
            return this.message.publisher === this.$store.state.pubnub.getUUID()
        },
    },
    methods: {
        changeAlignment() {
            if (this.isOwn) {
                return 'right';
            }
        },
        sendReadConfirmation() {
            this.$store.commit("addMessageAction", {
                message: this.message
            })
        }
    }
}
</script>

<style scoped>
.message {
    width: 80%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    padding: 1%;
    margin: 0.5%;
    border-radius: 1rem;
    align-self: center;
}

.sender {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1%;
}

.subject {
    color: var(--warn);
    font-weight: bold;
}

.text {
}

.timetoken {
    align-self: flex-end;
    color: #707070;
    font-size: 0.8rem;
}

.right {
    background-color: #FFDBB1;
}

@media (max-width: 576px) {
    .message {
        padding: 2.5%;
    }
}
</style>
