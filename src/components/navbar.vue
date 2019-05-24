<template>
<div class="nav">
     <div class="logo"><router-link :to="{ name: 'index'}">OneView+</router-link></div>
    <ul class="nav-links">
        <li v-if="!isLoggedIn"><router-link to="login">Elevate</router-link> </li>
        <li @click="logout" v-if="isLoggedIn">Logout</li>
    </ul>
    
</div>

</template>

<script>
import fb from '@/firebase/init'
export default {
    name: 'NavBar',
    data(){
        return{
            isLoggedIn:false
        }
    },
    methods:{
        logout(){
            fb.auth.signOut()
            .then(() => {
                console.log('logout clicked')
                // Sign-out successful.
                this.isLoggedIn = false
                this.$router.push({ name: 'login'})
                
            }).catch(error => {
                console.error(error)
            });

        }
    },
    created(){
        fb.auth.onAuthStateChanged(user => {
            if(user){
                this.isLoggedIn = true
            }
        })
    }


}
</script>

<style scoped>
    .nav{
        color: #ecf0f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 8vh;
        box-shadow: 10px 0px 30px rgb(29, 29, 29);
     }

    .nav .nav-links{    
        list-style: none;
    }

    .logo a{
        text-decoration: none;
        color: var(--font-white);
         padding: 0 1em;
        font-size: 1.2em;
        cursor: pointer;
    }

    .nav-links li{
        padding: 0 1em;
        font-size: 1em;
        cursor: pointer;
    }
    .nav-links li a{
        text-decoration: none;
        color: var(--font-white)
    }


    

</style>
