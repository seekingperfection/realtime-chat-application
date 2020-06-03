<template>
<div class="main__block-ok">
    <span class="bold app-name">LETS CHAT</span>
    <div v-bind:class="{loggedOut: !loggedIn}" class="main__block-ok--bar">
        <div class="main__block-ok--logged">Logged as 
            <span class="bold">{{ name }}</span>
        </div>
        <font-awesome-icon icon="sign-out-alt" @click="signOut" class="main__block-ok--sign-out"/>
    </div>
</div>
</template>  
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    name: "Header",
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.loggedIn = true;
                this.dummyName = user.email;
                this.name = this.dummyName.substring(0, this.dummyName.lastIndexOf("@"));
            }
        })
    },
    data() {
        return {
            loggedIn: false,
            name: "",
            dummyName: ""
        }
    },
    methods:  {
        async signOut() {
            try {
                const data = await firebase.auth().signOut();
                this.loggedIn = false;
                console.log(data);
                this.$router.replace({name: "Home"});
            } catch(err) {
                alert("Something went wrong");
            }
        }
    }
}
</script>  
<style scoped lang="scss">
.main__block-ok {
    display: flex;
    justify-content: space-between;
    width: 100%;
    // padding: 20px 25px;
    height: 50px;
    align-items: center;
    z-index: 100;
    padding: 0 25px;

    .app-name {
        color: #ffffff;
    }

    &--bar {
        display: flex;
        flex-flow: row;
    }

    &--logged {
        font-weight: 100;
        font-size: 12px;
        margin-right: 10px;
        color: #ffffff;
    }

    &--sign-out {
        color: rgba(255, 255, 255, 0.5);
        transition-duration: 0.5s;
        cursor: pointer;
    }

    &--sign-out:hover {
        color: rgb(255, 255, 255);
    }
}

.loggedOut {
    display: none;
}
</style>