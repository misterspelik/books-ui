<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" >
          <li class="nav-item" v-for="(route, key) in routes" v-bind:key="route.path">
            <router-link :to="{ name : route.path }" :key="key" class="nav-link">{{route.name}}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
      </ul>      
    </div>
  </nav>
</template>
<script>
  import UserService from '../services/user-service'
  export default {
    data() {
      return {
        routes: [
          { name: 'Users', path: 'admin.dashboard.users' },
          { name: 'Reports', path: 'admin.dashboard.reports' }
        ]
      }
    },
    methods:{
      logout() {
          UserService.logout().then(_ => {
            document.location.href = '/admin/login'
          })
      }
    }
  }
</script>

<style>
.navbar {
  margin-bottom: 30px;
}
.nav-item {
  display: inline;
  margin-right: 30px;
}
</style>
