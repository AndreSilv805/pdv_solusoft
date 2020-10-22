<template>
  <div >
  <b-navbar type="dark" variant="dark" class="mb-6">
    <b-navbar-nav>
      <b-nav-item @click="$router.push('/home')">HOME</b-nav-item>
      <b-nav-item @click="$router.push('/clientes')">Clientes</b-nav-item>
      <b-nav-item @click="$router.push('/produtos')">Produtos</b-nav-item>
      <b-nav-item @click="$router.push('/pedidos')">Pedidos</b-nav-item>
    </b-navbar-nav>
  </b-navbar>

    <router-view/>

  </div>
</template>

