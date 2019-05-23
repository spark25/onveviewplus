<template>
    <div class="editEnv" v-if="environment">
        <form class="box" @submit.prevent="editEnv">
            <h2>Edit <span>{{ environment.title }}</span></h2>
            <div v-if="feedback" class="feedback">All entries are required</div>
            <input type="text" name="" placeholder="Enviroment Name" v-model="environment.title">
            <input type="text" name="" placeholder="Enviroment ID" v-model="environment.env_id">
            <input type="text" name="" placeholder="Enviroment Domain" v-model="environment.domain">
            <input type="text" name="" placeholder="Environment Auth-Token" v-model="environment.auth_token">
            <input type="submit" name="" value="Update">
        </form>
    </div>
</template>

<script>
import db from '@/firebase/firestore' 
export default {
    name: 'EditEnv',
    data(){
        return{
            environment: null,
            feedback: null
        }
    },

    methods:{
        editEnv(){
            if(this.environment.title){
                this.feedback = null;
                db.collection('environments').doc(this.environment.id).update({
                    env_id : this.environment.env_id.trim(),
                    title: this.environment.title.trim(),
                    domain: this.environment.domain.trim(),
                    auth_token: this.environment.auth_token.trim()
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
    },
    created(){
        let env_ref = db.collection('environments').doc(this.$route.params.env_id)
        env_ref.get().then(doc => {
                this.environment = doc.data()
                this.environment.id = doc.id
            })
        
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

.box h2 span{
  text-transform: uppercase;
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
