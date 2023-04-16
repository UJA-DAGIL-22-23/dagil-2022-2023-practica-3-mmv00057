/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            
            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
          
        })
    })


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
 describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});

describe("Cabecera table Nombres", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Plantilla.cabeceraTableNombres()).toBe(`<table class="listado-personas"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`);
        });
});

describe("Cuerpo de fila de tabla", function () {
    it("debería devolver una cadena de texto con etiquetas HTML para una fila de tabla",
        function () {
            const p = {
                data: {
                    nombre: "Juan",
                    apellido: "Pérez",
                    direccion: {
                        calle: "Calle 123",
                        localidad: "Ciudad",
                        provincia: "Provincia",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 5,
                    numeroParticipacionesOlimpicas: 3,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "12345"
                    }
                }
            };
            const expected = `<tr title="12345">
            <td>12345</td>
            <td>Juan</td>
            <td> Pérez</td>
            <td>Calle 123,Ciudad,Provincia,País</td>
            <td>5</td>
            <td>3</td>
            <td>Deportista</td>
            </tr>`;
            expect(Plantilla.cuerpoTr(p)).toBe(expected);
        });
});


describe("Imprimir nombres", function () {
    let vector;
    beforeEach(function () {
    // Crear un mock para el objeto Frontend.Article
    spyOn(Frontend.Article, "actualizar");
    // Crear un vector de nombres para usar como entrada en la función
    vector = ["Juan", "María", "Pedro"];
    });

    it("debería generar el mensaje correcto para el listado de nombres", function () {
        // Llamar a la función a probar
        Plantilla.imprimeNombres(vector);
    
        // Comprobar que se llamaron a las funciones de cabeceraTableNombres, cuerpoTrNombres y pieTable
        expect(Plantilla.cabeceraTableNombres).toHaveBeenCalled();s
        expect(Plantilla.cuerpoTrNombres).toHaveBeenCalledTimes(vector.length);
        expect(Plantilla.pieTable).toHaveBeenCalled();
    
        // Comprobar que se llamó a la función de Frontend.Article.actualizar con los argumentos correctos
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de nombre de personas", jasmine.any(String));
    });
});


describe("Función de impresión y mostrado de persona", function () {
    beforeEach(function () {
        // Mock de la función Frontend.Article.actualizar()
        spyOn(Frontend.Article, 'actualizar');
    });

    it("debería generar el mensaje de impresión y mostrado de persona correctamente", function () {
        let persona = {nombre: "John", apellido: "Doe", edad: 30};
        let expectedMsj = Plantilla.cabeceraTable() + Plantilla.cuerpoTr(persona) + Plantilla.pieTable();
        
        Plantilla.imprimeMostrar(persona);
        
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Persona mostrada", expectedMsj);
    });
});

describe("Imprimir tabla de personas", function () {
    beforeEach(function () {
        // Definir un vector de ejemplo de personas
        this.vectorPersonas = [
            { nombre: "Juan", edad: 30, ciudad: "Madrid" },
            { nombre: "María", edad: 25, ciudad: "Barcelona" },
            { nombre: "Pedro", edad: 40, ciudad: "Valencia" }
        ];
    });

    it("debería imprimir una tabla HTML con los datos de las personas", function () {
        // Espiar la función console.log para comprobar si se llama con el vector de personas correcto
        spyOn(console, 'log');
        // Llamar a la función Plantilla.imprime con el vector de personas
        Plantilla.imprime(this.vectorPersonas);
        // Comprobar si console.log ha sido llamado con el vector de personas correcto
        expect(console.log).toHaveBeenCalledWith(this.vectorPersonas);
        // Comprobar si la función Plantilla.cabeceraTable ha sido llamada
        expect(Plantilla.cabeceraTable).toHaveBeenCalled();
        // Comprobar si la función Plantilla.cuerpoTr ha sido llamada por cada elemento del vector de personas
        expect(Plantilla.cuerpoTr).toHaveBeenCalledTimes(this.vectorPersonas.length);
        // Comprobar si la función Plantilla.pieTable ha sido llamada
        expect(Plantilla.pieTable).toHaveBeenCalled();
        // Comprobar si la función Frontend.Article.actualizar ha sido llamada con los parámetros correctos
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", jasmine.any(String));
    });
});


describe("Cuerpo de la tabla con nombres", function () {
    it("debería devolver la cadena HTML correcta para una fila de tabla con nombres",
        function () {
            const p = {
                data: {
                    nombre: "Juan",
                    apellido: "Pérez"
                },
                ref: {
                    "@ref": {
                        id: "12345"
                    }
                }
            };
            const expected = `<tr title="12345">
    <td>12345</td>
    <td>Juan</td>
    <td> Pérez</td>
    </tr>`;
            expect(Plantilla.cuerpoTrNombres(p)).toBe(expected);
        });
});

describe("Cuerpo de fila de tabla", function () {
    it("debería devolver el HTML correcto para el cuerpo de una fila de tabla",
        function () {
            const p = {
                data: {
                    nombre: "John",
                    apellido: "Doe",
                    direccion: {
                        calle: "123 Main St",
                        localidad: "Ciudad",
                        provincia: "Provincia",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 5,
                    numeroParticipacionesOlimpicas: 3,
                    tipo: "Atleta"
                },
                ref: {
                    "@ref": {
                        id: "12345"
                    }
                }
            };

            const expectedHTML = `<tr title="12345">
            <td>12345</td>
            <td>John</td>
            <td> Doe</td>
            <td>123 Main St,Ciudad,Provincia,País</td>
            <td>5</td>
            <td>3</td>
            <td>Atleta</td>
            </tr>`;

            expect(Plantilla.cuerpoTr(p)).toBe(expectedHTML);
        });
});

describe("Cabecera de la tabla", function () {
    it("debería devolver la etiqueta HTML para la cabecera de la tabla", function () {
        var expectedOutput = `<table class="listado-personas">
        <thead>
        <th>ID</th><th>Nombre</th><th>Apellidos</th><th>Dirección</th><th>Años participación</th><th>Número participaciones</th><th>Tipo</th> 
        </thead>
        <tbody>
    `;
        expect(Plantilla.cabeceraTable()).toBe(expectedOutput);
    });
});
