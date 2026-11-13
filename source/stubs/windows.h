// Web stub for windows.h (Emscripten build only)
#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <emscripten.h>
#define MAX_PATH 260
#define SND_ASYNC 1
#define SND_FILENAME 2
#define SND_LOOP 4
typedef void* HWND;
extern "C" {
void web_play_loop(const char* file);
void web_stop_loop();
void web_sfx(const char* name);
}
static inline int PlaySound(const char* f,void*,int flags){ if(f) web_play_loop(f); else web_stop_loop(); return 1; }
static inline int GetModuleFileNameA(void*,char* b,int n){ if(n>0) b[0]=0; return 0; }
// mciSendString: only the shoot/blast/enemy sfx commands used by main.cpp
static inline int mciSendStringA(const char* cmd,void*,int,void*){
  if(strstr(cmd,"play gameShoot")) web_sfx("shoot.wav");
  else if(strstr(cmd,"play gameBlast")) web_sfx("blast.wav");
  else if(strstr(cmd,"play gameEnemyShoot")) web_sfx("enemy_shoot.wav");
  return 0; // 0 = success (so code thinks sounds are loaded)
}
