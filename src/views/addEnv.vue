<template>
    <div class="addEnv">
        <form class="box" @submit.prevent="addEnv">
            <h2>Add a new Environment</h2>
            <div v-if="feedback" class="feedback">All entries are required</div>
            <input type="text" name="" placeholder="Enviroment Name" v-model="name">
            <input type="text" name="" placeholder="Enviroment ID" v-model="env_id">
            <input type="text" name="" placeholder="Enviroment Domain" v-model="domain">
            <input type="text" name="" placeholder="Environment Auth-Token" v-model="auth_token">
            <input type="submit" name="" value="Add">
        </form>
    </div>
</template>

<script>
import fb from '@/firebase/init' 
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
                fb.db.collection('environments').add({
                    env_id : this.env_id.trim(),
                    title: this.name.trim(),
                    domain: this.domain.trim(),
                    auth_token: this.auth_token.trim(),
                    active:this.active
                })
                .then(() =>{
                    this.$router.push({ name: 'index'})
                })
                .catch((err)=>{console.error("Something went wrong!")})

            }
            else{
              this.feedback = true;
            }
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
  width: 20vmax;
  outline: none;
  color: white;
  border-radius: 10px;
  transition: 0.25s;
}
.box input[type = "text"]:focus,.box input[type = "password"]:focus{
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
  color: var(--error-red)
}
</style>
