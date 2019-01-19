<template>
  <div class="menu-content">
    <h2>Modules</h2>
    <ul>
      <li>
        <a href="#/">
          List
        </a>
      </li>
      <li>
        <a href="#/install-module">
          Install new module
        </a>
      </li>
    </ul>
    <h2>App settings</h2>
    <ul>
      <li>
        <a>Notifications</a>
      </li>
      <li>
        <a class="active">Appearance</a>
      </li>
    </ul>
    <hr/>
    <ul>
      <li>
        <a>Changelog</a>
      </li>
      <li>
        <a>Log out</a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.menu-content {
  width: 175px;
  margin-right: 0;
  padding-top: 20px;
  margin-left: auto;
  padding-right: 10px;
}

h2 {
  color: #7A7A7A;
  font-weight: 400;
  font-size: 120%;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  padding: 10px;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  width: calc(100% - 24px);
  padding: 10px;
  margin-left: 4px;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
}

a:hover, a.active {
  font-weight: bold;
}

hr {
  border-bottom: 0;
  width: 140px;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
