<template>
  <li class="folder" v-on:click="$parent.getFolderStructure(entry.path_lower)">
    <font-awesome-icon v-if="entry['.tag'] == 'folder'" icon="folder" class="icon folderIcon"></font-awesome-icon>
    <span>{{entry.name}}</span>
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
.folderIcon {
  color: rgb(168, 209, 243);
  margin-right: 5px;
}
.folder {
  cursor: pointer;
}
</style>