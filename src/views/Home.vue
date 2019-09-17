<template>
  <div class="home">
    <div>{{this.$store.getters.getCount}}</div>
    <button v-on:click="add()">ADD</button>
    <button v-on:click="addAction()">Action</button>
    <div class="breadcrumbs">
      <div
        class="folder"
        v-for="(path,index) in pathArray"
        v-bind:key="index"
        v-on:click="changePath(index)"
      >{{ path ? "/"+path : "Home"}}</div>
    </div>
    <LoadingState v-if="LoadingState" />
    <div class="fileList" v-else>
      <component
        v-for="(entry,index) in fileStructure"
        v-on:click.native="navigateToPage(entry.path_display)"
        v-bind:key="index"
        :entry="entry"
        v-bind:is="entry['.tag']"
      />
    </div>
  </div>
</template>

<script>
import LoadingState from "@/components/LoadingState.vue";
import Folder from "@/components/Folder.vue";
import File from "@/components/File.vue";

export default {
  data() {
    return {
      fileStructure: [],
      paths: [],
      LoadingState: true,
      path: "",
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
      return this.path.split("/");
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath == "/") {
        this.getFolderStructure("");
      } else {
        this.getFolderStructure(to.fullPath);
      }
    }
  },
  methods: {
    add(){
      this.$store.commit('ADD',10);
    },
    addAction() {
      this.$store.dispatch("addCount");
    },
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
      this.path = e;
      this.$router.push(e);
    },
    changePath(index) {
      this.newPath = "";
      for (let i = 1; i <= index; i++) {
        this.newPath += "/" + this.pathArray[i];
      }
      if (this.newPath == "") {
        this.$router.push("/");
      }
      if (this.newPath != this.$route.path) {
        this.$router.push(this.newPath);
      }
      this.path = this.newPath;
    }
  },
  created() {
    let self = this;
    if (this.$route.path == "/" || this.$route.path == "/home") {
      this.path = "";
    } else {
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.folder {
  cursor: pointer;
}
.breadcrumbs {
  display: flex;
  margin-bottom: 20px;
  font-weight: lighter;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
span {
  color: blue;
}
</style>
