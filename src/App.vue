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
@import url('https://fonts.googleapis.com/css?family=Oswald|Poppins:400,700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body{
        background: var(--primary);
    }
:root {
  --primary: #2b2b2b; 
  --less-dark: #303030;
  --error-red:#e74c3c;
  --ok-green:#1abc9c;
  --warning-amber:#f39c12;
  --font-white: #ecf0f1;
}
</style>
