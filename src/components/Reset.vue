<template>
    <div class="main__block">
        <div class="main__block--reset-box box-shadow">
            <span class="custom-h1">LETS CHAT</span>
            <span class="verify-email">Verify your email adress</span>
            <div class="main__block--email">
                <input class="custom-input" type="email" placeholder="Gmail name" v-model="email" @keyup.enter="resetPassword(email)"/>
                 <span class="dummy-gmail">{{ gmail }}</span>
            </div>
            <div class="error-message" v-if="error" :class="{ active: success}">
                {{error}}
            </div>
            <div v-if="success" class="success-message">
                {{success}}
            </div>
            <div class="main__block--reset-pw">
                <button @click="resetPassword(email)"  class="btn-submit">Confirm</button>
            </div>
        </div>
    </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    name: "Reset",
    data(){
        return {
            email: "",
            error: "",
            success: "",
            gmail: "@gmail.com"
        }
    },
    methods: {
        resetPassword(value) {
            if(value) {
                const auth = firebase.auth();
                auth.sendPasswordResetEmail(value).then(() => {
                    this.success = "Email sent successfuly."
                    setTimeout(this.changeRoute, 5000)
                }).catch((error) => {
                    this.error = error.message;
                })
            }
        },
        changeRoute() {
            this.$router.replace({name: "Login"});
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

    &--reset-box {
        display: flex;
        min-width: 250px;
        height: auto;
        flex-flow: column;
        background-color: rgba(0,0,0,0.4);
        border-radius: 8px;
        padding: 20px;
    }
    
     &--email {
        display: flex;
        padding: 10px;
    }

    &--reset-text {
        color: #ffffff;
        font-weight: 100;
        font-size: 12px;
        padding: 10px;
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }
     
    &--reset-pw {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        outline: none;
    }


}

</style>