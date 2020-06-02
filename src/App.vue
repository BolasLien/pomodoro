<template>
  <div id="app" class="vh-100 d-flex flex-column">
    <div id="app-head" class="container">
      <div class="row">
        <div class="col text-center p-0">
          <h1 class="bg-danger">番茄鐘</h1>
        </div>
      </div>
    </div>
    <div id="app-content" class="container vw-100">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div id="app-footer" class="container fixed-bottom bg-danger">
      <div id="nav" class="row justify-content-center align-items-center h-100">
        <div class="col text-center">
          <router-link class="btn" to="/">
            <font-awesome-icon :icon="['fas','clock']" size="3x"></font-awesome-icon>
            <h6>Home</h6>
          </router-link>
        </div>
        <div class="col text-center">
          <router-link class="btn" to="/list">
            <font-awesome-icon :icon="['fas','tasks']" size="3x"></font-awesome-icon>
            <h6>Tasks</h6>
          </router-link>
        </div>
                <div class="col text-center">
          <router-link class="btn" to="/finish">
            <font-awesome-icon :icon="['fas','check']" size="3x"></font-awesome-icon>
            <h6>Finish</h6>
          </router-link>
        </div>
        <div class="col text-center">
          <router-link class="btn" to="/settings">
            <font-awesome-icon :icon="['fas','cog']" size="3x"></font-awesome-icon>
            <h6>Setting</h6>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
