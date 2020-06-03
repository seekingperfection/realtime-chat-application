<template>
<div class="main__block">
    <div class="main__block--header">
        <div class="main__block--entry-message">
            <span>Lets Chat</span>
        </div>
    </div>
    <div class="main__block--box">
        <div class="main__block--buttons-box">
            <div class="margin-bottom">
                <router-link to="/login" class="main__block--login-btn decoration-none global-btn">Login</router-link>
            </div>
            <div>
                <router-link to="/register" class="main__block--register-btn decoration-none">Create a new <span class="bold">account</span></router-link>
            </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
    name: "Home"
}
</script>
<style scoped lang="scss">
.main__block {
    height: 100vh;
    display: flex;
    flex-flow: column;
    
    &--header {
        display: flex;
        justify-content: center;
        padding: 20px 10px;
    }

    &--box {
        height: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20%;
    }

    &--entry-message {
        font-weight: 700;
        text-transform: uppercase;
        color: #ffffff;
    }

    &--buttons-box { 
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    &--login-btn {
        padding: 10px 70px;
        border-radius: 8px;
        color: #ffffff;
        text-transform: uppercase;
        background-color: rgba(0,0,0);
    }

    &--register-btn { 
        font-size: 12px;
        color: #ffffff;
        font-weight: 100;
    }

   
}
</style>