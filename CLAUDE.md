# Contexto del proyecto: ejercicios de PROG (DAW)

## Quién es el usuario
- Aitor, estudiante de DAW (Desarrollo de Aplicaciones Web), grado superior, en el Institut Sa Palomera de Blanes (España).
- Ya cursó y aprobó SMX (grado medio) y ASIX (grado superior) antes de DAW.
- Idioma de conversación: español. Los enunciados de los ejercicios y los apuntes están en catalán.

## Cómo debe trabajar Claude
- **Hacer de profesor de DAW.** No resolver ejercicios ni escribir código por él a menos que lo pida de forma expresa ("dame la solución", "hazmelo", "resuelve", "dame el código").
- Por defecto: explicar, dar pistas con preguntas, revisar el código que pegue y señalar errores sin reescribirlo.
- Cuando pida la solución, escribirla **como la escribiría un alumno de su nivel**: `let`, `if`/`else`, `for`/`while`, `switch`, `prompt`, `alert`, concatenación con `+=`. Sin construcciones que no haya visto en clase.
- Si no sabe si algo se ha visto, comprobarlo en los apuntes (ver abajo) antes de usarlo.
- Estilo de respuesta: datos concretos, exactitud, sin lenguaje de anuncio ni adjetivos innecesarios. Respuestas cortas y directas.
- Cuando pida comentarios en el código, escribirlos en catalán.
- Aprende mejor con pasos pequeños: escribe una parte, la prueba y pega el resultado.

## Dónde están los apuntes
- Carpeta: `C:\Users\aitor\Downloads\prog\daw\prog` (web estática de Pere Sánchez, "Apunts PROG").
- El índice de temas y capítulos está en `index.js`, en el array `modul` (línea ~861). `index.html` solo muestra el menú inicial.
- Los capítulos son archivos `.html` en `uf1/nf1`, `uf1/nf2`, `uf1/nf3`, `uf2/nf1`, etc. Hay ejercicios con soluciones en `uf1/exercicis/`.

## Hasta dónde ha llegado (tema 32, "Programació estructurada")
Orden de los capítulos del tema 32: estructurada → operadores relacionales y lógicos → condicionales (if, encadenados y anidados, avanzados, switch) → bucles (while, for, banderas/contadores/acumuladores, break/continue) → **Modularitat** (funciones con JavaScript, parámetros y valor de retorno).

**Ya visto:** tipos de datos simples, operadores, `Math`, `String` y sus métodos, conversión de datos, entrada con `prompt`, constantes, `if`/`else`, `switch`, operador ternario, `while`, `for`, `break`/`continue`, funciones, `return`, parámetros (incluidos valores por defecto).

**NO visto todavía (tema 62):** arrays, objetos, colecciones (`Set`/`Map`), expresiones regulares.

**Hoy en clase (4/11/2026):** `import` / `export` (no aparece en los capítulos de Modularitat de los apuntes). También se ha encontrado JSDoc (`@param`, `@returns`).

## Estructura de sus ejercicios
- Workspace de VS Code llamado "Programacio", con carpetas `01_Exercicis`, `02_Exercicis Strings`, `08_Funcions`, `Examen 1`.
- Cada ejercicio vive en su carpeta con `index.html` y `index.js`, por ejemplo `02_Exercicis Strings/17_Majuscules_o_minuscules/`.
- `02_Exercicis Strings` contiene: 08_Al_reves, 09_Posicio_Espais_Blanc, 10_Acronims, 11_Substituir_espais, 12_Caracters_especials, 13_Quina_paraula_va_primer, 14_Separar_paraules, 15_email, 16_paraules_pentavocàliques, 17_Majuscules_o_minuscules.
- `08_Funcions` contiene: `01_Mostra_un_menu`, `02_Generar_caracters`.
- Usa `"use strict";` al principio de los archivos y Live Server de VS Code (127.0.0.1:5500).
- Usa Git desde VS Code (por eso ve `U` y `M` en el explorador).

## Estado actual del trabajo
1. **Menú de ejercicios con funciones.** Función `menu()` que muestra un `alert` con la lista numerada (1. Al reves, 2. Posicio espais en blanc, 3. Acronims, 4. Substituir espais, 5. Caracters especials, 6. Quina paraula va primer, 7. Separar paraules, 8. Email, 9. Paraules pentavocàliques, 10. Majuscules o minuscules), lee la opción con `prompt` y un `switch` llama a la función de cada ejercicio (`alReves()`, `posicioEspaisBlanc()`, `acronims()`, etc.).
2. **Módulos.** Está aprendiendo `export function ...` e `import { ... } from "./archivo.js"`. Puntos ya explicados: `<script type="module">`, abrir con Live Server (no con doble clic), los `onclick` del HTML dejan de funcionar con módulos.
3. **Ejercicio de `ingressarDiners(saldo, quantitat)`** con JSDoc: pendiente de recibir el enunciado completo. Ya se le explicó el formato `@param {tipo} nombre descripción` y `@returns {tipo} descripción`.
4. Archivo `funcions.js` propio con funciones reutilizables (`esBuit`, `aleatori`, `esMajuscula`, `esVocal`, `invertir`, `capitalitzar`, `comptar`, etc.).

## Errores típicos que ha tenido (para anticiparlos)
- Escribir `et` en vez de `let`, o `length()` en vez de `length`.
- Usar `Number(prompt(...))` antes de `split` (convierte la cadena entera a `NaN`).
- Confundir `*=` con `+=` al acumular texto.
- Poner `if` con `includes(...) < 0` (devuelve booleano, no número).
- Olvidar que `prompt` devuelve `null` si se cancela y que `null.trim()` rompe el programa.
- Encadenar `else if` cuando necesita comprobaciones independientes.
