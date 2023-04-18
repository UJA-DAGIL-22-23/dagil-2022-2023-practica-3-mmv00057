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
            expect(elementoContenido.innerHTML).toBe(Plantilla.dDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.dDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.dDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.dDescargadosNulos.mensaje)
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
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.dDescargadosNulos.mensaje) >= 0).toBeTrue()
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
 describe("Plantilla.pieTable  ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});

describe("Plantilla.cabeceraTableNombres", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            expect(Plantilla.cabeceraTableNombres()).toBe(`<table class="listado-personas"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`);
        });
});

describe("Plantilla.cuerpoTr", function () {
    it("debería comprobar que lo que muestra no esta vacío",
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
            expect(Plantilla.cuerpoTr(p)).not.toBe('');
        });
});


describe("Plantilla.imprimeNombres", function () {
    let vector;
    beforeEach(function () {
        // Crear un mock para el objeto Frontend.Article
        spyOn(Frontend.Article, "actualizar");
        // Crear un vector de nombres para usar como entrada en la función
        vector = ["Juan", "María", "Pedro"];
    });

    it("debería generar el mensaje correcto para el listado de nombres", function () {
        // Mockear las funciones Plantilla.cabeceraTableNombres y Plantilla.pieTable
        spyOn(Plantilla, "cabeceraTableNombres");
        spyOn(Plantilla, "pieTable");

        // Llamar a la función a probar
        spyOn(Plantilla, "cuerpoTrNombres").and.callFake(function() {
            return true;
        });

        Plantilla.imprimeNombres(vector);

        // Comprobar que se llamaron a las funciones de cabeceraTableNombres, cuerpoTrNombres y pieTable
        expect(Plantilla.cabeceraTableNombres).toHaveBeenCalled();
        expect(Plantilla.cuerpoTrNombres).toHaveBeenCalledTimes(vector.length);
        expect(Plantilla.pieTable).toHaveBeenCalled();

        // Comprobar que se llamó a la función de Frontend.Article.actualizar con los argumentos correctos
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de nombre de personas", jasmine.any(String));
    });
});
 

describe("Plantilla.imprimeMostrar", function () {
    beforeEach(function () {
        // Mock de la función Frontend.Article.actualizar()
        spyOn(Frontend.Article, 'actualizar');
    });

    it("debería generar el mensaje de impresión y mostrado de persona correctamente", function () {
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
        let expectedMsj = Plantilla.cabeceraTable() + Plantilla.cuerpoTr(p) + Plantilla.pieTable();
        
        Plantilla.imprimeMostrar(p);
        
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Persona mostrada", expectedMsj);
    });
});

describe(" Plantilla.imprime", function () {
    beforeEach(function () {
        // Mock de la función Frontend.Article.actualizar()
        spyOn(Frontend.Article, 'actualizar');
    });
    
    it("debería generar el mensaje de impresión y mostrado de personas correctamente", function () {
        // Definir un vector de ejemplo de personas
        let vectorPersonas = [
            {
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
            },
            {
                data: {
                    nombre: "María",
                    apellido: "Gómez",
                    direccion: {
                        calle: "Avenida 456",
                        localidad: "Pueblo",
                        provincia: "Región",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 2,
                    numeroParticipacionesOlimpicas: 1,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "67890"
                    }
                }
            },
            {
                data: {
                    nombre: "Pedro",
                    apellido: "Fernández",
                    direccion: {
                        calle: "Plaza 789",
                        localidad: "Villa",
                        provincia: "Estado",
                        pais: "País"
                    },
                    aniosParticipacionMundial: 3,
                    numeroParticipacionesOlimpicas: 2,
                    tipo: "Deportista"
                },
                ref: {
                    '@ref': {
                        id: "54321"
                    }
                }
            }
        ];
        
        // Llamamos a la función que genera el mensaje de impresión y mostrado de personas
        Plantilla.imprime(vectorPersonas);
        
        // Verificamos que la función de actualización haya sido llamada con los argumentos correctos
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", jasmine.any(String));
    });
});

describe("Plantilla.cuerpoTrNombres", function () {
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

describe("Plantilla.cabeceraTable", function () {
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
