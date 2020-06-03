<template>
  <div class="main__block">
    <div class="main__block--chat-position">
      <div class="main__block--header">
        <Header></Header>
      </div>
      <div class="main__block--chat-box">
        <!-- <div class="test"> -->
          
        <div class="main__block--users-box my-padding">
          <div class="main__block--active-users">
            <span>Active users</span>
            <span>0</span>
          </div>
          <div class="list-of-active-box" v-if="messages">
            <div class="list-of-active" v-for="(user,index) in messages" :key="index">
              <div  class="main__block--user-status position-relative margins">
                <span class="active-user">{{ user.author }}</span>
                <span>
                  <font-awesome-icon icon="circle" class="user-icon-positioning"/>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="main__block--message-box-position my-padding">
          <div class="main__block--message-box">
              <div 
                :class="[msg.author===authUser ? 'align-end' : 'no-align']"
                class="main__block--messages position-relative"
                v-for="(msg,index) in messages"
                :key="index">
                
                <div :class="[msg.author===authUser ? 'main__block--my-box' : 'main__block--user-box']"
                  >
                  <span class="main__block--username">{{ msg.author }}:</span>
                  <span class="main__block--message">{{ msg.message }}</span>
                  <span class="main__block--date">{{ getDate(msg) }}</span>
                  <!-- <span class="main__block--message-date">2019-12-12</span> -->
                </div>
                <!-- <div class="main__block--my-box">
                  <span class="main__block--my-message">Mano zinute tau ok</span>
                  class="main__block--user-box"
                  <span class="main__block--my-message-date">2019-12-12</span>
                </div> -->
              </div>
          </div>
          
          <div class="main__block--create-message">
              <input
              v-model="message"
              @keyup.enter="saveMessage"
              class="main__block--input"
              type="text" placeholder="Your message..."
              />
              <button @click="saveMessage" class="btn-send">send</button>
          </div>
        </div>
        <!-- </div> -->

      </div>
    </div>
    <div class="nesc-devs">
      <span class="provided">&copy;Provided by</span>
      <span class="nesc">seekingperfection</span>
    </div>
  </div>
</template>

<script>
// import { store } from "../store";
import firebase from "firebase";
import Header from "../components/Header.vue";
import {db} from "../main.js";
export default {
  name: "Chat",
  components: {
    Header
  },
  data() {
    return {
      message: null,
      messages: [],
      authUser: "",
      activeUsers: "",
      dummyName: "",
      dummyDate: null,
    }
  },
  methods: {
    scrollToBottom() {
      let box = document.querySelector('.main__block--message-box');
      box.scrollTop = box.scrollHeight;
    },
    getDate(value) {
      let date = new Date(1970, 0, 1); 
      date.setSeconds(value.createdAt);
      let h = date.getHours();
      let m = date.getMinutes();
      if (m < 10) {
        let custom = "0" + m;
        let myTime = h + 3 + ":" + custom;
        return myTime;
      } else {
        let myTime = h + 3 + ":" + m;
        return myTime;
      }
    },
    saveMessage() {
      //save to firestore
      if (this.message === null) {
        return;
      } else {
        db.collection('chat').add({
        message: this.message,
        createdAt: new Date(),
        author: this.authUser
        }).then(() => {
          this.scrollToBottom();
        })
        this.message = null;
      }
      
    },
    fetchMessages() {
      db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach(doc => {
          allMessages.push(doc.data())
        })
        this.messages = allMessages;

        setTimeout(() => {
          this.scrollToBottom();
        }, 1000)
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.dummyName = user.email;
        this.authUser = this.dummyName.substring(0, this.dummyName.lastIndexOf("@"));
      }
    })
    this.fetchMessages();
  }
};
</script>

<style scoped lang="scss">
.main__block {
  display: flex;
  flex-flow: column;
  height: 100vh;
  position: relative;
  &--header {
    display: flex;
    flex-flow: row;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  &--chat-position {
    // margin-top: 5%;
    display: flex;
    justify-content: center;
    // height: 60vh;
    height: 100%;
     background: linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1) ), url("../assets/cosmos3.png")  no-repeat center center fixed;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: cover;
  }

  &--date {
    font-size: 8px;
    font-weight: 100;
    color: rgba(0, 204, 255, 0.315);
    // margin-top: 8px;
    
  }

  .list-of-active {
    font-weight: 100;
    font-size: 12px;
    display: flex;
    flex-flow: column;
  }

  .list-of-active:last-of-type .margins {
    margin-bottom: 0 !important;
  }

  .list-of-active-box {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    padding: 10px;
    height: 100%;
    overflow-y: auto;
  }

  &--users-box { 
    display: flex;
    min-width: 150px;
    overflow-y: auto;
    width: 200px;
    padding-right: 25px !important;
    flex-flow: column;
    height: 50%;
  }

  &--active-users {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 10px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
  }

  &--message-box-position {
    display: flex;
    flex-flow: column;
    width: 100%;
  }
  &--chat-box {
    display: flex;
    width: 100%;
    flex-flow: row;
    height: 100vh;
    justify-content: space-between;
    // padding: 50px 25px 100px 25px;
    padding: 0 25px;

  }

  &--user-list  {
    border: 1px solid black;
    display: flex;
    flex-flow: column;
    padding: 20px 25px;
    width: 30%;
  }

  &--message-box {
    display: flex;
    padding: 20px 25px;
    height: 100%;
    background-color: rgb(0,0,0,0.4);
    border-radius: 4px;
    overflow-y: auto;
    flex-flow: column nowrap;
    overflow-x:hidden;
  }

  &--messages:first-child {
    margin-top: auto !important;
  }

  &--messages { 
    display: flex;
    flex-flow: column;
    background-color: rgba(0, 204, 255, 0.048);
    border: 1px solid rgba(0, 204, 255, 0.048);
    margin-bottom: 5px;
    transition-duration: 0.5s;
    border-radius: 4px;
    // min-width: 50px;
    // max-width: 50px;
    width: max-content;
  }
  &--messages:hover { 
    border: 1px solid rgba(0, 204, 255, 0.315);
  }

  &--user-box { 
    display: flex;
    flex-flow: column;
    width: 100%;
    padding: 10px 15px;

    .main__block--date {
      position: absolute;
      top: 24px;
      right: -28px;
    }

    .main__block--username {
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      .additional {
        font-weight: 100;
      }
    }

    .main__block--message {
      color: #ffffff;
      font-size: 12px;
      font-weight: 100;
      margin-top: 8px;
    }
  }


  &--my-box { 
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    padding: 10px 15px;
   
    .main__block--date {
      position: absolute;
      top: 13px;
      left: -28px;
    }
    .main__block--username {
      display: none;
    }

    .main__block--message {
      color: #ffffff;
      font-size: 12px;
      font-weight: 100;
    }
    
  }



  &--create-message { 
    padding: 20px 25px;
    display: flex;
    flex-flow: row;
    background-color: rgb(0,0,0,0.4);
    margin-top: 10px;
    border-radius: 4px;
  }

  &--input {
    width: 80%;
    background-color: unset;
    outline: none;
    border: none;
    color: #ffffff;
    padding: 25px 10px;
    background-color: rgba(0, 204, 255, 0.048);
    border: 1px solid rgba(0, 204, 255, 0.048);
    transition-duration: 0.5s;
    border-radius: 4px;
  }

  &--input:hover {
    border: 1px solid rgba(0, 204, 255, 0.315);
  }

  &--input:focus {
    border: 1px solid rgba(0, 204, 255, 0.315);
  }
  .btn-send {
    border: none;
    background-color: unset;
    color: #ffffff;
    text-transform:uppercase;
    font-size: 12px;
    font-weight: 100;
    position: relative;
    padding: 7px 25px;
    border-radius: 4px;
    cursor: pointer;
    transition-duration: 0.5s;
    background-color: rgba(0, 204, 255, 0.048);
    border: 1px solid rgba(0, 204, 255, 0.048);
    width: 20%;
    margin-left: 10px;
  }

  .btn-send:hover {
   border: 1px solid rgba(0, 204, 255, 0.315);
  }
}
</style>
