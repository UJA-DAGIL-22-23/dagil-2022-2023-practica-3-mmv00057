/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js de aplicación Front-End
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */
const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor FRONT-END:', () => {
  describe('Cualquier ruta devuelve index.html', () => {
    it('Prueba ruta /', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect(function (res) {
          //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.hasOwnProperty('text'));
          assert(res.text.search("<h1>Aplicación Microservicios Plantilla</h1>")>=0)

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Ruta /prueba/ruta/larga.txt', (done) => {
        supertest(app)
          .get('/prueba/ruta/larga.txt')
          .expect(200)
          .expect(function (res) {
            //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
            assert(res.hasOwnProperty('text'));
            assert(res.text.search("<h1>Aplicación Microservicios Plantilla</h1>")>=0)
  
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
  })
})

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

