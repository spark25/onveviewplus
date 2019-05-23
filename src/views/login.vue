<template>
    <div class="login_box">
        <form class="box">
            <h2>Login to Elevate</h2>
            <input type="email" name="" placeholder="Username" v-bind="email">
            <input type="password" name="" placeholder="Password" v-bind="passowrd">
            <input type="submit" name="" value="Login">
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email : "",
            passowrd: ""
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

</style>
