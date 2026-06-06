//Utilidades para mosttar los datos de la aplicación en innteraccionHTML.html
//Funciones para interactuar con el DOM.
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor) {

    let elemento = document.getElementById(idElemento);
    elemento.textContent = String(valor);
}

function mostrarGastoWeb (idElemento, gasto) {

    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.classList.add('gasto-descripcion');
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement('div');
    divGastoFecha.classList.add('gasto-fecha');
    let objetoFecha = new Date(gasto.fecha);
    divGastoFecha.textContent = objetoFecha.toLocaleDateString();
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.classList.add('gasto-valor');
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.classList.add('gasto-etiquetas');

    gasto.etiquetas.forEach(function(etiqueta, indice, etiquetas) {

        let divGastoEtiqueta = document.createElement('span');
        divGastoEtiqueta.classList.add('gasto-etiquetas-etiqueta');
        divGastoEtiqueta.textContent = etiqueta;

        let objetoBorrarEtiquetas = new BorrarEtiquetasHandle(gasto, etiqueta);
        divGastoEtiqueta.addEventListener('click', objetoBorrarEtiquetas);

        divGastoEtiquetas.append(divGastoEtiqueta);
    });

    divGasto.append(divGastoEtiquetas);

    //Creación del botón Editar
    let buttonEditar = document.createElement('button');
    buttonEditar.type = 'button';
    buttonEditar.textContent = 'Editar';
    buttonEditar.classList.add('gasto-editar');

    let nuevoObjetoEditar = new EditarHandle(gasto);
    buttonEditar.addEventListener('click', nuevoObjetoEditar)

    divGasto.append(buttonEditar);

    //Creación del botón Borrar
    let buttonBorrar = document.createElement('button');
    buttonBorrar.type = 'button';
    buttonBorrar.textContent = 'Borrar';
    buttonBorrar.classList.add('gasto-borrar');

    let nuevoObjetoBorrar = new BorrarHandle(gasto);
    buttonBorrar.addEventListener('click', nuevoObjetoBorrar);

    divGasto.append(buttonBorrar);

    //O

    elemento.append(divGasto);
}


//idElemento es donde se insertará el conjunto de estructuras
//HTML creadas para cada gasto.
//agrup es el objeto que contiene las agrupaciones de gastos
//periodo es el periodo de agrupación
function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');

    function periodoToString(periodo) {
        if (periodo === 'anyo') {
            return 'año';
        }

        if (periodo === 'mes') {
            return 'mes';
        }

        if (periodo === 'dia') {
            return 'día';
        }
    }

    let h1Agrupacion = document.createElement('h1');
    h1Agrupacion.textContent = `Gastos agrupados por ${periodoToString(periodo)}`
    divAgrupacion.append(h1Agrupacion);

    for (let propiedad in agrup) {

        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.classList.add('agrupacion-dato');

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.classList.add('agrupacion-dato-clave');
        spanAgrupacionDatoClave.textContent = propiedad;
        divAgrupacionDato.append(spanAgrupacionDatoClave);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.classList.add('agrupacion-dato-valor');
        spanAgrupacionDatoValor.textContent = agrup[propiedad];
        divAgrupacionDato.append(spanAgrupacionDatoValor);
        
        divAgrupacion.append(divAgrupacionDato);
    }

    let elemento = document.getElementById(idElemento);
    elemento.appendChild(divAgrupacion);
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt('Introduzca el nuevo presupuesto', '1500')
    nuevoPresupuesto = Number(nuevoPresupuesto);

    if  (!isNaN(nuevoPresupuesto) && (nuevoPresupuesto >= 0)) {
        gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
        repintar();
    }
}

function pintarPresupuesto() {
    let presupuestoPintado = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuestoPintado);
}

function pintarGastosTotales() {
    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId('gastos-totales', gastosTotales);
}

function pintarBalanceTotal() {
    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId('balance-total', balanceTotal);
}

function pintarListadoGastos() {
    let listadoGastos = gestionPresupuesto.listarGastos();
    listadoGastos.forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    })
}

//Actualiza toda la página (menos filtrados y agrupaciones por simplificar)
function repintar() {

    pintarPresupuesto();
    pintarGastosTotales();
    pintarBalanceTotal();

    //Limpiar el contenedor
    let contenedorListadoGastos = document.getElementById('listado-gastos-completo');
    contenedorListadoGastos.innerHTML = '';

    pintarListadoGastos();

}

function nuevoGastoWeb() {
    let nuevaDescripcion = prompt('Inserte la nueva descrpción');

    let nuevoValor = prompt('Inserte el nuevo valor');
    nuevoValor = Number(nuevoValor);

    let nuevaFecha = prompt('Inserte la nueva fecha en formato yyyy-mm-dd');

    let nuevasEtiquetas = prompt('Inserte las nuevas etiquetas en formato etiqueta1,etiqueta2,etiqueta3');
    nuevasEtiquetas = nuevasEtiquetas.split(",");

    let nuevoGasto = new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEtiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}

//Función que se utiliza como objeto manejador de eventos para editar un gasto
//que se enviará desde el botón.
function EditarHandle(gasto) {

    //Guardar el gasto como propiedad en el objeto manejador:
    this.gasto = gasto;

    this.handleEvent = function(event) {

        let nuevaDescripcion = prompt('Inserte la nueva descrpción', 
            this.gasto.descripcion);

        let nuevoValor = prompt('Inserte el nuevo valor', 
            this.gasto.valor);

        nuevoValor = Number(nuevoValor);

        let nuevaFecha = prompt('Inserte la nueva fecha en formato yyyy-mm-dd', 
            this.gasto.fecha);

        let nuevasEtiquetas = prompt('Inserte las nuevas etiquetas en formato etiqueta1,etiqueta2,etiqueta3',
            this.gasto.etiquetas);

        nuevasEtiquetas = nuevasEtiquetas.split(",");

        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    };
}

function BorrarHandle(gasto) {

    //Guardar el gasto como propiedad en el objeto manejador:
    this.gasto = gasto;

    this.handleEvent = function(event) {
        let idGastoBorrar = this.gasto.id;
        gestionPresupuesto.borrarGasto(idGastoBorrar);
        repintar();
    }
}

function BorrarEtiquetasHandle(gasto, etiqueta) {

    this.gasto = gasto;
    this.etiqueta = etiqueta;

    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function inicializarEventos() {
    let btnactualizarpresupuesto =  document.getElementById('actualizarpresupuesto');
    btnactualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);

    let btnanyadirgasto = document.getElementById('anyadirgasto');
    btnanyadirgasto.addEventListener('click', nuevoGastoWeb);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    repintar,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    inicializarEventos
    }