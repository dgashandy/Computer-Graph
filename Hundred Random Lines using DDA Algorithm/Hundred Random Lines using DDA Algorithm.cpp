#include <graphics.h>
#include <iostream>
#include <math.h>
#include <ctime>
 
int main(){
    float x,y,x1,y1,x2,y2,dx,dy,step;
    int attempt = 0;
    int color;
    int i,gd=DETECT,gm;

    initwindow(1000,1000);
    srand(time(NULL));
    
    
    while (attempt < 100) {
        x1 = rand() % (500) + 10;
        x2 = rand() % (550) + 20;
        y1 = rand() % (560) + 30;
        y2 = rand() % (570) + 40;
        color = rand();
       
        dx=abs(x2-x1);
        dy=abs(y2-y1);
        
        if(dx>=dy)
            step=dx;
        else
            step=dy;
        
        dx=dx/step;
        dy=dy/step;
        
        x=x1;
        y=y1;
        
        i=1;
        while(i<=step){
            putpixel(x,y,color);
            x=x+dx;
            y=y+dy;
            i=i+1;
            delay(5);
            } 
        attempt++;
    }

    closegraph();
}
