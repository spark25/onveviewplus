<template>
    <div class="problem_details_box">
        <div v-for="problem in problems" class="container" :key="problem.p_id">      
            <div class="entity_name">{{problem.entity_name}}</div>
            <div class="display_name">Problem No.: <span>{{problem.display_name}}</span></div>
            <div class="event_type">{{ problem.event_type }}</div>
            <div class="outage">Since <span style="color:#fdcb6e">{{problem.outage.date_time}}</span> for <span style="color:#ff7675">{{problem.outage.outage}}</span></div>
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
    font-size: 0.8em;
}

.container:hover{
    background: #383838;
    box-shadow: 0px 10px 20px rgb(35,35,35);
}
    
.problem_details_box{
    margin: auto 5%;
    
}
.display_name span{
    color:#3498db;
}
.event_type{
    color: var(--error-red);
}

</style>
