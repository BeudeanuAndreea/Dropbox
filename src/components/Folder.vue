<template>
  <div class="folder">
    <font-awesome-icon v-if="entry['.tag'] == 'folder'" icon="folder" class="icon folderIcon"></font-awesome-icon>
    <span>{{entry.name}}</span>
  </div>
</template>
<script>
export default {
  props: {
    entry: Object
  }
};
</script>
<style scoped>
.folderIcon {
  color: rgb(168, 209, 243);
  margin-right: 15px;
  font-size: 25px;
}
.folder {
  cursor: pointer;
  border-top: 1px solid rgb(207, 207, 207);
  padding: 10px;
  width: 400px;
}
</style>