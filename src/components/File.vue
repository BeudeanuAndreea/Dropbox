<template>
  <li class="files">
    <font-awesome-icon v-if="entry['.tag'] == 'file'" icon="file" class="icon fileIcon"></font-awesome-icon>
    <span>{{entry.name}}</span>
    <a class="download" v-on:click="$parent.downloadFile(entry.path_lower)">Download</a>
  </li>
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
}
.download {
  margin-left: 10px;
  cursor: pointer;
  color: blue;
  font-size: 10px;
}
</style>