<template>
    <div class="main__block">
        <div class="main__block--login-box box-shadow">
            <form @submit.prevent="pressed">
                <span class="custom-h1">LETS CHAT</span>
                <div class="space">
                    <div class="error-message" v-if="error">
                        {{error}}
                    </div>
                    <div class="main__block--email">
                        <input class="custom-input" type="text" placeholder="gmail name" v-model="email"/>
                        <span class="dummy-gmail">{{ gmail }}</span>
                    </div>
                    <div class="main__block--password">
                        <input class="custom-input" type="password" placeholder="password" v-model="password"/>
                    </div>
                    <div class="main__block--login">
                        <button type="submit" class="btn-submit">login</button>
                    </div>
                </div>
            </form>
            
        </div>
        <div class="main__block--sign-up">
                <!-- <router-link to="/register" class="decoration-none register-btn">Create a new <span class="bold cursor">account here</span></router-link> -->
            <span class="typical">Create a new <router-link to="/register" class="decoration-none register-btn cursor">account here</router-link></span>
            </div>
            <div class="main__block--reset-password">
                <span>Forgot password?</span>
                <button @click="resetPassword" class="main__block--reset-btn">Reset here</button>
            </div>
    </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    name: "Login",
    data() {
        return { 
            email: "",
            password: "",
            error: "",
            gmail: "@gmail.com"
        }
    },
    methods: { 
        resetPassword() {
            this.$router.replace({name: "Reset"})
        },
        async pressed() {
            try {
                let customEmail = this.email + this.gmail;
                const val = await firebase.auth().signInWithEmailAndPassword(customEmail,this.password);
                if (val) {
                  this.$router.replace({name: "Chat"});
                }
            } catch(err) {
                this.error = err.message;
            }
        }
    }
}
</script>
<style scoped lang="scss">
.main__block {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    flex-flow: column;

    &--reset-password { 
        color: #ffffff;
        font-size: 12px;
        font-weight: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        
    }

    &--reset-btn {
        outline: none;
        border: unset;
        background-color: unset;
        color: #ffffff;
        font-family: 'Montserrat', sans-serif !important ;
        // margin-left: 3px;
        margin: 0;
        padding: 0;
        cursor: pointer;
        margin-left: 3px;
        font-size: 12px;
        font-weight: 700;
    }

    &--login-box {
        display: flex;
        min-width: 250px;
        height: auto;
        flex-flow: column;
        background-color: rgba(0,0,0,0.4);
        border-radius: 8px;
        padding: 40px 20px;
    }

    &--password, &--email {
        display: flex;
        padding: 10px;
    }

    &--login {
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }

    &--sign-up {
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }
}
</style>