<template>
    <div id="group">
        <div id="group-content">
            <div id="group-header">
                <div class="row">
                    <div style="display:flex; flex-grow: 1; align-items: center">
                        <router-link to="/gruppen" class="round-btn secondary-background"><i class="fas fa-arrow-left"></i>
                        </router-link>
                        <h1 style="margin-left: 2%" class="headline">{{ group.name }}</h1>
                    </div>
                    <div class="btn primary-background" @click="toggleGroupInfo">Gruppeninfo</div>
                </div>
                <div id="chat-selection">
                    <router-link class="chat-link left" :class="generalIsCurrentChat()"
                                 :to="{ name: 'chat', params: { url: url, type: 'allgemein' }}">
                        Allgemein
                    </router-link>
                    <router-link class="chat-link right" :class="importantIsCurrentChat()"
                                 :to="{ name: 'chat', params: { url: url, type: 'wichtig' }}">
                        Wichtig
                    </router-link>
                </div>
            </div>
            <router-view/>
        </div>
        <group-info :bus="bus"/>
    </div>
</template>

<script>
import Navbar from "@/Pages/navbar";
import GroupInfo from "@/Pages/group-info";
import Vue from "vue"

export default {
    name: "group",
    components: {GroupInfo, Navbar},
    props: {
        url: String
    },
    data() {
        return {
            bus: new Vue()
        }
    },
    computed: {
        group() {
            return this.$store.getters.getGroup(this.url);
        }
    },
    methods: {
        toggleGroupInfo() {
            this.bus.$emit("toggleGroupInfo");
        },
        generalIsCurrentChat() {
            if (this.$route.params.type === "allgemein") {
                return "chat-link-current";
            }
        },
        importantIsCurrentChat() {
            if (this.$route.params.type === "wichtig") {
                return "chat-link-current";
            }
        }
    },
    created() {
        this.$store.commit("setCurrentPage", {page: this.group.name});
        this.$store.commit("setShowArrow", {showArrow: true});
    },
}
</script>

<style scoped>
#group {
    display: flex;
    flex-direction: row;
    width: 100%;
}

#group-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

#group-header {
    display: flex;
    flex-direction: column;
    box-shadow: 1px 0px 8px 3px rgba(92, 86, 86, 0.3);
    -webkit-box-shadow: 1px 0px 8px 3px rgba(92, 86, 86, 0.3);
    -moz-box-shadow: 1px 0px 8px 3px rgba(92, 86, 86, 0.3);
    padding: 2% 2% 0 2%;
    z-index: 30;
    background-color: var(--background-color);
}

.btn {
    flex-grow: 0 !important;
    width: fit-content;
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
    color: var(--font-color-light);
    font-weight: 600;
    transition: 0.2s ease;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

    #group {
        height: calc(100vh - 20vw);
    }
}

</style>
