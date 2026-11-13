mergeInto(LibraryManager.library, {
  web_text_clear: function(){ var c=Module.textCanvas; if(!c) return; var g=c.getContext('2d'); g.clearRect(0,0,c.width,c.height); },
  web_text_color: function(r,g,b){ Module._tc='rgb('+(r*255|0)+','+(g*255|0)+','+(b*255|0)+')'; },
  web_text_pos: function(x,y){ var c=Module.textCanvas; if(!c) return; Module._tx=(x+1)/2*c.width; Module._ty=(1-y)/2*c.height; },
  web_text_char: function(font,ch){
    var c=Module.textCanvas; if(!c) return; var g=c.getContext('2d');
    var px=Module._fp(font); g.font=px+'px Helvetica, Arial, sans-serif'; g.fillStyle=Module._tc||'#fff';
    var s=String.fromCharCode(ch); g.fillText(s,Module._tx,Module._ty); Module._tx+=g.measureText(s).width;
  },
  web_text_width: function(font,ch){
    var c=Module.textCanvas; if(!c) return 8; var g=c.getContext('2d');
    g.font=Module._fp(font)+'px Helvetica, Arial, sans-serif'; return Math.ceil(g.measureText(String.fromCharCode(ch)).width);
  },
  web_play_loop: function(p){ var f=UTF8ToString(p); if(Module._bgm){Module._bgm.pause();} var a=new Audio(f); a.loop=true; a.volume=0.5; a.play().catch(function(){}); Module._bgm=a; },
  web_stop_loop: function(){ if(Module._bgm){Module._bgm.pause(); Module._bgm=null;} },
  web_sfx: function(p){ var a=new Audio(UTF8ToString(p)); a.volume=0.6; a.play().catch(function(){}); },
  web_on_discover: function(level,index,n,l1,l2){
    if(Module.onDiscover) Module.onDiscover({level:level,index:index,name:UTF8ToString(n),line1:UTF8ToString(l1),line2:UTF8ToString(l2)});
  },
});
