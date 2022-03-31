<template>
    <div class="app">
      <h1>Post page</h1>
      <div class="app__btns">
         <my-button  @click = "showDialog">Create post</my-button>
         <my-select v-model="selectedSort" :options="sortOptions" />
      </div>
     
      <my-dialog :show="dialogVisible">
         <post-form  @create="createPost" />
      </my-dialog>
     
      <post-list 
      :posts="sortedPosts"
      @remove = 'removePost'
      v-if = "!isPostLoading"
      />
      <div v-else>Post is Loading .....</div>
    </div> 
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyDialog from './components/UI/MyDialog.vue';
import MyButton from './components/UI/MyButton.vue';
import axios from 'axios'
import MySelect from './components/UI/MySelect.vue';

export default{
  components:{
    PostList, PostForm,
    MyDialog, MyButton, axios, MySelect
  },
    data() {
        return {
            posts: [],
            dialogVisible:false,
            isPostLoading: false,
            selectedSort: '',
            sortOptions: [
              {value: 'title', name: 'By name'},
              {value: 'body', name: 'By meaning'},
            ]
        }
    },
    methods: {
     createPost(post) {
       this.posts.push(post);
       this.dialogVisible = false;
     },
     removePost(post) {
       this.posts = this.posts.filter(p=>p.id!==post.id)
     },
     showDialog(){
       this.dialogVisible = true;
     },
     async fetchPosts() {
       try{
         this.isPostLoading = true;
         setTimeout(async() => {
          const response = await axios.get('https://jsonplaceholder.ir/posts?_limit=10');
          this.posts = response.data;
         }, 1000)
         
       }catch(e){
         alert('Error')
       } finally {
         this.isPostLoading = false;
       }
     }
    },
    mounted() {
      this.fetchPosts();
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      }
    }
}

</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app__btns{
  display: flex;
  justify-content: space-between;
  margin:15px 0 ;
}

.app{
  padding: 20px;
}
</style>