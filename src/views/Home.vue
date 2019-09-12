<template>
  <div class="home">
    <LoadingState v-if="LoadingState"/>
    <ul class="fileList" v-else>
        <component  v-for="(entry,index) in fileStructure" v-bind:key="index" :entry="entry" v-bind:is="entry['.tag']"/>
    </ul>
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
      LoadingState: true,
      path: ''
    };
  },
  components: {
    LoadingState,
    Folder,
    File
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
          //console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
      let asd = this;
      dbx
        .filesListFolder({ path: path })
        .then(function(response) {
          self.fileStructure = response.entries;
          console.log(self.fileStructure);
          //console.log(response.entries);
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
          console.log(response);
          // self.fileStructure = response.entries;
          // console.log(self.fileStructure);
          //console.log(response.entries);
        })
        .catch(function(error) {
          console.error(error);
        });
      
   }
         
    
  },
  created() {
    let self = this;
    console.log(self.LoadingState)
    setTimeout(function() {
      self.LoadingState = false;
    }, 500);
    this.getFolderStructure('');

    this.downloadFile('/get started with dropbox.pdf');
  }
};
</script>
<style scoped>
.fileList {
  list-style-type: none;
}

</style>
