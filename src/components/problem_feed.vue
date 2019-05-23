<template>
    <div>
        This is problem feed {{name}}
    </div>
</template>

<script>
export default {
    name:'ProblemFeed',
    data(){
        return{
            name: "Sumit"
        }
    },
    methods:{

    },
    created(){
        this.name = "Sumit Kumar"
    }
}
</script>

<style>

</style>
