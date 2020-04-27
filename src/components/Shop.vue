<template>
  <div class="shop">
    <!-- <Integration
      v-if="!checkout"
      :amount="amount"
      :currency="currency"
      @checkout="checkout = !checkout"
      @amount="e => amount = e"
      @currency="e => currency = e"
    />
    <Pwall v-else/> -->
    <div class="container">
      <form>
        <h1>Bienvenido a la tienda de prueba del Payment Wall</h1>
        <br />
        <div>
          <label for="currency">
            Seleccione la moneda en la que desea operar. Esta elección está
            habilitada para el usuario en el entorno de pruebas
          </label>
          <br /><br />
          <select id="currency" v-model="model.currency">
            <option disabled value="">Please select one</option>
            <option value="EUR">EUR</option>
          </select>
          <br />
          <span>Moneda seleccionada: {{ model.currency }}</span>
        </div>
        <br />
        <h3>Listado de productos</h3>
        <div>
          <div>
            <div>
              <img
                class="item"
                onclick="return check(this, 1)"
                height="90"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Llavero_bal%C3%B3n_de_plata.jpg/256px-Llavero_bal%C3%B3n_de_plata.jpg"
              />
              <p>Llavero balón de plata</p>
              <h4>Precio: 0,01&euro;</h4>
            </div>
          </div>
          <small id="amountHelp" class="form-text text-muted"
            >Introduzca la cantidad de llaveros que desea comprar</small
          >
          <br />
          <label for="amount">Cantidad</label>
          <input
            name="amount"
            type="number"
            v-model="model.amount"
            id="amount"
            aria-describedby="amountHelp"
            placeholder="1"
          />
        </div>
        <router-link to="/checkout" :model="model" tag="button"
          >Comprar</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  data: () => ({
    model: {
      currency: "",
      amount: 1,
      checkout: false
    }
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
