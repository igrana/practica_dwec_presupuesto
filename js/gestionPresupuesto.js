// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if (!isNaN(valor) && (valor >= 0)) {
        presupuesto = valor;
        //Devuelve presupuesto para confirmar que no hay error
        return presupuesto;
    } else {
        //alert daba error y lo cambio por console.log
        console.log('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO

    this.descripcion = (typeof descripcion === 'string') ? descripcion : null;

    this.valor = (!isNaN(valor) && (valor >= 0)) ? valor : 0;

    //Si ...etiquetas no se pasa a la función se crea un array vacío igual.
    this.etiquetas = [...etiquetas];

    //Si la fecha es correcta la guarda y si no, guarda la fecha actual.
    this.fecha = (!isNaN(Date.parse(fecha))) ? Date.parse(fecha) : new Date().getTime();

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`+
        `Fecha: ${this.mostrarFechaLocal()}\nEtiquetas:${this.listarEtiquetas()}\n`
    }

    this.mostrarFechaLocal = function() {
        this.fecha = new Date(this.fecha).toLocaleString();
        return this.fecha;
    }

    this.listarEtiquetas = function() {
        let listaEtiquetas = '';
        for (let etiqueta of this.etiquetas) {
            listaEtiquetas += `\n- ${etiqueta}`;
        }
        return listaEtiquetas;
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    
    this.actualizarFecha = function(nuevaFecha) {
        if (!isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let nuevaEtiqueta of nuevasEtiquetas) {
            let esDuplicada = false;

            for (let etiqueta of this.etiquetas) {
                if (etiqueta == nuevaEtiqueta) {
                    esDuplicada = true;
                    break;
                }
            }
            if (!esDuplicada) {
                this.etiquetas.push(nuevaEtiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasParaBorrar) {
        for (let etiquetaParaBorrar of etiquetasParaBorrar) {
            for (let etiqueta of this.etiquetas) {
                if (etiqueta == etiquetaParaBorrar) {
                    let indiceBorrar = this.etiquetas.indexOf(etiqueta);
                    this.etiquetas.splice(indiceBorrar, 1);
                }
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        //Transformar el timestamp en fecha
        let fecha = new Date(this.fecha);
        const year = fecha.getFullYear();

        //Formato del mes tipo 01, 02 ... 12
        let month = fecha.getMonth()+1;
            if (month < 10) {month = `0${month}`;} 

        //Formato del día tipo 01, 02...31
        let day = fecha.getDate();
            if (day < 9) {day = `0${day}`;}

        if (periodo === 'anyo') {
            return year;
        } else if (periodo === 'mes') {
            return `${year}-${month}`;
        } else if (periodo === 'dia'){
            return `${year}-${month}-${day}`;
        };
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto); 
}

function borrarGasto(id) {
    let indexGastoEliminar = undefined;
    for (let gasto of gastos) {
        if (gasto.id === id) {
        indexGastoEliminar = gastos.indexOf(gasto);
            break;
        }
    }
    
    if (indexGastoEliminar !== undefined) {
        gastos.splice(indexGastoEliminar, 1);
    }
}

function calcularTotalGastos() {
    let totalGastos = 0.0;
    for (let gasto of gastos) {
        totalGastos += Number(gasto.valor);
    }
    return totalGastos;
}

function calcularBalance() {
    return (presupuesto - calcularTotalGastos());
}

function filtrarGastos() {

};

function agruparGastos() {

}

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
}

