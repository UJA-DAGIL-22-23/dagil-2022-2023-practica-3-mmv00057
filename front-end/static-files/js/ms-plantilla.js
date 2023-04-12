
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

Plantilla.recuperaBuscar = async function (callBackFn, nombre) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
       // console.log(vectorPersonas.data[0].data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
        //console.log(filtro)        
        callBackFn(filtro)
    }
}

Plantilla.recuperaBuscarMas = async function (callBackFn, var1, var2, var3) {
    let response = null
    //console.log(nombre);
    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Filtro el vector de personas para obtener solo la que tiene el nombre pasado como parámetro
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
       // console.log(vectorPersonas.data)     
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === var1 && persona.data.direccion.localidad === var2 && persona.data.tipo === var3)
        console.log(filtro)        
        callBackFn(filtro)
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


/**
 * Función que recuperar todos los plantilla llamando al MS plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */ 
Plantilla.recuperaAlfabetic = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio plantilla
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los plantilla que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        vectorPlantilla.data.sort((a,b) => {
            const nombreA = a.data.nombre.toLowerCase();
            const nombreB = b.data.nombre.toLowerCase();

            if(nombreA < nombreB) { 
                return -1; 
            }
            if(nombreA > nombreB) { 
                return 1; 
            }
            return 0;
        });

        callBackFn(vectorPlantilla.data)
    }
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

Plantilla.listarBuscar = function (search) {
    this.recuperaBuscar(this.imprime,search);
}

Plantilla.listarBuscarMas = function (search1,search2, search3) {
    this.recuperaBuscarMas(this.imprime,search1,search2,search3);
}


Plantilla.listarNombreAlfa = function () {
    this.recuperaAlfabetic(this.imprimeNombres);
}

/// Nombre de los campos del formulario para editar una persona
Plantilla.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    CALLE: "form-persona-calle",
    LOCALIDAD: "form-persona-localidad",
    PROVINCIA: "form-persona-provincia",
    PAIS: "form-persona-pais",
    ANIO_PARTICIPACION: "form-persona-anio_participacion",
    NUMERO_PARTICIPACION: "form-persona-numero_participacion",
    TIPO: "form-persona-tipo",
}

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "CALLE": "### CALLE ###",
    "LOCALIDAD": "### LOCALIDAD ###",
    "PROVINCIA": "### PROVINCIA ###",
    "PAIS": "### PAIS ###",
    "AÑOS PARTICIPACION": "### AÑOS PARTICIPACION ###",
    "NUMERO PARTICIPACIONES": "### NUMERO PARTICIPACIONES ###",
    "TIPO": "### TIPO ###",
}
/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Plantilla.plantillaFormularioPersona = {}

Plantilla.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="20%">Calle</th>
            <th width="20%">Localidad</th><th width="20%">Provincia</th><th width="20%">Pais</th>
            <th width="20%">Años participacion</th><th width="20%">Número participaciones</th>
            <th width="20%">Tipo</th><th width="20%">ACCIONES</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-calle" value="${Plantilla.plantillaTags.CALLE}" 
                        name="calle_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-localidad" value="${Plantilla.plantillaTags.LOCALIDAD}" 
                        name="localidad_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-provincia" value="${Plantilla. plantillaTags.PROVINCIA}" 
                        name="provincia_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" value="${Plantilla.plantillaTags.PAIS}" 
                        name="pais_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-anios-participacion" min="0" max="100" size="8" required
                        value="${Plantilla.plantillaTags['AÑOS PARTICIPACION']}" 
                        name="anios_participacion_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-numero-participaciones" min="0" max="1000" size="8" required
                        value="${Plantilla.plantillaTags['NUMERO PARTICIPACIONES']}" 
                        name="numero_participaciones_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-tipo" value="${Plantilla.plantillaTags.TIPO}" 
                        name="tipo_persona"/></td>
                <td>
                    <div><a href="javascript:Personas.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Personas.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Personas.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
                </tr>
                </tbody>
            </table>
        </form>
        `;
/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), persona.data.apellido)
        .replace(new RegExp(Plantilla.plantillaTags.CALLE, 'g'), persona.data.direccion.calle)
        .replace(new RegExp(Plantilla.plantillaTags.LOCALIDAD, 'g'), persona.data.direccion.localidad)
        .replace(new RegExp(Plantilla.plantillaTags.PROVINCIA, 'g'), persona.data.direccion.provincia)
        .replace(new RegExp(Plantilla.plantillaTags.PAIS, 'g'), persona.data.direccion.pais)
        .replace(new RegExp(Plantilla.plantillaTags["AÑOS PARTICIPACION"], 'g'), persona.data.aniosParticipacionMundial)
        .replace(new RegExp(Plantilla.plantillaTags["NUMERO PARTICIPACIONES"], 'g'),persona.data.numeroParticipacionesOlimpicas)
        .replace(new RegExp(Plantilla.plantillaTags.TIPO,'g'),persona.data.tipo)
}


/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}

/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}

Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Plantilla.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}