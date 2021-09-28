//imagen en 2D 
#include <GL/freeglut.h>

//funcion de inicializacion
void initGL() {
// Establecer "limpieza" o color de fondo
glClearColor (0.0f, 0.0f, 0.0f, 1.0f); // Negro y opaco
//           (color, color,color,intensidad)
}

void plano_cartesiano() {
	
glBegin (GL_LINES);
 glColor3f (1.0f, 1.0f, 1.0f);
   glVertex2f (1.0f,0.0f);
  glVertex2f (-1.0f, 0.0f);
glEnd;

glBegin (GL_LINES);
  glColor3f (1.0f, 1.0f, 1.0f);
  glVertex2f (0.0f,1.0f);
  glVertex2f (0.0f, -1.0f);
glEnd;	
		
}

void triangulo(){
	
glBegin (GL_TRIANGLES); // Aperturamos un triangulo
 glColor3f (0.902f, 0.035f, 0.341f); // color en decimales
 glVertex2f (0.1f, 0.6f);
 glVertex2f (0.7f, 0.6f);
 glVertex2f (0.4f, 0.1f);
glEnd ();//cerramos un triangulo
	
}
void display () {
glClear (GL_COLOR_BUFFER_BIT);// borra los búferes de color de OpenGL
glMatrixMode(GL_MODELVIEW); // Para operar Model-View matrix
glLoadIdentity(); // Reiniciar the model-view matrix


glPushMatrix();
glTranslatef(-0.8f, 0.3f, 0.0f);
triangulo();
glPopMatrix();

plano_cartesiano();

glFlush(); // Renderizar ahora (generar imagen)
glutSwapBuffers(); //se usa para intercambiar los bufferes,

}

int main(int argc, char** argv) {
//Inicializar el gestor de ventanas GLUT y crear la ventana
glutInit(&argc, argv); // inicializa el GLUT
glutInitWindowSize(320,320);//Establece el tamaño inicial de la ventana
glutInitWindowPosition (50, 50); // Coloca la esquina superior izquierda inicial de la ventana
glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);//Esta función indica cuántos y qué bufferes van a ser usados (se explicarán los bufferes más adelante), en este doble buffer y color RGB (RGBA).
glutCreateWindow("Primer programa"); //Se crea la ventana con las anteriores características, con el nombre indicado ahí.
glutDisplayFunc (display);//  Esta función es la que GLUT ejecutará cada vez que haya que redibujar el contenido
initGL();
glutMainLoop();// Ingrese el ciclo de procesamiento de eventos infinito
return 0;
}
