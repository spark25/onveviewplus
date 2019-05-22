<template>
<div class="nav">
    <router-link :to="{ name: 'index'}">OneView+</router-link>
    <ul class="nav-links">
        <li><router-link to="login">Elevate</router-link> </li>
    </ul>
    
</div>

</template>

<script>
export default {
    name: 'NavBar',
    data(){
        return{

        }
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
    .router-link-active{
        text-decoration: none;
        color: var(--font-white);
         padding: 0 1em;
        font-size: 1.2em;
        cursor: pointer;
    }

    .nav-links li a{
        padding: 0 1em;
        font-size: 1em;
        text-decoration: none;
        color: var(--font-white)
    }

    

</style>
