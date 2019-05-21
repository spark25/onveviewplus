<template>
<div class="nav">
    <div class="brand">OneView+</div>
    <ul class="nav-links">
        <li>Elevate</li>
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
    .brand{
        padding: 0 1em;
        font-size: 1.2em;
        cursor: pointer;
    }

    .nav-links li{
        padding: 0 1em;
        cursor: pointer;
    }
</style>
