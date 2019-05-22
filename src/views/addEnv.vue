<template>
    <div class="addEnv">
        <form class="box" @submit.prevent="addEnv">
            <h2>Add a new Environment</h2>
            <input type="text" name="" placeholder="Enviroment Name" v-model="name">
            <input type="text" name="" placeholder="Enviroment ID" v-model="env_id">
            <input type="text" name="" placeholder="Enviroment Domain" v-model="domain">
            <input type="text" name="" placeholder="Environment Auth-Token" v-model="auth_token">
            <input type="submit" name="" value="Add">
        </form>
    </div>
</template>

<script>
import db from '@/firebase/firestore' 
export default {
    name:"AddEnv",
    data(){
        return{
            name:null,
            env_id:null,
            domain:null,
            auth_token:null,
            active:true,
            feedback:null,

        }
    },
    methods:{
        addEnv(){
            if(this.name && this.env_id && this.domain && this.auth_token){
                this.feedback = null;
                db.collection('environments').add({
                    id : this.env_id,
                    title: this.name,
                    domain: this.domain,
                    auth_token: this.auth_token,
                    active:this.active
                })
                .then(() =>{
                    this.$router.push({ name: 'index'})
                })
                .catch((err)=>{console.error("Something went wrong!")})

            }
        }
    }

}
</script>

<style scoped>
.box{
  width: 400px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: var(--less-dark);
  box-shadow: 0px 10px 20px rgb(40, 40, 40);
  text-align: center;
}
.box h2{
  color: var(--font-white);
  font-weight: 500;
}
.box input[type = "text"],.box input[type = "password"]{
  border:0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
.box input[type = "text"]:focus,.box input[type = "password"]:focus{
  width: 280px;
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
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.box input[type = "submit"]:hover{
  background: #2ecc71;
}

</style>
