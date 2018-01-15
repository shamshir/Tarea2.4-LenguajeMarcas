# Tarea2.4-LenguajeMarcas
## Proyecto
La presente tarea para la asignatura *Lenguaje de Marcas* consiste en la construcción del minijuego *Lunar Lander*, tomando como referencia la versión estática creada anteriormente. Al igual que dicha versión, esta verisón definitiva cuenta con dos ramas: la rama *Master*, correctamente indentada, y la rama *Minify*, con código minimificado.

En este caso, el minijuego se encuentra en su versión final, construida mediante HTML, CSS y Javascript. Éste coloca al usuario a los mandos de una nave que debe aterrizar en la luna.

[Visualizar el Proyecto en Rawgit](https://rawgit.com/shamshir/Tarea2.4-LenguajeMarcas/master/index.html)

## Funcionamiento
Este apartado describe, a grosso modo, el funcionamiento de los principales elementos del proyecto *Lunar Lander*.
### Movimiento Nave
El juego empieza pausado, por lo que, una vez haya cargado la página, es necesario que el usuario haga click en el botón de *Play* para comenzar la partida. Inmediatamente después de pulsar el botón, la nave empezará a precipitarse hacia la superficie lunar. El movimiento de la nave es puramente vertical y, si el usuario utiliza los motores de la nave de forma continua, ésta puede alejarse tanto de la luna que abandone la ventana de juego. En ese caso, a pesar de que no sea visible, la nave irá decelerando en cuanto se acabe el combustible y volverá a caer, volviendo a aparecer en la pantalla de juego. Se tomó la decisión de permitir este movimiento ya que se consideró que limitar el movimiento de la nave o hacer rebotar a la misma en el borde superior de la pantalla podía resultar inesperado o artificial para el usuario. Cabe destacar que la velocidad a al que transcurre el juego ha sido incrementada respecto a la versión proporcionada por el profesor, con el objetivo de añadir emoción y tensión al juego. Dicho objetivo se ha conseguido multiplicando por cuatro la gravedad que ejerce la luna sobre la nave.
### Activación de los Motores
A disposición de usuario quedan los motores de la nave, que son la única forma de frenar la caída de la nave. Éstos de activan de la misma manera, tanto en la versión de escritorio como la versión para móviles, y consiste en mantener pulsada la luna. En el escritorio haremos click sobre la luna y mantendremos el botón del ratón presionado durante el tiempo que queramos mantener los motores encendidos y, en la versión móvil, mantendremos presionada la luna durante el tiempo que queramos para conseguir el mismo efecto.

A nivel de código Javascript, la implementación de la activación de los motores es distinta, dependiendo de si se trata de la versión de escritorio o de la versión para móvil. En la primera, se utilizan las funciones *onmousedown* y *onmouseup*, no obstante en la versión de móvil es necesario desactivar el menú contextual que aparece en el navegar si realizamos una pulsación larga, además de agregar los eventos *touchstart* y *touchend* como eventos a "escuchar" por el navegador.
### Dificultad
El minijuego *Lunar Lander* cuenta con dos niveles de dificultad. El nivel por defecto, fácil, permite al usuario utilizar el tanque entero de fuel y le deja aterrizar a un máximo de 10 px/s. El nivel difícil, en cambio, solo permite al usuario utilizar medio tanque de combustible y solo acepta como válido un aterrizaje a 5 px/s o menos.

Cada vez que se reanuda el juego, bien sea al reiniciarlo o al salir del menú, aparece un recordatorio de texto en la parte inferior derecha de la pantalla, que recuerda al usuario en qué dificultad se encuentra. Además, en la versión de escritorio, el velocímetro posee una marca naranja que marca el rango en el que el usuario debe aterrizar para superar la dificultad en la que se encuentre. Esto sirve de referencia visual para poder saber cómo gestionar los motores de la nave y la cantidad restante de combustible. 
### Indicadores
### Resultado del Juego y Reinicio
## Apariencia
### Imágenes
### Menús
