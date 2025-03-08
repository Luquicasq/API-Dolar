async function obtener_datos() {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    const data = await response.json();
    return data;
  }

function ordenar_datos(data){
    const ordenDeseado = ["Oficial", "Blue", "Cripto", "Tarjeta", "Contado con liquidación", "Mayorista"];
    data = data.filter(cotizacion => ordenDeseado.includes(cotizacion.nombre));
    data.sort((a, b) => ordenDeseado.indexOf(a.nombre) - ordenDeseado.indexOf(b.nombre));
    return data;
}

function generar_tarjetas(data){
    const div_cotizaciones = document.createElement("div");
    div_cotizaciones.classList.add("div-cotizaciones");

    const main = document.querySelector("main");
    main.appendChild(div_cotizaciones);


    data.forEach(cotizacion => {
        let nombre_mostrado = cotizacion.nombre === "Contado con liquidación" ? "Liqui": cotizacion.nombre;

        //Div cotizacion
        const div_cotizacion = document.createElement("div");
        div_cotizacion.classList.add("cotizacion");
        div_cotizaciones.appendChild(div_cotizacion);

        //h2
        const titulo = document.createElement("h2");
        titulo.classList.add("titulo-cotizacion");
        div_cotizacion.appendChild(titulo);
        titulo.textContent = "Dólar " + nombre_mostrado;

        //Div valores
        const div_valores = document.createElement("div");
        div_valores.classList.add("valores");
        div_cotizacion.appendChild(div_valores);
        
        //p
        const compra = document.createElement("p");
        const venta = document.createElement("p");
        compra.classList.add("compra");
        venta.classList.add("venta");
        div_valores.appendChild(compra);
        div_valores.appendChild(venta);
        compra.textContent = "Compra: $";
        venta.textContent = "Venta: $";

        //span
        const span_compra = document.createElement("span");
        const span_venta = document.createElement("span");
        span_compra.classList.add("valor");
        span_venta.classList.add("valor");
        compra.appendChild(span_compra);
        venta.appendChild(span_venta);
        span_compra.textContent = cotizacion.compra;
        span_venta.textContent =  cotizacion.venta;

    });
}

async function index(){
    const data = await obtener_datos();
    const data_ordenada = ordenar_datos(data);
    generar_tarjetas(data_ordenada);
}

document.addEventListener("DOMContentLoaded", function() {
    index();
    document.getElementById("year").textContent = new Date().getFullYear();
});