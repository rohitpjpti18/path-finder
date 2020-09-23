!function(e){var t={};function i(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(s,o,function(t){return e[t]}.bind(null,o));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{generateRandomNumber(e,t){return Math.floor(Math.random()*(t-e+2)+e)}generateTrueOrFalse(){return this.generateRandomNumber(1,100)%2==0}GenerateOddRandomNumber(e,t){let i=Math.floor(Math.random()*(t-e+2)+e);return i%2==0?i-1:i}GenerateEvenRandomNumber(e,t){let i=Math.floor(Math.random()*(t-e+1)+e);return i%2!=0?i!==t?i+1:i-1:i}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.adjacenyList=[],this.edgeList=[],this.weight=10}resetEdges(){this.edgeList=[],this.adjacenyList=[]}computeUnweightedEdges(e,t){this.edgeList=[];for(let i=0;i<e.length;i++)e[i][4]||(i>=t&&(e[i-t][4]||this.edgeList.push([i,i-t,1])),i<e.length-t&&(e[i+t][4]||this.edgeList.push([i,i+t,1])),i%t!=0&&(e[i-1][4]||this.edgeList.push([i,i-1,1])),0!=i&&(i+1)%t==0||e[i+1][4]||this.edgeList.push([i,i+1,1]))}computeWeightedEdges(e,t){this.edgeList=[],this.adjacenyList=[];for(let i=0;i<e.length;i++){let s=[];e[i][4]||(i>=t&&(e[i-t][4]||e[i-t][5]||s.push([i-t,1]),!e[i-t][4]&&e[i-t][5]&&s.push([i-t,this.weight])),i<e.length-t&&(e[i+t][4]||e[i+t][5]||s.push([i+t,1]),!e[i+t][4]&&e[i+t][5]&&s.push([i+t,this.weight])),i%t!=0&&(e[i-1][4]||e[i-1][5]||s.push([i-1,1]),!e[i-1][4]&&e[i-1][5]&&s.push([i-1,this.weight])),0!=i&&(i+1)%t==0||(e[i+1][4]||e[i+1][5]||s.push([i+1,1]),!e[i+1][4]&&e[i+1][5]&&s.push([i+1,this.weight]))),this.adjacenyList.push(s)}return this.adjacenyList}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(3),o=i(10),n=i(11),d=i(12);let r=23,l=59,h=629,a=648;(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))&&(r=23,l=15,h=16,a=313);const u=r,c=l,f=h,g=a;let m=new s.default(u,c,f,g),b=document.getElementById("weights");b.onclick=()=>{1==b.checked?m.addWeight=!0:m.addWeight=!1};let p=document.getElementById("startExec"),y=(document.getElementById("wall"),document.getElementById("clear")),v=document.getElementById("rdi"),L=document.getElementById("rdv"),w=document.getElementById("rdh"),N=document.getElementById("rwl"),C=document.getElementById("rweight"),S=document.getElementById("dfs"),H=document.getElementById("bfs"),I=document.getElementById("dijkstra");v.onclick=()=>{new d.default(m).execute(1)},L.onclick=()=>{new d.default(m).execute(2)},w.onclick=()=>{new d.default(m).execute(3)},N.onclick=()=>{new o.default(m,m.colorHandler).execute()},C.onclick=()=>{new n.default(m,m.colorHandler).execute()},S.onclick=()=>{m.algoID=2},H.onclick=()=>{m.algoID=1},I.onclick=()=>{m.algoID=3},p.onclick=()=>{m.algoHandler()},y.onclick=()=>{m.clearBoard()};var P=document.getElementById("myModal"),E=(document.getElementById("myBtn"),document.getElementById("close"));P.style.display="block",E.onclick=function(){P.style.display="none"},window.onclick=function(e){e.target==P&&(P.style.display="none")}},function(e,t,i){"use strict";var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function d(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(d,r)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=i(4),n=i(1),d=i(5),r=i(6),l=i(8),h=i(9);t.default=class{constructor(e,t,i,s){this.nodes=new o.default(e,t),this.edges=new n.default,this.colorHandler=new d.default,this.container=document.getElementById("main"),this.table=document.createElement("table"),this.source=i,this.destination=s,this.addWeight=!1,this.algoID=-1,this.sSymbol="<img class='start-mark'>$</img>",this.sSelectedSymbol="<img class='start-mark'>$</img>",this.dSymbol="<img class='end-mark'>O</img>",this.dSelectedSymbol="<img class='end-mark'>O</img>",this.algoExecuted=!1,this.algoInProgress=!1,this.leftClicked=!1,this.startNodeSelected=!1,this.endNodeSelected=!1,this.overlapped=!1,this.openBuildByRD=[],this.previousCol=!1;for(let i=0;i<e;i++){let e=document.createElement("tr");for(let s=0;s<t;s++){let o=(i*t+s).toString(),n=document.createElement("td");n.id=o,e.appendChild(n),this.openBuildByRD.push(!1)}this.table.appendChild(e)}this.container.appendChild(this.table),document.getElementById(this.source.toString()).innerHTML=this.sSymbol,document.getElementById(this.destination.toString()).innerHTML=this.dSymbol,this.eventListeners()}handleWallBuildingHauleHaule(e){return s(this,void 0,void 0,(function*(){e!=this.source&&e!=this.destination?this.nodes.handleWallSwitch(e):this.nodes.nodeList[e][4]=!1,yield this.colorHandler.updateNodeColor(this.nodes.nodeList[e])}))}clearBoard(){this.algoExecuted=!1,this.nodes.resetAllNodes(),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination)}eventListeners(){for(let e=0;e<this.nodes.totalNodes;e++){let t=document.getElementById(this.nodes.nodeList[e][0]);t.onmousedown=e=>{if(e.preventDefault(),!this.algoInProgress){if(this.leftClicked&&(this.startNodeSelected||this.endNodeSelected))return this.leftClicked=!1,void(this.startNodeSelected?t.innerHTML=this.sSymbol:t.innerHTML=this.dSymbol);if(this.leftClicked=!0,t.id===this.source.toString()||t.id===this.destination.toString())t.id===this.source.toString()?(this.startNodeSelected=!0,t.innerHTML=this.sSelectedSymbol):(this.endNodeSelected=!0,t.innerHTML=this.dSelectedSymbol);else{let e=parseInt(t.id);this.addWeight?(this.nodes.handleWeightSwitch(e),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination)):(this.nodes.handleWallSwitch(e),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination))}}},t.onmouseenter=()=>{if(!this.algoInProgress)if(!this.leftClicked||this.startNodeSelected||this.endNodeSelected)this.leftClicked&&(this.startNodeSelected||this.endNodeSelected)&&(this.nodes.isWall(parseInt(t.id))&&(this.overlapped=!0,this.nodes.setNodeToDefault(parseInt(t.id)),this.startNodeSelected?this.colorHandler.recolorAllNodes(this.nodes.nodeList,parseInt(t.id),this.destination):this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,parseInt(t.id))),this.algoExecuted&&(this.endNodeSelected?this.reCompute("bfs",this.source,parseInt(t.id)):this.startNodeSelected&&this.reCompute("bfs",parseInt(t.id),this.destination)),this.startNodeSelected?t.innerHTML=this.sSelectedSymbol:t.innerHTML=this.dSelectedSymbol);else if(t.id!==this.source.toString()||t.id!==this.destination.toString()){let e=parseInt(t.id);this.addWeight||(this.nodes.handleWallSwitch(e),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination))}else{let e=parseInt(t.id);this.addWeight||(this.nodes.setNodeToDefault(e),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination))}},t.onmouseleave=()=>{if(!this.algoInProgress){if(this.leftClicked&&(t.id==this.source.toString()||t.id==this.destination.toString()))if(t.id==this.source.toString()&&this.endNodeSelected)t.innerHTML=this.sSymbol;else if(t.id==this.destination.toString()&&this.startNodeSelected)return void(t.innerHTML=this.dSymbol);this.leftClicked&&this.overlapped&&(this.nodes.setNodeToWall(parseInt(t.id)),this.colorHandler.justRecolor(this.nodes.nodeList),this.overlapped=!1),(this.startNodeSelected||this.endNodeSelected)&&(t.innerHTML="")}},t.onmouseup=()=>{if(!this.algoInProgress){if(this.startNodeSelected)if(this.nodes.isWall(parseInt(t.id))&&(this.nodes.setNodeToDefault(parseInt(t.id)),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination),this.overlapped=!1),t.id==this.destination.toString())document.getElementById(this.source.toString()).innerHTML=this.sSymbol,t.innerHTML=this.dSymbol,this.startNodeSelected=!1;else this.source=parseInt(t.id),this.startNodeSelected=!1,t.innerHTML=this.sSymbol;if(this.endNodeSelected)if(this.nodes.isWall(parseInt(t.id))&&(this.nodes.setNodeToDefault(parseInt(t.id)),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination),this.overlapped=!1),t.id==this.source.toString())document.getElementById(this.destination.toString()).innerHTML=this.dSymbol,t.innerHTML=this.sSymbol,this.endNodeSelected=!1;else this.destination=parseInt(t.id),this.endNodeSelected=!1,t.innerHTML=this.dSymbol;this.leftClicked=!1}}}}reCompute(e,t,i){if(1==this.algoID){new r.default(this.nodes.nodeList,this.edges.edgeList,this.source,this.destination,this.colorHandler).quickExecute(this,t,i)}if(2==this.algoID){this.nodes.resetNodesForUA(),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination),this.edges.computeUnweightedEdges(this.nodes.nodeList,this.nodes.column);let e=new l.default(this.nodes.nodeList,this.edges.edgeList,this.source,this.destination,this.colorHandler);this.nodes.nodeList[t][1]=1,this.colorHandler.findQuickPath(this.nodes.nodeList,i,t),e.computeQuickDFS(t,i),this.colorHandler.findQuickPath(this.nodes.nodeList,i,t)}if(3==this.algoID){new h.default(this,this.colorHandler).quickExecute(t,i)}}algoHandler(){return s(this,void 0,void 0,(function*(){switch(this.algoID){case 1:let e=new r.default(this.nodes.nodeList,this.edges.edgeList,this.source,this.destination,this.colorHandler);yield e.execute(this);break;case 2:this.algoInProgress=!0,this.nodes.resetNodesForUA(),this.colorHandler.recolorAllNodes(this.nodes.nodeList,this.source,this.destination),this.edges.computeUnweightedEdges(this.nodes.nodeList,this.nodes.column);let t=new l.default(this.nodes.nodeList,this.edges.edgeList,this.source,this.destination,this.colorHandler);this.nodes.nodeList[this.source][1]=1,yield this.colorHandler.updateNodeColor(this.nodes.nodeList[this.source]),yield t.computeDFS(this.source),yield this.colorHandler.findPath(this.nodes.nodeList,this.destination,this.source),this.algoInProgress=!1,this.algoExecuted=!0;break;case 3:let i=new h.default(this,this.colorHandler);yield i.execute();break;default:alert("You haven't selected an algorithm or the algorithm you selected is not yet implemented. Please choose a valid algorithm.")}}))}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.column=t,this.row=e,this.nodeList=[],this.totalNodes=this.column*this.row;for(let e=0;e<this.totalNodes;e++)this.nodeList.push([e.toString(),0,-1,-1,!1,!1])}isWall(e){return this.nodeList[e][4]}removeWeight(e){this.nodeList[e][5]=!1}addWeight(e){this.nodeList[e][5]=!0}resetAllNodes(){for(let e=0;e<this.nodeList.length;e++)this.nodeList[e][1]=0,this.nodeList[e][2]=-1,this.nodeList[e][3]=-1,this.nodeList[e][4]=!1,this.nodeList[e][5]=!1}resetNodesForUA(){for(let e=0;e<this.nodeList.length;e++)this.nodeList[e][4]?this.nodeList[e][1]=3:this.nodeList[e][1]=0,this.nodeList[e][2]=-1,this.nodeList[e][3]=-1,this.nodeList[e][5]=!1}resetNodesForWA(){for(let e=0;e<this.nodeList.length;e++)this.nodeList[e][4]?this.nodeList[e][1]=3:this.nodeList[e][1]=0,this.nodeList[e][2]=-1,this.nodeList[e][3]=-1}getNeighbours(e){let t=[];return e>=this.column&&t.push(e-this.column),e<this.nodeList.length-this.column&&t.push(e+this.column),e%this.column!=0&&t.push(e-1),0!=e&&(e+1)%this.column==0||t.push(e+1),t}handleWallSwitch(e){this.nodeList[e][4]=!this.nodeList[e][4],this.nodeList[e][4]?(this.nodeList[e][1]=3,this.nodeList[e][5]=!1):this.nodeList[e][1]=0}handleWeightSwitch(e){this.nodeList[e][5]=!this.nodeList[e][5],this.nodeList[e][5]?(this.nodeList[e][1]=0,this.nodeList[e][4]=!1):this.nodeList[e][1]=0}setNodeToWall(e){this.nodeList[e][4]=!0,this.nodeList[e][5]=!1,this.nodeList[e][1]=3}setNodeToDefault(e){this.nodeList[e][4]=!1,this.nodeList[e][5]=!1,this.nodeList[e][1]=0}getNode(e){return this.nodeList[e]}resolveRowColumn(e,t){return e*this.column+t}}},function(e,t,i){"use strict";var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function d(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(d,r)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.speed=25,this.defaultColor="#c5e2db",this.wallColor="#4a5e58",this.visitedColor="#96daeb",this.pathColor="#ffe066"}sleep(){return new Promise(e=>setTimeout(e,this.speed))}updateCellColor(e,t,i){e.style.backgroundColor=t,e.style.borderColor=i}updateNodeColor(e){return s(this,void 0,void 0,(function*(){var t=document.getElementById(e[0]);0==e[1]?this.updateCellColor(t,"white",this.defaultColor):1==e[1]?this.updateCellColor(t,this.visitedColor,this.defaultColor):2==e[1]?this.updateCellColor(t,this.pathColor,this.defaultColor):3==e[1]&&this.updateCellColor(t,this.wallColor,this.wallColor),yield this.sleep()}))}recolorAllNodes(e,t,i){for(let s=0;s<e.length;s++){let o=document.getElementById(e[s][0]);0==e[s][1]&&this.updateCellColor(o,"white",this.defaultColor),1==e[s][1]&&this.updateCellColor(o,this.visitedColor,this.defaultColor),2==e[s][1]&&this.updateCellColor(o,this.pathColor,this.defaultColor),3==e[s][1]&&this.updateCellColor(o,this.wallColor,this.wallColor),e[s][5]?o.innerHTML="W":(s!=t&&s!=i&&(o.innerHTML=""),s==t&&(o.innerHTML="$"),s==i&&(o.innerHTML="O"))}}justRecolor(e){for(let t=0;t<e.length;t++){let i=document.getElementById(e[t][0]);0==e[t][1]&&this.updateCellColor(i,"white",this.defaultColor),1==e[t][1]&&this.updateCellColor(i,this.visitedColor,this.defaultColor),2==e[t][1]&&this.updateCellColor(i,this.pathColor,this.defaultColor),3==e[t][1]&&this.updateCellColor(i,this.wallColor,this.wallColor)}}findPath(e,t,i){return s(this,void 0,void 0,(function*(){let s=[],o=t;for(;-1!=e[o][2];)e[o][1]=2,s.push(o),o=e[o][2];o==i&&(e[o][1]=2,s.push(o));for(let t=s.length-1;t>=0;--t)yield this.updateNodeColor(e[s[t]])}))}findQuickPath(e,t,i){let s=[],o=t;for(;-1!=e[o][2];)e[o][1]=2,s.push(o),o=e[o][2];o==i&&(e[o][1]=2,s.push(o)),this.recolorAllNodes(e,i,t)}}},function(e,t,i){"use strict";var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function d(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(d,r)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=i(7);t.default=class{constructor(e,t,i,s,o){this.colorhandler=o,this.nodes=e,this.edges=t,this.source=i,this.destination=s}computeBFS(e){return s(this,void 0,void 0,(function*(){let t=new o.default;for(this.nodes[e][3]=1,t.enqueue(e),this.nodes[e][1]=1,yield this.colorhandler.updateNodeColor(this.nodes[e]);!t.isEmpty();){let e=t.front();t.dequeue();for(let s=0;s<this.edges.length;s++){var i=this.edges[s][0];let o=this.edges[s][1];if(i==e&&1!=this.nodes[o][3]&&(this.nodes[o][3]=1,t.enqueue(o),this.nodes[o][2]=e,this.nodes[o][1]=1,yield this.colorhandler.updateNodeColor(this.nodes[o]),o==this.destination))return}}}))}computeQuickBFS(e,t){let i=new o.default;for(this.nodes[e][3]=1,i.enqueue(e),this.nodes[e][1]=1;!i.isEmpty();){let e=i.front();i.dequeue();for(let o=0;o<this.edges.length;o++){var s=this.edges[o][0];let n=this.edges[o][1];if(s==e&&1!=this.nodes[n][3]&&(this.nodes[n][3]=1,i.enqueue(n),this.nodes[n][2]=e,this.nodes[n][1]=1,n==t))return}}}execute(e){return s(this,void 0,void 0,(function*(){e.algoInProgress=!0,e.nodes.resetNodesForUA(),this.colorhandler.recolorAllNodes(this.nodes,e.source,e.destination),e.edges.computeUnweightedEdges(e.nodes.nodeList,e.nodes.column),this.edges=e.edges.edgeList,yield this.computeBFS(this.source),yield e.colorHandler.findPath(e.nodes.nodeList,this.destination,this.source),e.algoInProgress=!1,e.algoExecuted=!0}))}quickExecute(e,t,i){e.nodes.resetNodesForUA(),e.colorHandler.recolorAllNodes(e.nodes.nodeList,e.source,e.destination),e.edges.computeUnweightedEdges(e.nodes.nodeList,e.nodes.column),this.edges=e.edges.edgeList,this.computeQuickBFS(t,i),e.colorHandler.findQuickPath(e.nodes.nodeList,i,t)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.items=[]}isEmpty(){return 0==this.items.length}printQueue(){let e="[";for(let t=0;t<this.items.length;t++)e+=this.items[t]+" ";return e}enqueue(e){this.items.push(e)}dequeue(){return this.isEmpty()?"Underflow":this.items.shift()}front(){return this.isEmpty()?"No elements in Queue":this.items[0]}}},function(e,t,i){"use strict";var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function d(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(d,r)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t,i,s,o){this.colorhandler=o,this.nodes=e,this.edges=t,this.source=i,this.destination=s,this.destinationFound=!1}computeDFS(e){return s(this,void 0,void 0,(function*(){if(!this.destinationFound){this.nodes[e][3]=1;for(let t=0;t<this.edges.length;t++){let i=this.edges[t][0],s=this.edges[t][1];if(i==e&&1!=this.nodes[s][3]&&(this.nodes[s][2]=e,this.nodes[s][1]=1,yield this.colorhandler.updateNodeColor(this.nodes[s]),s==this.destination&&(this.destinationFound=!0),yield this.computeDFS(s),this.destinationFound))break}}}))}computeQuickDFS(e,t){if(!this.destinationFound){this.nodes[e][3]=1;for(let i=0;i<this.edges.length;i++){let s=this.edges[i][0],o=this.edges[i][1];if(s==e&&1!=this.nodes[o][3]&&(this.nodes[o][2]=e,this.nodes[o][1]=1,o==t&&(this.destinationFound=!0),this.computeQuickDFS(o,t),this.destinationFound))break}}}}},function(e,t,i){"use strict";var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function d(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(d,r)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=i(1);t.default=class{constructor(e,t){this.source=e.source,this.destination=e.destination,this.nodes=e.nodes.nodeList,this.colorhandler=t,this.board=e}computeInfinity(e){let t=0;for(let i=0;i<e.length;i++)for(let s=0;s<e[i].length;s++)t+=e[i][s][1];return t+1}findAppropiateNode(e){let t=e,i=-1;for(let e=0;e<this.nodes.length;e++)1!=this.nodes[e][3]&&t>this.distance[e]&&(t=this.distance[e],i=e);return i}computeQuickDijkstra(e,t,i){let s=this.computeInfinity(i);this.distance=[];for(let e=0;e<this.nodes.length;e++)this.distance.push(s);this.distance[e]=0;for(let e=0;e<this.nodes.length;e++){let e=this.findAppropiateNode(s);if(-1==e)return;if(this.nodes[e][3]=1,this.nodes[e][1]=1,e==t)return;for(let t=0;t<i[e].length;t++){let s=i[e][t][0],o=i[e][t][1];1!=this.nodes[s][3]&&this.distance[s]>this.distance[e]+o&&(this.distance[s]=this.distance[e]+o,this.nodes[s][2]=e)}}}computeDijkstra(e,t,i){return s(this,void 0,void 0,(function*(){let s=this.computeInfinity(i);this.distance=[];for(let e=0;e<this.nodes.length;e++)this.distance.push(s);this.distance[e]=0;for(let e=0;e<this.nodes.length;e++){let e=this.findAppropiateNode(s);if(-1==e)return;if(this.nodes[e][3]=1,this.nodes[e][1]=1,yield this.colorhandler.updateNodeColor(this.nodes[e]),e==t)return;for(let t=0;t<i[e].length;t++){let s=i[e][t][0],o=i[e][t][1];1!=this.nodes[s][3]&&this.distance[s]>this.distance[e]+o&&(this.distance[s]=this.distance[e]+o,this.nodes[s][2]=e)}}}))}execute(){return s(this,void 0,void 0,(function*(){this.board.algoInProgress=!0,this.board.nodes.resetNodesForWA(),this.colorhandler.recolorAllNodes(this.board.nodes.nodeList,this.board.source,this.board.destination);let e=new o.default;this.adjencenyList=e.computeWeightedEdges(this.board.nodes.nodeList,this.board.nodes.column),console.log(this.adjencenyList),yield this.computeDijkstra(this.source,this.destination,this.adjencenyList),yield this.colorhandler.findPath(this.nodes,this.destination,this.source),this.board.algoInProgress=!1,this.board.algoExecuted=!0}))}quickExecute(e,t){this.board.algoInProgress=!0,this.board.nodes.resetNodesForWA();let i=new o.default;this.adjencenyList=i.computeWeightedEdges(this.board.nodes.nodeList,this.board.nodes.column),this.computeQuickDijkstra(e,t,this.adjencenyList),this.colorhandler.findQuickPath(this.nodes,t,e),this.board.algoInProgress=!1,this.board.algoExecuted=!0}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.default=class{constructor(e,t){this.board=e,this.color=t,this.random=new s.default}generateRandomMaze(){this.board.clearBoard(),this.board.algoInProgress=!0;for(let e=0;e<this.board.nodes.nodeList.length;e++)if(e!=this.board.source&&e!=this.board.destination){if(this.random.generateTrueOrFalse()){this.random.generateTrueOrFalse()&&this.board.nodes.setNodeToWall(e)}}this.color.recolorAllNodes(this.board.nodes.nodeList,this.board.source,this.board.destination),this.board.algoInProgress=!1}execute(){this.generateRandomMaze()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.default=class{constructor(e,t){this.board=e,this.color=t,this.random=new s.default}generateRandomWeights(){this.board.clearBoard(),this.board.algoInProgress=!0;for(let e=0;e<this.board.nodes.nodeList.length;e++)if(e!=this.board.source&&e!=this.board.destination){if(this.random.generateTrueOrFalse()){this.random.generateTrueOrFalse()&&this.board.nodes.addWeight(e)}}this.color.recolorAllNodes(this.board.nodes.nodeList,this.board.source,this.board.destination),this.board.algoInProgress=!1}execute(){this.generateRandomWeights()}}},function(e,t,i){"use strict";var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function d(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(d,r)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=i(0);t.default=class{constructor(e){this.board=e,this.random=new o.default}handleReachability(e,t){let i=this.board.nodes.getNeighbours(e),s=this.board.nodes.getNeighbours(t);console.log(i),console.log(s);let n=!0,d=!0;for(let e=0;e<i.length;e++)this.board.nodes.isWall(i[e])||(n=!1);for(let e=0;e<s.length;e++)this.board.nodes.isWall(s[e])||(d=!1);if(n){let e=(new o.default).generateRandomNumber(0,i.length-1);this.board.nodes.setNodeToDefault(i[e])}if(d){let e=(new o.default).generateRandomNumber(0,s.length-1);this.board.nodes.setNodeToDefault(s[e])}this.board.colorHandler.recolorAllNodes(this.board.nodes.nodeList,this.board.source,this.board.destination)}buildBorder(){return s(this,void 0,void 0,(function*(){for(let e=0;e<this.board.nodes.column;e++)e!==this.board.source&&e!==this.board.destination&&(this.board.nodes.setNodeToWall(e),yield this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[e]));for(let e=1;e<this.board.nodes.row-1;e++)e*this.board.nodes.column!==this.board.source&&e*this.board.nodes.column!==this.board.destination&&(this.board.nodes.setNodeToWall(e*this.board.nodes.column),this.board.nodes.setNodeToWall(e*this.board.nodes.column+(this.board.nodes.column-1)),yield Promise.all([this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[e*this.board.nodes.column]),this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[e*this.board.nodes.column+(this.board.nodes.column-1)])]));for(let e=0;e<this.board.nodes.column;e++)e+(this.board.nodes.row-1)*this.board.nodes.column!==this.board.source&&e+(this.board.nodes.row-1)*this.board.nodes.column!==this.board.destination&&(this.board.nodes.setNodeToWall(e+(this.board.nodes.row-1)*this.board.nodes.column),yield this.board.colorHandler.updateNodeColor(this.board.nodes.nodeList[e+(this.board.nodes.row-1)*this.board.nodes.column]))}))}recursiveDivision(e,t,i,o){return s(this,void 0,void 0,(function*(){if(t>e+1&&o>i+1)if(t-e<o-i){let s=this.random.GenerateEvenRandomNumber(i,o);for(let i=e;i<=t;i++){let e=this.board.nodes.resolveRowColumn(i,s);yield this.board.handleWallBuildingHauleHaule(e)}let n=this.random.GenerateOddRandomNumber(e,t),d=this.board.nodes.resolveRowColumn(n,s);yield this.board.handleWallBuildingHauleHaule(d),yield this.recursiveDivision(e,t,i,s-1),yield this.recursiveDivision(e,t,s+1,o)}else{let s=this.random.GenerateEvenRandomNumber(e,t);for(let e=i;e<=o;e++){let t=this.board.nodes.resolveRowColumn(s,e);yield this.board.handleWallBuildingHauleHaule(t)}let n=this.random.GenerateOddRandomNumber(i,o),d=this.board.nodes.resolveRowColumn(s,n);yield this.board.handleWallBuildingHauleHaule(d),yield this.recursiveDivision(e,s-1,i,o),yield this.recursiveDivision(s+1,t,i,o)}}))}recursiveDivisionVertical(e,t,i,o){return s(this,void 0,void 0,(function*(){if(t>e+1&&o>i+1){let s=this.random.GenerateEvenRandomNumber(i,o);for(let i=e;i<=t;i++){let e=this.board.nodes.resolveRowColumn(i,s);yield this.board.handleWallBuildingHauleHaule(e)}let n=this.random.GenerateOddRandomNumber(e,t),d=this.board.nodes.resolveRowColumn(n,s);yield this.board.handleWallBuildingHauleHaule(d),yield this.recursiveDivisionVertical(e,t,i,s-1),yield this.recursiveDivisionVertical(e,t,s+1,o)}}))}recursiveDivisionHorizontal(e,t,i,o){return s(this,void 0,void 0,(function*(){if(t>e+1&&o>i+1){let s=this.random.GenerateEvenRandomNumber(e,t);for(let e=i;e<=o;e++){let t=this.board.nodes.resolveRowColumn(s,e);yield this.board.handleWallBuildingHauleHaule(t)}let n=this.random.GenerateOddRandomNumber(i,o),d=this.board.nodes.resolveRowColumn(s,n);yield this.board.handleWallBuildingHauleHaule(d),yield this.recursiveDivisionHorizontal(e,s-1,i,o),yield this.recursiveDivisionHorizontal(s+1,t,i,o)}}))}recursiveDivisionMaze(){return s(this,void 0,void 0,(function*(){this.board.algoInProgress=!0,this.board.clearBoard(),yield this.buildBorder(),yield this.recursiveDivision(1,this.board.nodes.row-2,1,this.board.nodes.column-2),this.handleReachability(this.board.source,this.board.destination),this.board.algoInProgress=!1}))}recursiveDivisionVerticalMaze(){return s(this,void 0,void 0,(function*(){this.board.algoInProgress=!0,this.board.clearBoard(),yield this.buildBorder(),yield this.recursiveDivisionVertical(1,this.board.nodes.row-2,1,this.board.nodes.column-2),this.board.algoInProgress=!1}))}recursiveDivisionHorizontalMaze(){return s(this,void 0,void 0,(function*(){this.board.algoInProgress=!0,this.board.clearBoard(),yield this.buildBorder(),yield this.recursiveDivisionHorizontal(1,this.board.nodes.row-2,1,this.board.nodes.column-2),this.board.algoInProgress=!1}))}execute(e){return s(this,void 0,void 0,(function*(){1==e&&(yield this.recursiveDivisionMaze()),2==e&&(yield this.recursiveDivisionVerticalMaze()),3==e&&(yield this.recursiveDivisionHorizontalMaze())}))}}}]);