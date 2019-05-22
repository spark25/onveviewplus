<template>
    <div class="main">
        <div class="problem_box" v-for="env in environments" :key="env.id">
            <div class="env_title">{{env.title}}</div>
            <div class="problem_data">
                <div class="problem_count">{{ env.problem_obj.problem_count }}</div>
                <ul class="problem_area">
                    <li>INFRASTRUCTURE: {{ env.problem_obj.infra_problems }}</li>
                    <li>SERVICE: {{ env.problem_obj.service_problems }}</li>
                    <li>APPLICATION: {{ env.problem_obj.app_problems }}</li>
                    <li>ENVIRONMENT: {{ env.problem_obj.env_problems }}</li>
                </ul>
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
        })

        this.getProblemStatus()

    }
}
</script>

<style>
    body{
        background: var(--primary);
    }
    .problem_box{
        color: #fff;
        padding: 1rem;
        box-shadow: 0px 10px 20px rgb(35,35,35);
    }

    .main{
        margin: 5% 10%;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    .problem_area{
        list-style : none;
    }
</style>

