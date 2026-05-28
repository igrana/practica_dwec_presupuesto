//Programa de ejemplo para generar un conjunto de 
//gastos y mostrar info relacionada con estos.
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';


const nuevoValor = 1500;

gestionPresupuesto.actualizarPresupuesto(nuevoValor);

let presupuestoPintado = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presupuestoPintado);

let elementoPrueba = document.getElementById('elemento-prueba');

let nombreGasto = 0;


let infoGastos = [
    ["Compra carne", 23.44, "2021-10-06", "casa", "comida"],
    ["Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"],
    ["Bonobús", 18.60, "2020-05-26", "transporte"],
    ["Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"],
    ["Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"],
    ["Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"],
]


infoGastos.forEach(infoGasto => {
    let gasto = new gestionPresupuesto.CrearGasto(...infoGasto);
    gestionPresupuesto.anyadirGasto(gasto);
})

let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gastosTotales);

let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', balanceTotal);

let listadoGastosCompleto = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', listadoGastosCompleto)

const filtro1 = {
    fechaDesde: '2021-09',
    fechaHasta: '2021-09'
}

const filtro2 = {
    valorMinimo: 50
}

const filtro3 = {
    valorMinimo: 200,
    etiquetasTiene: ['seguros']
}

const filtro4 = {
    valorMaximo: 50,
    etiquetasTiene: ['comida', 'transporte']
}

let gastosFiltrados1 = gestionPresupuesto.filtrarGastos(filtro1);
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gastosFiltrados1);

let gastosFiltrados2 = gestionPresupuesto.filtrarGastos(filtro2);
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastosFiltrados2);

let gastosFiltrados3 = gestionPresupuesto.filtrarGastos(filtro3);
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastosFiltrados3);

let gastosFiltrados4 = gestionPresupuesto.filtrarGastos(filtro4);
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastosFiltrados4);


gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'), 'dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos('mes'), 'mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos('anyo'), 'anyo');