//Utilidades para mosttar los datos de la aplicación en innteraccionHTML.html
//Funciones para interactuar con el DOM.

import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId (idElemento, valor) {

    let elemento = document.getElementById(idElemento);
    elemento.textContent = String(valor);
}

function mostrarGastoWeb (idElemento, gasto) {

    //Traer los gastos
    let gastos = gestionPresupuesto.listarGastos();

    for (let gasto of gastos) {
        
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
        divGasto.textContent = gasto.valor;
        divGasto.append(divGastoValor);
    
        let divGastoEtiquetas = document.createElement('div');
        divGastoEtiquetas.classList.add('gasto-etiquetas');
    
        gasto.etiquetas.forEach(function(etiqueta, indice, etiquetas) {

            let divGastoEtiqueta = document.createElement('span');
            divGastoEtiqueta.classList.add('gasto-etiquetas-etiqueta');
            divGastoEtiqueta.textContent = gasto.etiquetas[indice];
            divGastoEtiquetas.append(divGastoEtiqueta);
        });

        divGasto.append(divGastoEtiquetas);
    
        let elemento = document.getElementById(idElemento);
        elemento.append(divGasto);
    }
}


//idElemento es donde se insertará el conjunto de estructuras
//HTML creadas para cada gasto.
//agrup es el objeto que contiene las agrupaciones de gastos
//periodo es el periodo de agrupación
function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');

    for (let propiedad in agrup) {

        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.classList.add('agrupacion-dato');

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.classList.add('agrupacion-dato-clave');
        spanAgrupacionDatoClave.textContent = propiedad;
        divAgrupacionDato.append(spanAgrupacionDatoClave);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.classList.add('agrupacion-dato-valor');
        spanAgrupacionDatoValor.textContent = propiedad.value;
        divAgrupacionDato.append(spanAgrupacionDatoValor);
        
        divAgrupacion.append(divAgrupacionDato);
    }

    let elemento = document.getElementById(idElemento);
    elemento.appendChild(divAgrupacion);

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    }