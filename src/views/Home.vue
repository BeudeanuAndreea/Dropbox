<template>
  <div class="home">
    <LoadingState v-if="LoadingState" />
    <div class="files" v-else>
      
    <div class="breadcrumbs" >
      <div
        class="folder"
        v-for="(path,index) in pathArray"
        v-bind:key="index"
        v-on:click="changePath(index)"
      >
      <font-awesome-icon v-if="index !== 0" class="angle-right" icon="angle-right"></font-awesome-icon>
      <span class="item">{{ path ? path : "Home"}}</span>
      </div>
    </div>
    <LoadingState v-if="LoadingState" />
    <div class="fileList" v-else>
      <template v-if="fileStructure">
        <component
          v-for="(entry,index) in fileStructure.data"
          v-on:click.native="navigateToPage(entry.path_display)"
          v-bind:key="index"
          :entry="entry"
          v-bind:is="entry['.tag']"
        />
      </template>
    </div>
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
      LoadingState: true,
      path: "",
      redirectPath: "",
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
    },
    fileStructure: {
      get: function() {
          return this.$store.getters.getRoute(this.path);
      }
    }
  },
  watch: {
    $route(to, from) {
        this.verifyStoreRoutes();
    }
  },
  methods: {
    verifyStoreRoutes() {
      let exist = false;
      let storeRoutes = this.$store.getters.getRouteArray;
      for (let i = 0; i < storeRoutes.length; i++) {
        if (storeRoutes[i].path == this.path) {
          exist = true;
        }
      }
      if(exist = false) {
        if (this.$route.path == "/" || this.$route.path == "/home") {
          this.path = "";
        } else {
          this.path = this.$route.path;
        }
        this.$store.dispatch("setDropboxData", this.path);
        
      }
    },
    navigateToPage(clickedItemPath) {
      this.path = clickedItemPath;
      this.$router.push(clickedItemPath);
  
    },
    changePath(clickedItemPosition) {
      this.redirectPath = "";
      for (let i = 1; i <= clickedItemPosition; i++) {
        this.redirectPath += "/" + this.pathArray[i];
      }
      if ((this.redirectPath == "" ) && (this.$route.path != '/')) {
        this.$router.push("/");
      }
      if ((this.redirectPath != this.$route.path) && (this.redirectPath != '')) {
        this.$router.push(this.redirectPath);
      }
      this.path = this.redirectPath;
    }
  },
  created() {
    let self = this;
    setTimeout(function() {
      self.LoadingState = false;
    }, 2000);

    this.verifyStoreRoutes();
  }
};
</script>
<style scoped>
.home {
  display: flex;
}
.angle-right{
  margin: 0 5px;
  font-weight: lighter;
  color: rgb(177, 177, 177);
}
.files {
  margin: auto;
}
.fileList {
  list-style-type: none;
  font-weight: lighter;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
}
.item {
  border-bottom: 1px solid rgb(177, 177, 177);
}

.folder {
  cursor: pointer;
}
.breadcrumbs {
  display: flex;
  margin-bottom: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  
}

</style>
