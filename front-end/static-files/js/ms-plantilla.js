
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
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Plantilla.cabeceraTable = function () {
    return `<table class="listado-personas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Dirección</th><th>Años participación</th><th>Número participaciones</th><th>Tipo</th> 
        </thead>
        <tbody>
    `;
}

Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-personas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada persona en un elemento TR con sus correspondientes TD
 * @param {persona} p d del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Plantilla.cuerpoTr = function (p) {
    const d = p.data;
    const nombre = d.nombre;
    const apellidos = d.apellido;
    const direc = d.direccion;
    const añosParticipacion = d.aniosParticipacionMundial;
    const numCompeticiones = d.numeroParticipacionesOlimpicas;
    const tipo = d.tipo;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.ref['@ref'].id}</td>
    <td>${nombre}</td>
    <td> ${apellidos}</td>
    <td>${direc.calle},${direc.localidad},${direc.provincia},${direc.pais}</td>
    <td>${añosParticipacion}</td>
    <td>${numCompeticiones}</td>
    <td>${tipo}</td>
    </tr>`;
}
Plantilla.cuerpoTrNombres = function (p) {
    const d = p.data;
    const nombre = d.nombre;
    const apellidos = d.apellido;
  

    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.ref['@ref'].id}</td>
    <td>${nombre}</td>
    <td> ${apellidos}</td>
    </tr>`;
}


Plantilla.buscador = function (p,name) {
    const d = p.data;
    const nombre = d.nombre;
    const apellidos = d.apellido;
    const direc = d.direccion;
    const añosParticipacion = d.aniosParticipacionMundial;
    const numCompeticiones = d.numeroParticipacionesOlimpicas;
    const tipo = d.tipo;
  
    if (nombre === name) {
      let table = document.createElement('table');
      let tbody = document.createElement('tbody');
  
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.appendChild(document.createTextNode(p.ref['@ref'].id));
      let td2 = document.createElement('td');
      td2.appendChild(document.createTextNode(nombre));
      let td3 = document.createElement('td');
      td3.appendChild(document.createTextNode(apellidos));
      let td4 = document.createElement('td');
      td4.appendChild(document.createTextNode(`${direc.calle},${direc.localidad},${direc.provincia},${direc.pais}`));
      let td5 = document.createElement('td');
      td5.appendChild(document.createTextNode(añosParticipacion));
      let td6 = document.createElement('td');
      td6.appendChild(document.createTextNode(numCompeticiones));
      let td7 = document.createElement('td');
      td7.appendChild(document.createTextNode(tipo));
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tbody.appendChild(tr);
      table.appendChild(tbody);
      
      return table.outerHTML;
    } else {
      return '';
    }
}

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
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de personas", msj )

}


Plantilla.imprimeNombres = function (vector) {
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(e => msj += Plantilla.cuerpoTrNombres(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de nombre de personas", msj )

}

Plantilla.imprimeBuscador = function (vector,searchTerm) {
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.buscador(e,searchTerm))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Persona buscada", msj )

}

/**
 * Función principal para recuperar los proyectos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Plantilla.listar = function () {
    this.recupera(this.imprime);
}

Plantilla.listarNombres = function () {
    this.recupera(this.imprimeNombres);
}

Plantilla.listarBuscar = function (searchTerm) {
    this.recupera(this.imprimeBuscador(searchTerm));
}