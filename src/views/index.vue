<template>
    <div>
        <router-link v-if="isLoggedIn" :to="{ name: 'addEnv'}"><i class="material-icons md-48" id="addEnvBtn">add_circle</i></router-link>
        <div class="container">
        <div class="problem_box" v-for="env in environments" :key="env.id" :class="{ problem_box_error: env.problem_obj.problem_count>0 , fetch_error: env.fetch_error }">
            <div class="env_title"  @click="getProblemFeed(env.title,env.problem_feed, env.problem_details, env.auth_token)">{{env.title}}</div>
            <span v-if="isLoggedIn"     id="deleteBtn" @click="deleteEnv(env.id)"><i class="material-icons">delete</i></span>
            
            <div class="problem_data">
                <div class="problem_count"  @click="getProblemFeed(env.title,env.problem_feed, env.problem_details,env.auth_token)">{{ env.problem_obj.problem_count }}</div>
                <ul class="problem_area">
                    <li>INFRASTRUCTURE: <span>{{ env.problem_obj.infra_problems }}</span> </li>
                    <li>SERVICE: <span>{{ env.problem_obj.service_problems }}</span></li>
                    <li>APPLICATION: <span>{{ env.problem_obj.app_problems }}</span></li>
                    <li>ENVIRONMENT: <span>{{ env.problem_obj.env_problems }}</span></li>
                </ul>
            </div>
            <router-link v-if="isLoggedIn" :to="{ name: 'editEnv', params:{env_id:env.id}}"><i class="material-icons" id="editBtn">edit</i></router-link>
        </div>
       
    </div>
    <div v-if="show_problem_feed">
        <div class="feed_head">
            <div class="feed_title">{{ feed_head }}</div>
            <i class="material-icons close" @click="closeProblemFeed">close</i>
        </div>
        <ProblemFeed v-bind:problems="problems"></ProblemFeed>
    </div>
    </div>
    
</template>

<script>

import fb from '@/firebase/init'
import ProblemFeed from '@/components/problem_feed'
export default {
    name: 'Index',
    components:{
        ProblemFeed
    },
    data(){
        return{
            environments:[],
            refresh_rate: 10000,
            problems:[],
            show_problem_feed: false,
            feed_head:'',
            isLoggedIn:false,
            
        }
    },
    methods: {
        closeProblemFeed(){
            this.show_problem_feed = false
        },
        getProblemStatus(){
           
            setInterval(() => {
                this.environments.forEach(el => {
                    fetch(el.problem_status)
                    .then((res) => res.json())
                    .then(data =>{
                        el.problem_obj = {
                            'problem_count' : data.result.totalOpenProblemsCount,
                            'infra_problems' : data.result.openProblemCounts.INFRASTRUCTURE, 
                            'service_problems' : data.result.openProblemCounts.SERVICE,
                            'app_problems' : data.result.openProblemCounts.APPLICATION,
                            'env_problems' : data.result.openProblemCounts.ENVIRONMENT
                        }
                    }).catch((err)=>{el.fetch_error = true})
                });
            },this.refresh_rate)
        },

        deleteEnv(id){
           fb.db.collection('environments').doc(id).delete()
           .then(() => {
               this.environments = this.environments.filter((env) => {
                   return env.id != id
               })
           })
        },
        
        getProblemFeed(head,link, detail_link, token){
            this.feed_head = head
            this.show_problem_feed = true
            this.problems = []
            fetch(link)
            .then((res) => res.json())
            .then((data) => {
                if(data.result.problems.length>0){
                    data.result.problems.forEach(element => {
                        let timestamp =  new Date(element.startTime)
                        let outage = this.getOutage(timestamp)
                        // let problem_details=this.getProblemDetail(element.id, detail_link, token)
                        let problem = {
                            'p_id' : element.id,
                            'entity_name' : element.rankedImpacts[0].entityName,
                            'display_name' : element.displayName,
                            'event_type' : element.rankedImpacts[0].eventType,
                            'outage' : outage        
                        }
                       
                        this.problems.push(problem) 
                    });
                }
            }).catch((err)=>{console.error(err)})
        },

        // getProblemDetail(p_id, detail_link, token){
        //     let link = `${detail_link}${p_id}?Api-Token=${token}`
        //     fetch('problem_details.json')
        //     .then((res) => res.json())
        //     .then((data) => {
        //        data.result.rankedEvents[0].eventType
        //     })

        // },
        
        getOutage(startTimestamp){
            let the_date = startTimestamp.toDateString()
            let the_time = startTimestamp.toLocaleTimeString()
            let seconds = (new Date()-startTimestamp)/1000
            let hours = Math.floor(seconds/3600)
            let min = Math.floor(seconds % 3600 / 60)
            let sec = Math.floor(seconds % 3600 % 60);
            return {
                "date_time": `${the_date} ${the_time} `,
                "outage": `${hours} hrs : ${min} min : ${sec}sec`
            }
   
 }
    },

    computed:{
        
    },

    created(){
        //Check if user is logged in
         fb.auth.onAuthStateChanged(user => {
            if(user){
                this.isLoggedIn = true
            }
        })
        // fetch environment collection from firestore
        fb.db.collection('environments').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let env = doc.data()
                env.id = doc.id
                let env_obj = {
                    'title' : env.title,
                    'id' : env.id,
                    'env_id' : env.env_id,
                    'auth_token': env.auth_token,
                    'problem_status' : `${env.domain}/e/${env.env_id}/api/v1/problem/status?Api-Token=${env.auth_token}`,
                    'problem_feed' : `${env.domain}/e/${env.env_id}/api/v1/problem/feed?status=OPEN&Api-Token=${env.auth_token}`,
                    'problem_details' : `${env.domain}/e/${env.env_id}/api/v1/problem/details/`,
                    'problem_obj' : {
                        'problem_count' : 0,
                        'infra_problems' : 0, 
                        'service_problems' : 0,
                        'app_problems' : 0,
                        'env_problems' : 0
                    },
                    'fetch_error' : false
                }
                this.environments.push(env_obj)
            })
        }).catch((err)=>{console.error(err)})

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
        padding: 0.8rem;
        box-shadow: 0px 10px 20px rgb(35,35,35);
        border: 2px solid var(--ok-green);
        position: relative;
        border-radius: 10px;
        
    }

    .problem_box:hover{
        box-shadow: 0px 10px 25px rgb(20, 20, 20);
        
    }

    .problem_box_error{
        border: 3px solid var(--error-red);
    }

    .fetch_error{
        border: 3px solid var(--warning-amber);
    }

    .env_title{
         font-size: 1.2rem;
         text-transform: uppercase;
         font-family: 'Oswald', sans-serif;
         cursor: pointer;
    }

    .env_title::after{
         content: '';
         display: block;
         width: 100%;
         height: 2px;
         background: #4b4b4b;
    }

    .problem_data{
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
    }

     .problem_count{
        text-align: center;
        font-size: 3rem;
        color:#fff;
        font-family: 'Oswald', sans-serif;
        cursor: pointer;

    }
    .problem_area{
        list-style : none;
        font-size: 0.7rem;
        padding-left: 2em;
        
    }
    .problem_area li span{
        color: white;
        font-size: 0.8rem;
    }

    #addEnvBtn{
       color: #c2c2c2;
       position: fixed;
       bottom: 4vh;
       right: 20px;
       cursor: pointer;
       z-index: 999;
       margin-top: 20px;
    }

    #addEnvBtn:hover, #editBtn:hover, #deleteBtn:hover{
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

    .close{
    color: var(--font-white);
    cursor: pointer;
    }
    .close:hover{
    color: var(--error-red);
    }
    .feed_head{
        display: flex;
        justify-content: space-between;
        margin: 0 5%;
        padding: 0.5em;
    }

    .feed_title{
        text-transform: uppercase;
        color: var(--font-white);
    }
    
</style>

