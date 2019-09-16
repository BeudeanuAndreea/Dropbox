<template>
  <div class="home">
    <div class='breadcrumbs'>
      <div class='folder'  v-for="(path,index) in paths" v-bind:key ="index" v-on:click ="changePath(path)">{{"/"+ path}}</div>
    </div>
    <LoadingState v-if="LoadingState"/>
    <div class="fileList" v-else>
        <component  v-for="(entry,index) in fileStructure" v-on:click.native="navigateToPage(entry.path_display)" v-bind:key="index" :entry="entry" v-bind:is="entry['.tag']"   />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LoadingState from "@/components/LoadingState.vue";
import Folder from "@/components/Folder.vue";
import { setTimeout } from "timers";
import File from "@/components/File.vue";

export default {
  data() {
    return {
      fileStructure: [],
      paths: [],
      LoadingState: true,
      path: '',
      newPath: " "
    };
  },
  components: {
    LoadingState,
    Folder,
    File
  },
  computed: {
    pathArray: function() {
    //   this.paths = this.$route.path.split('/');
    //   this.paths.splice(0, 1, 'Home');
    //     console.log('compute this', this.$route.path, this.paths)
    //   this.paths = this.paths.filter((item) => {
    //     return item !== '';
    //   });
     
    // //  return this.path.split("/");
    //   return this.paths;
    }
    
    
  },
  mounted(){
    this.paths = this.$route.path.split('/').filter((item) => {
      return item !== '';
    });
    console.log(this.paths)
    this.paths.splice(0, 1, 'Home');
    // this.paths = ['asd']
    // console.log(currentPath);
  },
  methods: {
    getFolderStructure(path) {
      let self = this;
      var Dropbox = require("dropbox").Dropbox;
      let ACCESS_TOKEN =
        "Gec_gkL8oEAAAAAAAAAAVkT645DyRB8V7IiMzsXAs8yL4-vgRUa67Fe6KegNzBsl";
      var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

      dbx
        .usersGetCurrentAccount()
        .then(function(response) {
          //
        })
        .catch(function(error) {
          console.error(error);
        });
      let asd = this;
      dbx
        .filesListFolder({ path: path.toLowerCase() })
        .then(function(response) {
          self.fileStructure = response.entries;
          // console.log(response);

          
          
        })
        .catch(function(error) {
          console.error(error);
        });
      
    },
    downloadFile(path) {
       var Dropbox = require("dropbox").Dropbox;
       let ACCESS_TOKEN =
        "Gec_gkL8oEAAAAAAAAAAVkT645DyRB8V7IiMzsXAs8yL4-vgRUa67Fe6KegNzBsl";
      var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
     dbx
        .filesGetTemporaryLink({ path: path })
        .then(function(response) {
          window.open(response.link);
        })
        .catch(function(error) {
          console.error(error);
        });
      
   },
   navigateToPage(e) {
     const s = e.substr(1);
    //  if(e['.tag']=='folder'){
      //  this.path = e;
      //  this.$router.push(e);

      //  this.paths = e.split('/');
      //  this.paths.splice(0, 1, 'Home');

      //  const keys = 
      this.paths.push(s.split('/').pop());
      console.log('33333333333333', `--${s}--${this.paths.join('/')}--`);
// debugger
      
      this.$router.push({ path: this.paths.join('/') });
      // window.location.href = this.paths.join('/');
       

    //  }
    //  else {
    //    console.log("nu e folder.");
    //  }

   },
   changePath(index) {
     console.log('1');
     this.newPath="";
     console.log('zzzzzzzzzzzz', `/${index}`);
    //  this.pathh(`/${index}`);

    //  for(let i = 1; i <= index ;i++) {
    //   this.newPath += "/"+ this.pathArray[i];
    //  }
    // this.pathArray = this.newPath.split("/"); 
    const andreeaPath = this.paths.join('/');
    console.log('asdasdasd', andreeaPath);
    this.$router.push(andreeaPath)
    this.path = this.newPath;
    this.getFolderStructure(this.newPath)
    // console.log(this.pathArray);
   }

         
    
  },
  created() {
    // console.log(this.pathArray)
    let self = this;
    if(this.$route.path == "/" || this.$route.path == "/home"){
      this.path ="";
    

    }
    else{
      this.path = this.$route.path;
    }
    setTimeout(function() {
      self.LoadingState = false;
    }, 500);
    this.getFolderStructure(this.path);
  }
};
</script>
<style scoped>

.fileList {
  list-style-type: none;
  font-weight: lighter;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.folder {
  cursor:pointer;
}
.breadcrumbs {
  display: flex;
  margin-bottom: 20px;
  font-weight: lighter;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
span{
  color: blue;
}


</style>
