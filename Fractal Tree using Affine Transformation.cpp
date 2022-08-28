//Tugas Grafika Komputer
//M Daffa Gashandy - 455449 

#include<iostream> 
#include<stdio.h>  
#include<math.h>
#include<graphics.h>
#include "bitmap_image.hpp"

using namespace std;

//Viewport
float xwmin = -4, xwmax = 4, ywmin=0 , ywmax=10;
float xvmin = 0, xvmax = 500, yvmin=0, yvmax=700;

typedef struct coordinate { 
    float x,y;
}
coord;

//Iterasi Awal - Batang
void batang(coord p[4]) { 
    line(p[0].x, p[0].y, p[1].x, p[1].y);
    line(p[1].x, p[1].y, p[2].x, p[2].y);
    line(p[2].x, p[2].y, p[3].x, p[3].y);
    line(p[3].x, p[3].y, p[0].x, p[0].y);
}

//Transformasi Windows ke Viewport/Sebaliknya
void WV(float xw,float yw,float &xv,float &yv) {
	xv = xvmin+round((xw-xwmin)*(xvmax-xvmin)/(xwmax-xwmin));
    yv = yvmax-round((yw-ywmin)*(yvmax-yvmin)/(ywmax-ywmin));
}
void VW(float xv,float yv,float &xw,float &yw) {
   xw = xwmin+(xv-xvmin)*(xwmax-xwmin)/(xvmax-xvmin);
   yw = ywmin+(yvmax-yv)*(ywmax-ywmin)/(yvmax-yvmin);
}


int main() {
	int menu;
	char ulang;
	float input;
	
	//Ukuran Window
	initwindow(500,700,"Fractal Tree",50,50,false,true);
    
    //Mengubah Variabel dari alpa, beta, dan gama
	int alpa = -3, beta = -21, gama = 50, theta = 10;
	
	float a[6],b[6],c[6],d[6],e[6],f[6];
	
	//Iterasi ke1
	a[1] = 0;
	b[1] = 0;
	c[1] = 0;
	d[1] = 0.1;
	e[1] = 0;
	f[1] = 0;
 	
 	//Iterasi ke2
	a[2] = 0.75*cos(alpa*M_PI/180);
	b[2] = -0.75*sin(alpa*M_PI/180);
	c[2] = 0.75*sin(alpa*M_PI/180);
	d[2] = 0.75*cos(alpa*M_PI/180);
	e[2] = 0;
	f[2] = 2.5;

	//Iterasi ke3
	a[3]=0.55*cos(beta*M_PI/180);
	b[3]=-0.65*sin(beta*M_PI/180);
	c[3]=0.47*sin(beta*M_PI/180);
	d[3]=0.67*cos(beta*M_PI/180);
	e[3]=0;
	f[3]=1.57;
  	
  	//Iterasi ke4
	a[4]=0.66*cos(gama*M_PI/180);
	b[4]=-0.49*sin(gama*M_PI/180);
	c[4]=0.63*sin(gama*M_PI/180);
	d[4]=0.58*cos(gama*M_PI/180);
	e[4]=0;
	f[4]=1.65;
	
	//Iterasi ke5
	a[5]=0.4*cos(theta*M_PI/180);
	b[5]=-0.4*sin(theta*M_PI/180);
	c[5]=0.4*sin(theta*M_PI/180);
	d[5]=0.4*cos(theta*M_PI/180);
	e[5]=0;
	f[5]=1.3;

	rectangle(yvmax,yvmin,xvmax,yvmax);
	floodfill(xvmin+1,yvmin+1,WHITE);
  
	int width = (xvmax-xvmin);
	int height = (yvmax-yvmin);
	bitmap_image fractal(width,height);
	
	//Draw Batang pada Iterasi Pertama
	setcolor(BROWN);
	coord p[4];
	p[0].x = xvmax/2-7; p[0].y = yvmax-2;
	p[1].x = xvmax/2+7; p[1].y = yvmax-2;
	p[2].x = xvmax/2+5; p[2].y = 415;
	p[3].x = xvmax/2-5; p[3].y = 415;
	batang(p);
	setfillstyle(SOLID_FILL,BROWN);
	floodfill(xvmax/2,420,BROWN);
	
	//WHITE == BG
	//BROWN == BATANG
	
	int k=1, numit=10;
	float x,y,xb,yb,XI,YI;
	
	while(k<=numit){
  	setcolor(WHITE);
  	rectangle(0,0,(xvmax-xvmin),(yvmax-yvmin));
  	for(int i=xvmin; i<xvmax; i++){
  		for(int j=yvmin; j<yvmax; j++){
  			if (getpixel(i,j) != WHITE){
				VW(i,j,x,y);
			 	cout<<i;
			 
  				xb=a[1]*x+b[1]*y+e[1];
            	yb=c[1]*x+d[1]*y+f[1];
      		 	WV(xb,yb,XI,YI);
       			putpixel(XI,YI,1);
       		
       			//Cabang Atas
       			xb=a[2]*x+b[2]*y+e[2];
       			yb=c[2]*x+d[2]*y+f[2];
       			WV(xb,yb,XI,YI);
       			putpixel(XI,YI,1);
       		
       			//Cabang Kanan
       			xb=a[3]*x+b[3]*y+e[3];
       			yb=c[3]*x+d[3]*y+f[3];
      		 	WV(xb,yb,XI,YI);
       			putpixel(XI,YI,11);
       		
       			//Cabang Kiri
       			xb=a[4]*x+b[4]*y+e[4];
       			yb=c[4]*x+d[4]*y+f[4];
       			WV(xb,yb,XI,YI);
       			putpixel(XI,YI,3);
       			
       			//Cabang Tambahan
       			xb=a[5]*x+b[5]*y+e[5];
       			yb=c[5]*x+d[5]*y+f[5];
       			WV(xb,yb,XI,YI);
       			putpixel(XI,YI,2);
				}
		  	}
	  	}
		k = k+1;
		cout<<"/n";
  	}
	getch();
	closegraph();
}
