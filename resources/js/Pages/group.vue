<template>
    <div id="group">
        <div id="group-header">
            <div class="row">
                <router-link to="/gruppen" class="round-btn secondary-background"><i class="fas fa-arrow-left"></i></router-link>
                <h1 style="margin-left: 2%" class="headline">{{ group.name }}</h1>
            </div>
            <div id="chat-selection">
                <router-link class="chat-link left" :class="generalIsCurrentChat()" :to="{ name: 'chat', params: { url: url, type: 'allgemein' }}">
                    Allgemein
                </router-link>
                <router-link class="chat-link right" :class="importantIsCurrentChat()" :to="{ name: 'chat', params: { url: url, type: 'wichtig' }}">
                    Wichtig
                </router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "group",
    props: {
        url: String
    },
    computed: {
        group() {
            return this.$store.getters.getGroup(this.url);
        }
    },
    methods: {
        generalIsCurrentChat() {
            if(this.$route.params.type==="allgemein") {
                return "chat-link-current";
            }
        },
        importantIsCurrentChat() {
            if(this.$route.params.type==="wichtig") {
                return "chat-link-current";
            }
        }
    }
}
</script>

<style scoped>
#group {
    display: flex;
    flex-direction: column;
    width: 100%;
}

#group-header {
    display: flex;
    flex-direction: column;
    box-shadow: 1px 0px 15px 3px rgba(92, 86, 86, 0.75);
    -webkit-box-shadow: 1px 0px 15px 3px rgba(92, 86, 86, 0.75);
    -moz-box-shadow: 1px 0px 15px 3px rgba(92, 86, 86, 0.75);
    padding: 2% 2% 0 2%;
}

#chat-selection {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.chat-link {
    width: 6em;
    text-align: center;
    font-size: 1.2rem;
    color: #707070;
    font-weight: 600;
    transition: 0.2s ease;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.chat-link:hover {
    color: #FFA88E;
}

.chat-link::after {
    content: '';
    width: 0;
    height: 4px;
    display: block;
    background-color: #FFA88E;
    transition: 0.2s ease;
}

.chat-link.left::after {
    margin-left: 100%;
}

.chat-link.right::after {
    margin-left: 0;
}

.chat-link-current {
    color: #FFA88E;
}

.chat-link-current.left::after {
    width: 100%;
    margin-left: 0;
}

.chat-link-current.right::after {
    width: 100%;
    margin-left: 0;
}

@media (max-width: 576px) {
    .row {
        display: none;
    }
}

</style>
