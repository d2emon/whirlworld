<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3">Dashboard</b-nav-item>
      <b-nav-item class="px-3">Users</b-nav-item>
      <b-nav-item class="px-3">Settings</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </template>
        <b-dropdown-header tag="div" class="text-center dropdown-menu-lg"><strong>You have 5 notifications</strong></b-dropdown-header>
        <b-dropdown-item><i class="icon-user-follow text-success"></i> New user registered</b-dropdown-item>
        <b-dropdown-item><i class="icon-user-unfollow text-danger"></i> User deleted</b-dropdown-item>
        <b-dropdown-item><i class="icon-chart text-info"></i> Sales report is ready</b-dropdown-item>
        <b-dropdown-item><i class="icon-basket-loaded text-primary"></i> New client</b-dropdown-item>
        <b-dropdown-item><i class="icon-speedometer text-warning"></i> Server overloaded</b-dropdown-item>
        <b-dropdown-header tag="div" class="text-center"><strong>Server</strong></b-dropdown-header>
        <b-dropdown-item>
          <div class="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>
          <b-progress height={} class="progress-xs" variant="info" :value="25"></b-progress>
          <small class="text-muted">348 Processes. 1/4 Cores.</small>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>
          <b-progress height={} class="progress-xs" variant="warning" :value="70"></b-progress>
          <small class="text-muted">11444GB/16384MB</small>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>
          <b-progress height={} class="progress-xs" variant="danger" :value="95"></b-progress>
          <small class="text-muted">243GB/256GB</small>
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-list"></i>
          <b-badge pill variant="warning">15</b-badge>
        </template>
        <b-dropdown-header tag="div" class="text-center dropdown-menu-lg"><strong>You have 15 pending tasks</strong></b-dropdown-header>
        <b-dropdown-item>
          <div class="small mb-1">Upgrade NPM &amp; Bower <span class="float-right"><strong>0%</strong></span></div>
          <b-progress height={} class="progress-xs" variant="info" :value="0"></b-progress>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="small mb-1">ReactJS Version <span class="float-right"><strong>25%</strong></span></div>
          <b-progress height={} class="progress-xs" variant="danger" :value="25"></b-progress>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="small mb-1">VueJS Version <span class="float-right"><strong>50%</strong></span></div>
          <b-progress height={} class="progress-xs" variant="warning" :value="50"></b-progress>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="small mb-1">Add new layouts <span class="float-right"><strong>75%</strong></span></div>
          <b-progress height={} class="progress-xs" variant="info" :value="75"></b-progress>
        </b-dropdown-item>
        <b-dropdown-item>
          <div class="small mb-1">Angular 2 Cli Version <span class="float-right"><strong>100%</strong></span></div>
          <b-progress height={} class="progress-xs" variant="success" :value="100"></b-progress>
        </b-dropdown-item>
        <b-dropdown-item class="text-center"><strong>View all tasks</strong></b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="icon-envelope-letter"></i>
          <b-badge pill variant="info">7</b-badge>
        </template>
        <div class="dropdown-menu-lg">
        <b-dropdown-header tag="div" class="text-center dropdown-menu-lg"><strong>You have 7 messages</strong></b-dropdown-header>

        <b-dropdown-item>
          <div class="message">
            <div class="py-3 mr-3 float-left">
              <div class="avatar">
                <img src="static/img/avatars/7.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
                <span class="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">John Doe</small>
              <small class="text-muted float-right mt-1">Just now</small>
            </div>
            <div class="text-truncate font-weight-bold"><span class="fa fa-exclamation text-danger"></span> Important message</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item>
          <div class="message">
            <div class="py-3 mr-3 float-left">
              <div class="avatar">
                <img src="static/img/avatars/6.jpg" alt="admin@bootstrapmaster.com" class="img-avatar">
                <span class="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">John Doe</small>
              <small class="text-muted float-right mt-1">Just now</small>
            </div>
            <div class="text-truncate font-weight-bold">Important message</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item>
          <div class="message">
            <div class="py-3 mr-3 float-left">
              <div class="avatar">
                <img src="static/img/avatars/5.jpg" alt="admin@bootstrapmaster.com" class="img-avatar">
                <span class="avatar-status badge-danger"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">Janet Doe</small>
              <small class="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item>
          <div class="message">
            <div class="py-3 mr-3 float-left">
              <div class="avatar">
                <img src="static/img/avatars/4.jpg" alt="admin@bootstrapmaster.com" class="img-avatar">
                <span class="avatar-status badge-info"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">Joe Doe</small>
              <small class="text-muted float-right mt-1">4:03 AM</small>
            </div>
            <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>

        <a role="menuitem" href="#" target="_self" class="dropdown-item text-center"><strong>View all messages</strong></a>

        <b-dropdown-item class="text-center"><strong>View all messages</strong></b-dropdown-item>
        </div>
      </b-nav-item-dropdown>

      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>

      <HeaderDropdown/>
    </b-navbar-nav>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>
</template>
<script>
import HeaderDropdown from './HeaderDropdown.vue'

export default {
  name: 'c-header',
  components: {
    HeaderDropdown
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
