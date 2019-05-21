<template>
  <div id="app">
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
export default {
  name: 'App',
  components:{
    Navbar
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

:root {
  --primary: #2b2b2b; 
  --error-red:#e74c3c;
  --ok-green:#1abc9c;
  --warning-amber:#f39c12;
}
</style>
