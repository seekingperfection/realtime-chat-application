<template>
<div class="main__block position-relative">
    <div class="main__block--register-box box-shadow">
        <div v-if="error" class="error">{{error.message}}</div>
        <form @submit.prevent="pressed">
            <span class="custom-h1">LETS CHAT</span>
            <div class="space">
                <div class="error-message" v-if="error">
                    {{error}}
                </div>
                <div class="main__block--email">
                    <input class="custom-input"
                    type="text"
                     v-model="email"
                    placeholder="gmail name"
                    />
                    <span class="dummy-gmail">{{ gmail }}</span>
                </div>
                <div class="main__block--password">
                    <input class="custom-input" :type="passwordFieldType" v-model="password" placeholder="password"/>
                    <span type="password" @click="switchVisibility">
                        <font-awesome-icon icon="eye" class="main__block--icon-show" v-bind:class="{activeIcon: isActive}"/>
                    </span>
                </div>
                <div class="main__block--register-button">
                    <button type="submit" class="btn-submit">register</button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    name: "Register",
    methods: {
        async pressed() {
            try {
              let customEmail = this.email + this.gmail;
              const user = await firebase.auth().createUserWithEmailAndPassword(customEmail, this.password);

              if (user) {
                  this.$router.replace({name: "Chat"});
              }
            } catch(err) {
                this.error = err.message;
            }
        },
        // test() {
        //     let mySum = this.email + this.gmail;
        //     console.log(mySum)
        // },
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
            this.isActive = !this.isActive;
        },
        // gmailOrYahoo(value) {
        //     return value.endsWidth('@gmail.com');
        // }
    },
    data() {
        return {
            email: "",
            password: "",
            error: "",
            passwordFieldType: "password",
            isActive: false,
            gmail: "@gmail.com"
        }
    }
}
</script>
<style scoped lang="scss">
.main__block { 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
    &--register-box {
        background-color: rgba(0,0,0,0.4);
        border-radius: 8px;
        min-width: 250px;
        height: auto;
        display: flex;
        flex-flow: column;
        padding: 40px 20px;
    }
    &--register-button {
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }

    &--password, &--email {
        display: flex;
        padding: 10px;
    }

    &--password {
        position: relative;
    }

    .activeIcon {
        color: #ffffff;
    }

    &--icon-show {
        position: absolute;
        top: 20px;
        right: 15px;
        cursor: pointer;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        transition-duration: 0.5s;
    }

    &--icon-show:hover {
        color: rgb(255, 255, 255);
    }

}
</style>