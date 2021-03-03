<template>
  <div id="app">
    <el-form ref="form" :model="filterForm" label-width="120px" size="mini">
      <el-form-item label="Age">
          <el-input v-model="filterForm.user.age" placeholder="Age"></el-input>
      </el-form-item>
      <el-form-item label="Role">
          <el-input v-model="filterForm.user.role" placeholder="Role"></el-input>
      </el-form-item>
      <el-form-item label="Gender">
          <el-input v-model="filterForm.user.gender" placeholder="Gender"></el-input>
      </el-form-item>
      <el-form-item label="Users reading Lines">
          <el-input v-model="filterForm.linesReads.more_than" placeholder="More than"></el-input>
      </el-form-item>
      <el-form-item label="Users reading Lines between dates">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="filterForm.linesReads.from" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="filterForm.linesReads.to" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Users reading Time">
          <el-input v-model="filterForm.timesReads.more_than" placeholder="More than"></el-input>
      </el-form-item>
      <el-form-item label="Users reading Time between dates">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="filterForm.timesReads.from" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="filterForm.timesReads.to" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
       <el-form-item label="Users Transactions">
          <el-input v-model="filterForm.transactions.more_than" placeholder="More than"></el-input>
      </el-form-item>
      <el-form-item label="Users Transactions between dates">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="filterForm.transactions.from" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="filterForm.transactions.to" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Type">
        <el-radio-group v-model="filterForm.transactions.type" size="medium">
          <el-radio border label="All"></el-radio>
          <el-radio border label="Lines"></el-radio>
          <el-radio border label="Time"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="medium">
        <el-button type="primary" @click="$refs.table.getTableData()">Filter</el-button>
      </el-form-item>
    </el-form>
    

    <data-table :get-data="getData"
              ref="table"
              :columns="columns"
              :filters="filterForm">
      <div slot="Operations" slot-scope="{row}">
          <el-button @click="handleDelete(row)" type="text" size="small">Delete</el-button>
      </div>
    </data-table>
  </div>
</template>
<script>
import DataTable from "../../components/DataTable";

import ReportService from '../../services/report-service'

export default {
  name: "Reports",
  components: {
    DataTable
  },
  data() {
    return {
      filterForm : {
        user: {
          age: null,
          role: null,
          gender: null
        },
        linesReads: {
          more_than: null,
          from: null,
          to: null
        },
        timesReads: {
          more_than: null,
          from: null,
          to: null
        },
        transactions: {
          more_than: null,
          from: null,
          to: null,
          type: 'all'
        }
      },
      columns: [
        {
          prop: "id",
          label: "ID",
          minWidth: "100",
          sortable: true
        },  
        {
          prop: "username",
          label: "Username",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "name",
          label: "Name",
          minWidth: "80",
          sortable: true
        },
        {
          prop: "family",
          label: "Family",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "line_reads_count",
          label: "LinesRead",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "minutes",
          label: "TimeRead",
          minWidth: "100",
          sortable: true
        },
        {
          prop: "reward",
          label: "Membership rewards",
          minWidth: "100",
          sortable: true
        }
      ]
    };
  },
  methods: {
    getData({ page, query, sortParams, filters }) {
      return ReportService.list({
        page,
        sort: sortParams,
        filters: filters
      }).then(response => {
          return {
            data: response.data,
            total: response.total
          };
      })
    },
    handleDelete(row) {
      let that = this

      this.$confirm(`Deleting a user ${row.name}. Are you sure?`)
        .then(_ => {
            
        })
        .catch(
            _ => {}
        );
    }
  }
};
</script>

<style>
.el-form {
  width: 60%;
}
</style>
