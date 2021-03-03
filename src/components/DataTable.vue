<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      v-bind="$attrs"
      v-on="listeners"
      style="width: 100%">
      <slot name="columns">
        <el-table-column
          :sortable="column.sortable ? 'custom' : false"
          v-for="column in columns"
          :key="column.prop"
          v-bind="column"
          >
          <template slot-scope="{row}">
            <slot :name="column.prop || column.type || column.label" :row="row">
              {{row[column.prop]}}
            </slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <slot name="pagination" :page="page" :total="total">
      <el-pagination 
        v-model="page"
        :total="total"
        @current-change="getTableData"
        layout="prev, pager, next"
        >
      </el-pagination>
    </slot>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    getData: {
      type: Function,
      default: () => Promise.resolve([])
    },
    filters: {
        type: Object
    }
  },
  data() {
    return {
      tableData: [],
      page: 1,
      total: 10,
      sortParams: [],
      loading: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        ["sort-change"]: this.onSortChange
      };
    }
  },
  methods: {
    async getTableData(page) {
      this.loading = true;
      let reqPage = page || this.page;
      try {
        let response = await this.getData({
          page: reqPage,
          sortParams: this.sortParams,
          filters: this.filters
        });
        this.tableData = response.data;
        this.total = response.total;
      } finally {
        this.loading = false;
      }
    },
    onSortChange({ column, prop, order }) {
      if (prop !== null) {
        let shortOrder = order === "ascending" ? "asc" : "desc";
        this.sortParams = [`${prop}|${shortOrder}`];
      } else {
        this.sortParams = [];
      }
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
