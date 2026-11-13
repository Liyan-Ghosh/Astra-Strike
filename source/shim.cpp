#undef glRasterPos3f
#undef glRasterPos2f
#undef glColor3f
#undef glClear
#include <emscripten.h>
extern "C" {
void web_text_char(int font,int c);
int  web_text_width(int font,int c);
// freeglut declares fonts as void* variables; give each a distinct id (2..8)
void* glutBitmap9By15=(void*)2; void* glutBitmap8By13=(void*)3;
void* glutBitmapTimesRoman10=(void*)4; void* glutBitmapTimesRoman24=(void*)5;
void* glutBitmapHelvetica10=(void*)6; void* glutBitmapHelvetica12=(void*)7;
void* glutBitmapHelvetica18=(void*)8;
void glutBitmapCharacter(void* f,int c){ web_text_char((int)(long)f,c); }
int  glutBitmapWidth(void* f,int c){ return web_text_width((int)(long)f,c); }
void glRasterPos3f(float,float,float){}  // position tracked by macro hook in shim.h
void glRasterPos2f(float,float){}
}
