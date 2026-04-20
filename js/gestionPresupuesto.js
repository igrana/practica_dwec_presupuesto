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
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto (descripcion, valor, fecha, ...etiquetas) {

    //Asegurarse de que es un string
    this.descripcion = (typeof descripcion === 'string') ? descripcion : null;

    this.valor = (!(isNaN(valor)) && (valor >= 0)) ? valor : 0;

    //Se comprueba si la fecha es válida viendo si Date.parse(fecha) es un número
    this.esFechaValida = function(fecha) {
        return !isNaN(Date.parse(fecha));
    };
    //La fecha se almacena en timestamp (con Date.parse(fecha)) o se almacena el timestamp de la fecha actual (Date.now())
    this.fecha = (this.esFechaValida(fecha)) ? Date.parse(fecha) : Date.now();
    
    this.etiquetas = [...etiquetas];

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(descripcionIntroducida) {
        if (typeof descripcionIntroducida === 'string') {
            this.descripcion = descripcionIntroducida;
        }
    };

    this.actualizarValor = function(valorIntroducido) {
        this.valor = ((!(isNaN(valorIntroducido)) && (valorIntroducido >= 0))) ? valorIntroducido : this.valor;
    };

    this.mostrarGastoCompleto = function() {
        //El timestamp se transforma a objeto Date con new Date para que .toLocaleString() lo transforme
        //en una fecha válida con formato local.
       let gastoCompleto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`+
       `Fecha: ${new Date(this.fecha).toLocaleString()}\n`+
       `Etiquetas:\n${this.listarEtiquetas()}`

       return gastoCompleto;
    };

    this.listarEtiquetas = function() {
        let lista = ``;

        for (let etiqueta of this.etiquetas) {
            lista += `- ${etiqueta}\n`
        }

        return lista;
    };

    this.actualizarFecha = function(fechaActualizada) {
        this.fecha = (this.esFechaValida(fechaActualizada)) ? Date.parse(fechaActualizada) : this.fecha;
    };

    //Añadir etiquetas ignorando las duplicadas
    this.anyadirEtiquetas = function(...etiquetasAnyadidas) {

        for (let etiquetaAnyadida of etiquetasAnyadidas) {

            let esDuplicada = false;

            for (let etiqueta of this.etiquetas) {
                if (etiqueta === etiquetaAnyadida) {
                    esDuplicada = true;
                    break;
                }
            }

            if (!esDuplicada)
                this.etiquetas.push(etiquetaAnyadida);
        }
    };

    //Borrar etiquetas
    this.borrarEtiquetas = function(...etiquetasParaBorrar) {
        let etiquetasFiltradas = [];

        for (let etiquetaParaBorrar of etiquetasParaBorrar) {
            for (let etiqueta of this.etiquetas) {
                if (etiqueta !== etiquetaParaBorrar) {
                    etiquetasFiltradas.push(etiqueta);
                }
            }
            this.etiquetas = [...etiquetasFiltradas];
            etiquetasFiltradas = [];
        }
    };

    //Transformamos la fecha timestamp en un objeto fecha para aplicarle
    //los métodos:
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fecha = new Date(this.fecha);
       
        let anyo = fecha.getFullYear();
        let mes = (fecha.getMonth() + 1);
        let dia = fecha.getDate();

        if (String(mes).length === 1) {
            mes = '0' + mes;
        }
        if (String(dia).length === 1) {
            dia = '0' + dia;
        }
        if (periodo === 'dia') {
            return anyo + '-' + mes + '-' + dia;
        }
        if (periodo === 'mes') {
            return anyo + '-' + mes;
        }
        if (periodo === 'anyo') {
            return anyo;
        }

        return null;
    };
}

function listarGastos () {
    return gastos;
}

function anyadirGasto (gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto (idBorrar) {
    let gastosFiltrados = [];

    for (let gasto of gastos) {
        if (gasto.id !== idBorrar){
            gastosFiltrados.push(gasto);
        }
    }

    gastos = [...gastosFiltrados];
}

function calcularTotalGastos () {
    let total = 0;

    for (let gasto of gastos) {
        total += gasto.valor;
    }

    return total;
}

function calcularBalance () {
    return (presupuesto - calcularTotalGastos());
}

function filtrarGastos (filtro) {

    if (estaVacio(filtro)) {
        return gastos;
    }

    let gastosFiltrados = [...gastos];

    //*Operador ternario que comprueba que existe la propiedad
    // para evitar que haya error si es undefined.
    //**Las fechas del filtro estarán en formato '2021-10-15'

    if (!isNaN(Date.parse(filtro.fechaDesde))) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha >= Date.parse(filtro.fechaDesde));
    }

    if (!isNaN(Date.parse(filtro.fechaHasta))) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha <= Date.parse(filtro.fechaHasta));
    }

    if (!isNaN(filtro.valorMinimo)) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= filtro.valorMinimo);
    }

    if (!isNaN(filtro.valorMaximo)) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= filtro.valorMaximo);
    }

    //Descripción sin distinguir mayúsculas de minúsculas
    if ((typeof filtro.descripcionContiene === 'string') && (filtro.descripcionContiene !== '')) {
        gastosFiltrados = gastosFiltrados.filter(gasto => 
            gasto.descripcion.toUpperCase().includes(filtro.descripcionContiene.toUpperCase()));
    }

    //Debe indicar todos los gastos que contienen alguna de las etiquetas del filtro
    if ((filtro.etiquetasTiene !== undefined) && (filtro.etiquetasTiene.length !== 0)) {

        let gastosConAlgunaEtiqueta = [];
        
        for (let etiquetaTiene of filtro.etiquetasTiene) {

            etiquetaTiene = etiquetaTiene.toUpperCase();

            gastosFiltrados.forEach(gasto => {
                if (gasto.etiquetas !== undefined) {
                    let etiquetas = [...gasto.etiquetas];
                    let etiquetasMayusculas = [];
    
                    for (let etiqueta of etiquetas) {
                        etiquetasMayusculas.push(etiqueta.toUpperCase());
                    };
    
                    if (etiquetasMayusculas.includes(etiquetaTiene) &&
                (!gastosConAlgunaEtiqueta.includes(gasto))) {
                        gastosConAlgunaEtiqueta.push(gasto);
                    }
                }
            });
        };
        gastosFiltrados = [...gastosConAlgunaEtiqueta];
    } 

    return gastosFiltrados;
}

function agruparGastos () {
    
}

function estaVacio(objeto) {
  for (const propiedad in objeto) {
    if (Object.hasOwn(objeto, propiedad)) {
      return false;
    }
  }

  return true;
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