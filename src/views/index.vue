<template>
    <div>
        <router-link :to="{ name: 'addEnv'}"><i class="material-icons md-48" id="addEnvBtn">add_circle</i></router-link>
        <div class="container">
        <div class="problem_box" v-for="env in environments" :key="env.id" :class="{ problem_box_error: env.problem_obj.problem_count>0 }">
            <div class="env_title">{{env.title}}</div><span id="deleteBtn" @click="deleteEnv(env.id)"><i class="material-icons">delete</i></span>
            <div class="problem_data">
                <div class="problem_count">{{ env.problem_obj.problem_count }}</div>
                <ul class="problem_area">
                    <li>INFRASTRUCTURE: <span>{{ env.problem_obj.infra_problems }}</span> </li>
                    <li>SERVICE: <span>{{ env.problem_obj.service_problems }}</span></li>
                    <li>APPLICATION: <span>{{ env.problem_obj.app_problems }}</span></li>
                    <li>ENVIRONMENT: <span>{{ env.problem_obj.env_problems }}</span></li>
                </ul>
            </div>
            <span id="editBtn"><i class="material-icons">edit</i></span>
        </div>
       
    </div>
    </div>
    
</template>

<script>

import db from '@/firebase/firestore'
export default {
    name: 'Index',
    data(){
        return{
            environments:[],
            refresh_rate: 100000
        }
    },
    methods: {
        
        getProblemStatus(){
            setInterval(() => {
                this.environments.forEach(el => {
                    fetch('problem_status.json')
                    .then((res) => res.json())
                    .then(data =>{
                        el.problem_obj = {
                            'problem_count' : data.result.totalOpenProblemsCount,
                            'infra_problems' : data.result.openProblemCounts.INFRASTRUCTURE, 
                            'service_problems' : data.result.openProblemCounts.SERVICE,
                            'app_problems' : data.result.openProblemCounts.APPLICATION,
                            'env_problems' : data.result.openProblemCounts.ENVIRONMENT
                        }
                    })
                });
            },this.refresh_rate)
        },

        deleteEnv(id){
           db.collection('environments').doc(id).delete()
           .then(() => {
               this.environments = this.environments.filter((env) => {
                   return env.id != id
               })
           })
        }
        
    },

    created(){
        // fetch environment collection from firestore
        db.collection('environments').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let env = doc.data()
                env.id = doc.id
                let env_obj = {
                    'id' : env.id,
                    'title' : env.title,
                    'api_link' : `${env.domain}/e/${env.id}/api/v1/problem/status?Api-Token=${env.auth_token}`,
                    'problem_obj' : {
                        'problem_count' : 0,
                        'infra_problems' : 0, 
                        'service_problems' : 0,
                        'app_problems' : 0,
                        'env_problems' : 0
                    }
                }
                this.environments.push(env_obj)
            })
        }).catch((err)=>{console.error("Something went wrong!")})

        this.getProblemStatus()

    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  
    .container{
        margin: 5% 5%;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
 
    .problem_box{
        color: var(--font-white);
        padding: 1rem;
        box-shadow: 0px 10px 20px rgb(35,35,35);
        border: 2px solid var(--ok-green);
        position: relative;
        /* border-radius: 10px; */
    }

    .problem_box_error{
        border: 3px solid var(--error-red);
    }

    .env_title{
         font-size: 1.5rem;
    }
    .problem_count{
        text-align: center;
        font-size: 2rem;
    }
    .problem_area{
        list-style : none;
        font-size: 0.7rem;
    }
    .problem_area li span{
        color: white;
        font-size: 0.8rem;
    }

    #addEnvBtn{
       color: #c2c2c2;
       position: absolute;
       bottom: 4vh;
       right: 20px;
       cursor: pointer;
    }

    #addEnvBtn:hover{
        color: var(--font-white);
    }

    i:hover{
         color: var(--font-white);
    }
    /* Set size of material icon */
    .material-icons.md-48 { font-size: 48px; }

    #deleteBtn{
        position: absolute;
        right: 5px;
        top:5px;
        color: #c2c2c2;
        cursor: pointer;

    }

    #editBtn{
        position: absolute;
        right: 5px;
        bottom:5px;
        color: #c2c2c2;
        cursor: pointer;
    }
    
</style>

