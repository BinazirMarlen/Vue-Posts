<template>
     <div class="post"> 
         <div>
            <div><strong>titles: </strong>{{post.title}}</div>
            <div><strong>descr: </strong>{{post.body}}</div>     
         </div>
         <div class="post__btns">
             <my-button @click="$emit('remove', post)">Delete</my-button>
         </div>       
    </div> 
</template>

<script>
import MyButton from './UI/MyButton.vue';

export default {
  components: { MyButton },
    props: {
        post: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>