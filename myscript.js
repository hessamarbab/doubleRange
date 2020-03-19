"use strict";
var CostBars= {
        startClicked:[],
        Barleft:[],
        Barright:[],
        endClicked:[],
        show:document.getElementsByClassName("show_cost"),
        bar:document.getElementsByClassName("bar"),
        period:document.getElementsByClassName("cost_bar"),
        start: document.getElementsByClassName("circle_start"),
        end : document.getElementsByClassName("circle_end"),

        moveStart :function(ev)
        {
               if(CostBars.startClicked[0]  && ev.clientX*100/screen.width<19 && ev.clientX*100/screen.width>10 && ev.clientX<CostBars.Barright[0])
               {
                       CostBars.Barleft[0]=  (ev.clientX);
                       this.style.left= CostBars.setPosition(CostBars.Barleft[0],screen.width*10/100,-.5);
                       CostBars.updateInterface();
                }

        },
        moveEnd:function(ev)
        {
                if(CostBars.endClicked[0]  &&  ev.clientX*100/screen.width<19 && ev.clientX*100/screen.width>10 && ev.clientX>CostBars.Barleft[0])
                {
                        CostBars.Barright[0]=ev.clientX;
                        this.style.left=CostBars.setPosition(CostBars.Barright[0],screen.width*10/100,-.5);
                        CostBars.updateInterface();
                }

                // document.body.innerHTML=typeof this.style.left;
        },
        updateInterface()
        {
                CostBars.period[0].style.marginLeft= CostBars.setPosition(CostBars.Barleft[0],screen.width/10,0);
                CostBars.setWidth(CostBars.Barright[0] , CostBars.Barleft[0], 0);
                CostBars.setColorsByDistance(CostBars.Barright[0],CostBars.Barleft[0],0);
                CostBars.viewCost(CostBars.Barright[0],CostBars.Barleft[0],0,10000/screen.width);
        },
        setPosition(cursor,Left,calibrate)
        {
        return cursor - Left + calibrate*screen.width/100 +"px";
        },
        setWidth(firstPoint,lastPoint,Number)
        {
                CostBars.period[Number].style.width= (firstPoint - lastPoint)+"px";
        },
        viewCost(firstPoint,lastPoint,Number,factor)
        {
                CostBars.show[Number].innerHTML= "cost:<br>"+
                ((lastPoint-(screen.width/10))*factor).toFixed(2) +" to "+
                ((firstPoint-(screen.width/10))*factor).toFixed(2);
        },
        setColorsByDistance(firstPoint,lastPoint,Number)
        {
                var color="hsl("+((firstPoint - lastPoint))*2000/screen.width+", 50%, 30%)";
                CostBars.period[Number].style.backgroundColor =color;
                CostBars.start[Number].style.backgroundColor =color;
                CostBars.end[Number].style.backgroundColor =color;
        },
        trigStartClicked:function()
        {
                CostBars.startClicked[0]=1;
        },
        trigEndClick:function()
        {
                CostBars.endClicked[0]=1;
        },

        distrigStartClick:function()
        {
                CostBars.startClicked[0]=0;
        },
        distrigEndClick:function()
        {
                CostBars.endClicked[0]=0;
        },
        trigMouseUp:function()
        {
                CostBars.endClicked[0]=0;
                CostBars.startClicked[0]=0;
        }
};
CostBars.Barleft[0]=(screen.width/10);
CostBars.Barright[0]=(screen.width/5);
document.documentElement.addEventListener("mouseup",CostBars.trigMouseUp);
CostBars.start[0].addEventListener("mousemove",CostBars.moveStart);
CostBars.end[0].addEventListener("mousemove",CostBars.moveEnd);
CostBars.start[0].addEventListener("mousedown",CostBars.trigStartClicked);
CostBars.end[0].addEventListener("mousedown",CostBars.trigEndClick);
CostBars.start[0].addEventListener("mouseup",CostBars.distrigStartClick);
CostBars.end[0].addEventListener("mouseup",CostBars.distrigEndClick);
