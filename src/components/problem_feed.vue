<template>
    <div class="problem_details_box">
        <div v-for="problem in problems" class="container">      
            <div class="entity_name">{{problem.entity_name}}</div>
            <div class="display_name">Problem No.: {{problem.display_name}}</div>
            <div class="outage">{{problem.outage}}</div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'ProblemFeed',
    props:{
        problems:{
            type: Array
        }
    },
    data(){
        return{
           
        }
    },
    methods:{
       
    },
    created(){
        this.name = "Sumit Kumar"
    }
}
</script>

<style scoped>

.container{
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    background: var(--less-dark);
    padding: 1em;
    border-radius: 10px;
    color: var(--font-white);
    margin-bottom: 0.5em;
    border: 1px solid var(--less-dark);
}

.container:hover{
    background: #383838;
    box-shadow: 0px 10px 20px rgb(35,35,35);
}
    
.problem_details_box{
    margin: auto 5%;
    
}

</style>
