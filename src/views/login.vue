<template>
    <div class="login_box">
        <form class="box" @submit.prevent="login">
           <h2>Login to Elevate</h2>
           <div class="feedback" v-if="feedback">{{feedback}}</div>
            <input type="email" name="" placeholder="Username" v-model="email">
            <input type="password" name="" placeholder="Password" v-model="password">
            <input type="submit" name="" value="Login">
        </form>
    </div>
</template>

<script>
import fb from '@/firebase/init'
export default {
    data(){
        return{
            email : "",
            password: "",
            feedback: null,
        }
    },

    methods:{
      login(){
        fb.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((token) =>{
           this.$router.push({ name: 'index'})
          //  this.$router.go({path: this.$router.path})
        })
        .catch((error) => {
              // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        this.feedback = errorMessage;
        });
      }
    }

}
</script>

<style scoped>
.box{
  width: 40vmax;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: var(--less-dark);
  /* box-shadow: 0px 10px 20px rgb(40, 40, 40); */
  text-align: center;
  border-radius: 10px;
}
.box h2{
  color: var(--font-white);
  /* text-transform: uppercase; */
  font-weight: 500;
}
.box input[type = "email"],.box input[type = "password"]{
  border:0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 20vmax;
  outline: none;
  color: white;
  border-radius: 10px;
  transition: 0.25s;
}
.box input[type = "email"]:focus,.box input[type = "password"]:focus{
  width: 30vmax;
  border-color: #2ecc71;
}
.box input[type = "submit"]{
  border:0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 10px;
  transition: 0.25s;
  cursor: pointer;
}
.box input[type = "submit"]:hover{
  background: #2ecc71;
}
.feedback{
  font-size: 0.8em;
  color: var(--error-red);
  padding: 5px 5px;
}
</style>
