let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (!(isNaN(valor)) && (valor >= 0 )){
        presupuesto = valor;
        return valor;
    } else {
        console.log('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto}€`;
}

function Gasto (descripcion, valor) {

    this.descripcion = (typeof descripcion === 'strig') ? descripcion : null;
    this.valor = (!(isNaN(valor)) && (valor >= 0)) ? valor : 0;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor}€`;
    };

    this.actualizarDescripcion = function(descripcionIntroducida) {
        if (typeof descripcionIntroducida === 'string'){
            this.descripcion = descripcionIntroducida;
        }
    };

    this.actualizarValor = function(valorIntroducido) {
        this.valor = ((!(isNaN(valor)) && (valor >= 0))) ? valorIntroducido : valor;
    }
}

function listarGastos() {

    return gastos;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

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