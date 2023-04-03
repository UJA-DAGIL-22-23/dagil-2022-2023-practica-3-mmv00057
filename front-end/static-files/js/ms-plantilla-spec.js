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

 describe("Plantilla.cuerpoTr: ", function () {
    it('devuelve una cadena HTML que representa una fila de tabla con los datos de una persona', () => {
        // arrange
        const p = {
          data: {
            nombre: 'Juan',
            apellido: 'Pérez',
            calle: 'Calle 1',
            localidad: 'Ciudad 1',
            provincia: 'Provincia 1',
            pais: 'Pais 1',
            aniosParticipacionMundial: 2,
            numeroParticipacionesOlimpicas: 1,
            tipo: 'Deportista'
          },
          ref: {
            '@ref': {
              id: '123'
            }
          }
        };
    
        // act
        const resultado = Plantilla.cuerpoTr(p);
    
        // assert
        expect(resultado).toEqual('<tr title="123\"><td>123</td><td>Juan</td><td> Pérez</td><td>Calle 1,Ciudad 1,Provincia 1,Pais 1</td><td>2</td><td>1</td><td>Deportista</td></tr>');
      })
})
// Este Spect prueba que `Plantilla.pieTable()` devuelve la cadena `"</tbody></table>"`, 
//que representa el final de una tabla HTML. 
//Cualquier otro valor de retorno
// será considerado un fallo en la prueba.
describe("Plantilla.pieTable()", function () {
    it("Debe devolver una cadena que representa el final de una tabla HTML", function () {
      const expectedOutput = "</tbody></table>";
      const actualOutput = Plantilla.pieTable();
      expect(actualOutput).toBe(expectedOutput);
    })
  })

  describe("recupera function test", function ()  {
    it("should successfully return response data from the API Gateway", async () => {
      // Mocking the API Gateway endpoint
      const scope = nock(Frontend.API_GATEWAY)
        .get("/plantilla/getTodas")
        .reply(200, { data: [{id: 1, name: "Plantilla 1"}, {id: 2, name: "Plantilla 2"}] })
  
      // Call the function with a mocked callback function to verify response data
      await Plantilla.recupera((response) => {
        expect(response).toEqual([{id: 1, name: "Plantilla 1"}, {id: 2, name: "Plantilla 2"}])
      })
  
      // Verify that the URL was called with the right query string parameters
      expect(scope.isDone()).toBe(true)
    })
  
    it("should return an error when unable to access the API Gateway", async () => {
      // Mocking the API Gateway endpoint to return an error
      const scope = nock(Frontend.API_GATEWAY)
        .get("/plantilla/getTodas")
        .replyWithError("Unable to connect to the API Gateway")
  
      // Call the function and expect an error to be thrown
      try {
        await Plantilla.recupera()
      } catch (error) {
        expect(error.message).toBe("Error: No se han podido acceder al API Gateway")
      }
  
      // Verify that the URL was called with the right query string parameters
      expect(scope.isDone()).toBe(true)
    })
  })

  describe("Prueba de la función 'imprime' de la clase 'Plantilla'", () => {
    test("La función debe generar un mensaje con la tabla HTML y actualizar el artículo con el mensaje generado", () => {
  
      // Crear un vector de prueba
      const lista = [
        {nombre: "Juan", edad: 25},
        {nombre: "María", edad: 30},
        {nombre: "Pedro", edad: 27}
      ];
  
      // Espiamos el método 'console.log'\n    const spyConsole = jest.spyOn(console, "log");
  
      // Creamos un objeto 'Plantilla'
      const plantilla = new Plantilla();
  
      // Llamamos al método 'imprime' con el vector de prueba
      plantilla.imprime(lista);   // Creamos el mensaje que debería generar la función
      const expectedMessage = `
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>25</td>
            </tr>
            <tr>
              <td>María</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Pedro</td>
              <td>27</td>
            </tr>
          </tbody>
        </table>
      `;
  
      // Comprobamos que el mensaje de la tabla se haya generado correctamente
      expect(spyConsole).toHaveBeenCalledWith(lista);
      expect(plantilla.cabeceraTable()).toBe("<table><thead><tr><th>Nombre</th><th>Edad</th></tr></thead>");
      expect(plantilla.cuerpoTr(lista[0])).toBe("<tr><td>Juan</td><td>25</td></tr>");
      expect(plantilla.cuerpoTr(lista[1])).toBe("<tr><td>María</td><td>30</td></tr>");
      expect(plantilla.cuerpoTr(lista[2])).toBe("<tr><td>Pedro</td><td>27</td></tr>");
      expect(plantilla.pieTable()).toBe("</tbody></table>");
  
      // Comprobamos que el método 'Frontend.Article.actualizar' haya sido llamado con el mensaje generado
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", expectedMessage);
  
      // Limpiamos los espias
      spyConsole.mockRestore();
    })
  })