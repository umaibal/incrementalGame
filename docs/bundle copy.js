!function(e,t){for(var n in t)e[n]=t[n]}(this,function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var l=0,i=0,c=document.getElementById("myCanvas").getContext("2d");c.fillStyle="hsl(50, 100%, 50%)",c.fillRect(0,0,500,600);var r=document.getElementById("clickProgressA").getContext("2d"),a=document.getElementById("clickProgressB").getContext("2d"),d=function(){function e(t,n,o){var l=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=t,this.xCoord=n,this.yCoord=o,this.avatar=new Image,this.avatar.src="flappyBird.png",this.avatar.onload=function(){c.drawImage(l.avatar,l.xCoord,l.yCoord)}}return o(e,[{key:"flyUp",value:function(){var t;this.yCoord>=20?(this.yCoord-=20,console.log("new coord"+this.yCoord),c.fillStyle="hsl(50, 100%, 50%)",c.fillRect(0,0,500,600)):(t=100*Math.random()+100*Math.random(),c.fillStyle="hsl("+t+", 100%, 50%)",c.fillRect(0,0,500,600),this.yCoord=530),new e("yellowBird",this.xCoord,this.yCoord)}}]),e}(),s=new d("yellowBird",210,530);function u(){var e=60,t=setInterval(function(){0==e&&(alert("GAME OVER!!!"),clearInterval(t),document.getElementById("clickButton").disabled=!0,document.getElementById("saveButton").disabled=!0,document.getElementById("cheatButton").disabled=!0,r.fillStyle="white",r.fillRect(0,0,500,40),a.fillStyle="white",a.fillRect(0,0,500,40)),document.getElementById("timer").innerHTML="Time Left: "+e+" seconds",e--},1e3);setInterval(function(){document.getElementById("pointsDisplay").innerHTML="Points: "+l},100),setInterval(function(){"white"!=r.fillStyle&&"white"!=a.fillStyle&&(console.log(i+" both bars have been filled up"),i=0,a.fillStyle="white",a.fillRect(0,0,500,40),r.fillStyle="white",r.fillRect(0,0,500,40),c.fillStyle="hsl(50, 100%, 50%)",c.fillRect(0,0,500,600),s=new d("yellowBird",210,545),console.log("NEW Y COORD AFTER FALLING: "+s.yCoord),345==s.yCoord?(l+=10,console.log("WINNIIINGGG")):325==s.yCoord&&(l+=20))},2e3)}window.onload=function(){console.log("loading game when window loads"),setTimeout(u(),6e4),document.getElementById("pointsDisplay").innerHTML="Points: "+l;try{var e=JSON.parse(localStorage.getItem("save"));console.log("load complete"),void 0!==e.clicks&&(l=e.clicks,document.getElementById("clickButton").textContent="CLICK HERE!"),void 0!==e.currentItem&&(l=e.currentItem,document.getElementById("clickButton").textContent="CLICK HERE!")}catch(e){console.error(e)}},document.getElementById("clickButton").addEventListener("click",function(){console.log(i),l++,i++,document.getElementById("clickButton").textContent="CLICK HERE!",1==i?(r.fillStyle="blue",r.fillRect(0,0,500,40),console.log("blue"+i)):2==i&&(a.fillStyle="pink",a.fillRect(0,0,500,40),console.log("pink"+i)),s.flyUp()}),document.getElementById("cheatButton").addEventListener("click",function(){console.log("current points"+l),l+=50,console.log("upgraded points"+l)}),document.getElementById("saveButton").addEventListener("click",function(){!function(){console.log("Attempting save...");var e={clicks:l,currentItem:l};try{localStorage.setItem("save",JSON.stringify(e)),console.log("Save complete :)")}catch(e){console.error(e)}}()}),document.getElementById("newGameButton").addEventListener("click",function(){var e;e=JSON.parse(localStorage.getItem("save")),document.getElementById("clickButton").disabled=!1,document.getElementById("saveButton").disabled=!1,document.getElementById("cheatButton").disabled=!1,l=0,e.clicks=0,u()})},function(e,t,n){e.exports=n(0)}]));