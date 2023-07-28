<template>
  <!-- <div v-for="role in roles" :key="role.keyword">
    {{ role.keyword }} - {{ role.name }} - {{ role.desc }}
  </div> -->
  <div style="padding: 15px;">
    <table>
      <thead>
        <tr>
          <th>keyword</th>
          <th>名称</th>
          <th>简介</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.keyword">
          <td>{{ role.keyword }}</td>
          <td>{{ role.name }}</td>
          <td>{{ role.desc }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMessagesStore } from "../../messagesStore"

const messagesStore = useMessagesStore();
const { messages } = storeToRefs(messagesStore);

interface Role {
  keyword?: string
  name: string
  desc: string
}

interface Columns {
  title: string
  dataIndex: string
  key: string
}

const roles = ref<Role[]>([])
const columns = ref<Columns[]>([])

columns.value = [
  {
    title: 'keyword',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '简介',
    dataIndex: 'desc',
    key: 'desc',
  },
],

  onMounted(async () => {
    messages.value.forEach((m) => {
      roles.value.push({
        keyword: m.roleKeyword,
        name: m.roleName,
        desc: m.roleDesc
      })
    })
  });
</script>

<style scoped>
.chat-box {
  background-color: #292421;
  margin: 10px 0 10px 0;
  padding: 20px 20px 5px 20px;
}

table,
th,
td {
  border: 1px solid black;
}

tr {
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  height: 10px;
}

td {
  text-align: left;
  height: 10px;
  vertical-align: bottom;
}
</style>
