#pragma once
#include <emscripten.h>
#include <GL/glut.h>
extern "C" {
void web_on_discover(int level,int index,const char* name,const char* l1,const char* l2);
void web_text_char(int font,int c);
int  web_text_width(int font,int c);
void web_text_color(float r,float g,float b);
void web_text_pos(float x,float y);
void web_text_clear();
}
// hook raster position / color / clear so the overlay text follows GL state
#define glRasterPos3f(x,y,z) (web_text_pos((x),(y)), (glRasterPos3f)((x),(y),(z)))
#define glRasterPos2f(x,y)   (web_text_pos((x),(y)), (glRasterPos2f)((x),(y)))
#define glColor3f(r,g,b)     (web_text_color((r),(g),(b)), (glColor3f)((r),(g),(b)))
#define glClear(m)           (web_text_clear(), (glClear)(m))

// Emscripten GL emulation has no GL_POLYGON; asteroid shapes are convex so a fan looks identical
#undef GL_POLYGON
#define GL_POLYGON GL_TRIANGLE_FAN
