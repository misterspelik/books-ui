<template>
  <div id="app">
    <el-button @click="$refs.table.getTableData()">Refresh</el-button>
    <data-table :get-data="getData"
                ref="table"
                :columns="columns"> 
        <div slot="Operations" slot-scope="{row}">
            <el-button @click="handleDelete(row)" type="text" size="small">Delete</el-button>
        </div>
    </data-table>
  </div>
</template>
<script>
import DataTable from "../../components/DataTable";

import UserService from '../../services/user-service'

export default {
  name: "Users",
  components: {
    DataTable
  },
  data() {
    return {
      columns: [
        {
          prop: "role",
          label: "Role",
          minWidth: "100",
          sortable: true
        },  
        {
          prop: "name",
          label: "Name",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "family",
          label: "Lastname",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "email",
          label: "Email",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "birth",
          label: "Birthday",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "gender",
          label: "Gender",
          minWidth: "80",
          sortable: true
        },
        {
          fixed: "right",
          label: "Operations",
          width: "150"
        }
      ]
    };
  },
  methods: {
    getData({ page, query, sortParams }) {
      return UserService.list({
        page,
        sort: sortParams
      }).then(response => {
          return {
            data: response.data,
            total: response.meta.total
          };
      })
    },
    handleDelete(row) {
      let that = this

      this.$confirm(`Deleting a user ${row.name}. Are you sure?`)
        .then(_ => {
            UserService.delete(row.id).then(response => {
                if (response.data.deleted) {
                    that.$refs.table.getTableData()
                }
            })
        })
        .catch(
            _ => {}
        );
    }
  }
};
</script>

<style>

</style>
