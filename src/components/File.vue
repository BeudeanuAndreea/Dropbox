<template>
  <div class="files">
    <font-awesome-icon v-if="entry['.tag'] == 'file'" icon="file" class="icon fileIcon"></font-awesome-icon>
    <span>{{entry.name}}</span>
    <font-awesome-icon class="download" v-on:click="$parent.downloadFile(entry.path_lower)" icon="cloud-download-alt"></font-awesome-icon>
  </div>
</template>
<script>
export default {
  props: {
    entry: Object
  },
  methods: {}
};
</script>
<style scoped>
.fileIcon {
  color: rgb(150, 156, 161);
  margin-right: 5px;
}
.files {
  cursor: pointer;
  border-top: 1px solid rgb(207, 207, 207);
  padding: 10px;
  width: 300px;
  position: relative;
}
.download {
  margin-left: 10px;
  cursor: pointer;
  color: rgb(152, 152, 156);
  font-size: 15px;
  position: absolute;
  right: 0;
}
</style>