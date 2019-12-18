<template>
  <div class="shop">
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
            <option value="USD">USD</option>
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
              <h4>Precio: {{price | double}}&euro;</h4>
            </div>
          </div>
          <small id="amountHelp" class="form-text text-muted"
            >Introduzca la cantidad de llaveros que desea comprar</small
          >
          <br />
          <label for="amount">Cantidad</label>
          <input
            name="qty"
            type="number"
            v-model="qty"
            @input="updateTotal"
            id="qty"
            aria-describedby="amountHelp"
            placeholder="1"
          />
        </div>
        <br>
        Total {{model.amount | double}}
        <br>
        <br>
        <router-link
          class="buy-btn"
          :class="{'disabled' : model.amount==0}"
          :event="model.amount>0 ? 'click' : ''"
          :to="{ name: 'checkout', params: { model: model }}"
          >
          Comprar
        </router-link>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  data: () => ({
    qty: 0,
    price: 2000,
    model: {
      currency: "EUR",
      amount: 0
    }
  }),
  filters: {
    double: (val => {
      return val/100
    })
  },
  methods: {
    updateTotal() {
      this.model.amount = this.price * this.qty
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.buy-btn {
  color: blue;
}
.buy-btn.disabled {
  color: grey;
}
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
