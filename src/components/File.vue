<template>
  <div class="file">
    <font-awesome-icon v-if="entry['.tag'] == 'file'" icon="file" class="icon fileIcon"></font-awesome-icon>
    <span>{{entry.name}}</span>
    <font-awesome-icon class="download" v-on:click="downloadFile(entry)" icon="cloud-download-alt"></font-awesome-icon>
  </div>
</template>
<script>
export default {
  props: {
    entry: Object
  },
  methods: {
    downloadFile(entry){
      if(entry.link){
        window.open(entry.link);
      }else{
        console.log(entry.link);
        this.$store.dispatch("addTemporaryLink",entry);
      }
      
    }
  }
};
</script>
<style scoped>
.fileIcon {
  color: rgb(150, 156, 161);
  margin-right: 15px;
  font-size: 25px;
}
.file:not(:first-child) {
  cursor: pointer;
  border-top: 1px solid rgb(207, 207, 207);
  padding: 10px;
  width: 400px;
  position: relative;
}
.download {
  cursor: pointer;
  color: rgb(152, 152, 156);
  font-size: 15px;
  position: absolute;
  right: 0;
}
</style>