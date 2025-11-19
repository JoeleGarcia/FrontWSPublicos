<template>
  <div id="app">
    <header class="app-header">
      <div class="logo">
        <h1>Sistema de Servicios Financieros</h1>
      </div>
      <nav class="main-nav">
        <!-- <router-link to="/">Inicio</router-link>
        <router-link to="/tasa-cambio">Tasa Cambio</router-link>
        <router-link to="/inflacion">Inflación</router-link>
        <router-link to="/salud-financiera">Salud Financiera</router-link>
        <router-link to="/historial-crediticio">Historial Crediticio</router-link> -->
        <router-link to="/reporte-uso">Reporte de Uso</router-link>
      </nav>
    </header>
    
    <main class="app-main">
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>© 2023 Sistema de Servicios Financieros | Todos los derechos reservados</p>
      <p>Desarrollado con Vue.js y .NET</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.main-nav a {
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.main-nav a:hover {
  background-color: #3498db;
}

.main-nav a.router-link-exact-active {
  background-color: #3498db;
  font-weight: bold;
}

.app-main {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

.app-footer p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}
</style>