
/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de dDescargados vacíos
Plantilla.dDescargadosNulos = {
    mensaje: "d Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los d.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let dDescargados = null
    if (response) {
        dDescargados = await response.json()
        callBackFn(dDescargados)
    }
}


/**
 * Función principal para mostrar los d enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (dDescargados) {
    // Si no se ha proporcionado valor para dDescargados
    dDescargados = dDescargados || this.dDescargadosNulos

    // Si d descargados NO es un objeto 
    if (typeof dDescargados !== "object") dDescargados = this.dDescargadosNulos

    // Si d descargados NO contiene el campo mensaje
    if (typeof dDescargados.mensaje === "undefined") dDescargados = this.dDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", dDescargados.mensaje)
}

/**
 * Función principal para mostrar los d enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (dDescargados) {
    // Si no se ha proporcionado valor para dDescargados
    dDescargados = dDescargados || this.dDescargadosNulos

    // Si d descargados NO es un objeto 
    if (typeof dDescargados !== "object") dDescargados = this.dDescargadosNulos

    // Si d descargados NO contiene los campos mensaje, autor, o email
    if (typeof dDescargados.mensaje === "undefined" ||
        typeof dDescargados.autor === "undefined" ||
        typeof dDescargados.email === "undefined" ||
        typeof dDescargados.fecha === "undefined"
    ) dDescargados = this.dDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${dDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${dDescargados.autor}</li>
        <li><b>E-mail</b>: ${dDescargados.email}</li>
        <li><b>Fecha</b>: ${dDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recuperar todos los proyectos llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los d.
 */
Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}

/*
 * Función que recuperar todos los proyectos junto con las personas asignadas a cada uno de ellos
 * llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los d.
 
Plantilla.recuperaConPersonas = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodosConPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}
 */
// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-personas">
        <thead>
        <th>Alias</th><th>Nombre</th><th>Apellidos</th><th>Dirección</th><th>Años participación</th><th>Número participaciones</th><th>Tipo</th> 
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {persona} p d del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Plantilla.cuerpoTr = function (p) {
    const d = p.data;
    const nombre = d.nombre;
    const apellidos = d.apellidos;
    const direccion = d.direccion;
    const añosParticipacion = d.añosParticipacion;
    const numCompeticiones = d.numCompeticiones;
    const tipo = d.tipo;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.alias}</td>
    <td>${nombre}</td>
    <td> ${apellidos}</td>
    <td>${direccion}</td>
    <td>${añosParticipacion}</td>
    <td>${numCompeticiones}</td>
    <td>(${tipo})</td>
    </tr>`;
}


/*
 * Muestra la información de cada proyecto (incluyendo las personas asignadas) 
 * en varios elementos TR con sus correspondientes TD
 * @param {proyecto} p d del proyecto a mostrar
 * @returns Cadena conteniendo los distintos elementos TR que muestran el proyecto.
 
Plantilla.cuerpoConPersonasTr = function (p) {
    const d = p.data
    const ini = d.inicio;
    const fin = d.final;
    const presupuesto = Frontend.euros(d.presupuesto);
    let msj = Plantilla.cabeceraTable();
    msj += `<tr>
    <td>${d.alias}</td>
    <td><em>${d.nombre}</em></td>
    <td>${presupuesto}</td>
    <td>${ini.dia}/${ini.mes}/${ini.año}</td>
    <td>${fin.dia}/${fin.mes}/${fin.año}</td>
    </tr>
    <tr><th colspan="5">Personas</th></tr>
    <tr><td colspan="5">
        ${d.d_personas
            .map(e => "<a href='javascript:Personas.mostrar(\"" + e.ref['@ref'].id + "\")'>"
                + e.data.nombre
                + " " + e.data.apellidos
                + "</a>")
            .join(", ")}
    </td></tr>
    `;
    msj += Plantilla.pieTable();
    return msj;
}
*/

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Plantilla.pieTable = function () {
    return "</tbody></table>";
}


/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los d de los proyectos a mostrar
 */
Plantilla.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de personas", msj )

}



/*
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBD, 
 * junto con las personas asignadas a los mismos.
 * @param {Vector_de_proyectos} vector Vector con los d de los proyectos a mostrar
 
Proyectos.imprimeConPersonas = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    vector.forEach(e => msj += Plantilla.cuerpoConPersonasTr(e))

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de EQUIPOC con personas", msj )

}
*/
/**
 * Función principal para recuperar los proyectos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listar = function () {
    this.recupera(this.imprime);
}

/*
 * Función principal para recuperar los proyectos, incluyendo las personas, desde el MS y, 
 * posteriormente, imprimirlos.
 * @returns True
 
Plantilla.listarConPersonas = function () {
    this.recuperaConPersonas(this.imprimeConPersonas);
}
*/