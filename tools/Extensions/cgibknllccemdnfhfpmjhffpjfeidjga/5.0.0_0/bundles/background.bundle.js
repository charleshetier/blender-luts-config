!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=772)}({140:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},141:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},772:function(e,t,n){"use strict";n.r(t);var r=n(141),a=n.n(r),o=n(140),c=n.n(o);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=[],l={},h={},p={};function d(e){return{title:e,snapshots:[],initialSnapshot:[],index:0,currLocation:null,currParent:0,currBranch:0,hierarchy:null,initialHierarchy:null,mode:{persist:!1,locked:!1,paused:!1,empty:!1}}}var f=function e(t,n){c()(this,e),this.index=n.index++,this.name=n.currParent+=1,this.branch=n.currBranch,this.stateSnapshot=t,this.children=[]};function y(e,t){e.currLocation?(e.currLocation.children.push(t),e.currLocation.children.length>1&&(t.branch+=1,e.currBranch=t.branch),e.currLocation=t):(e.currLocation=t,e.hierarchy=t)}chrome.runtime.onConnect.addListener((function(e){u.push(e),Object.keys(p).length>0&&e.postMessage({action:"initialConnectSnapshots",payload:p}),e.onDisconnect.addListener((function(e){for(var t=0;t<u.length;t+=1)if(u[t]===e){u.splice(t,1);break}})),e.onMessage.addListener((function(e){var t=e.action,n=e.payload,r=e.tabId;switch(t){case"import":return p[r].snapshots=n,!0;case"emptySnap":return p[r].mode.empty=!0,p[r].initialSnapshot.push(p[r].snapshots[0]),p[r].snapshots=[p[r].snapshots[p[r].snapshots.length-1]],p[r].initialHierarchy=s(s({},p[r].hierarchy),{},{children:[]}),p[r].hierarchy.children=[],p[r].hierarchy.stateSnapshot=s({},p[r].snapshots[0]),p[r].currLocation=p[r].hierarchy,p[r].index=0,p[r].currParent=1,p[r].currBranch=0,!0;case"setLock":p[r].mode.locked=n;break;case"setPause":p[r].mode.paused=n;break;case"setPersist":p[r].mode.persist=n}return chrome.tabs.sendMessage(r,e),!0}))})),chrome.runtime.onMessage.addListener((function(e,t){if("SIGN_CONNECT"===e.type)return!0;var n=t.tab.title,r=t.tab.id,a=e.action,o=e.index,c=e.name;if("tabReload"!==a&&"recordSnap"!==a&&"jumpToSnap"!==a&&"injectScript"!==a)return!0;!0&&!(r in p)&&(p[r]=d(n));var i=p[r].mode,s=i.persist,b=i.empty;switch(a){case"jumpToSnap":!function e(t,n,r,a){if(n.index===r)return t.currLocation=n,void(t.currParent=a);n&&n.children.length&&n.children&&n.children.forEach((function(n){e(t,n,r,a)}))}(p[r],p[r].hierarchy,o,c);break;case"injectScript":chrome.tabs.executeScript(r,{code:"\n        // Function will attach script to the dom \n        const injectScript = (file, tag) => {\n          const htmlBody = document.getElementsByTagName(tag)[0];\n          const script = document.createElement('script');\n          script.setAttribute('type', 'text/javascript');\n          script.setAttribute('src', file);\n          htmlBody.appendChild(script);\n        };\n        injectScript(chrome.runtime.getURL('bundles/backend.bundle.js'), 'body');\n      "});break;case"tabReload":p[r].mode.locked=!1,p[r].mode.paused=!1,s||(b?(p[r].snapshots=p[r].initialSnapshot,p[r].hierarchy=p[r].initialHierarchy):(p[r].snapshots.splice(1),p[r].hierarchy?(p[r].hierarchy.children=[],p[r].currParent=1):p[r].currParent=0),p[r].currLocation=p[r].hierarchy,p[r].index=0,p[r].currBranch=0,u.forEach((function(e){return e.postMessage({action:"initialConnectSnapshots",payload:p})}))),l[r]=!0;break;case"recordSnap":var m=r;if(!h[r]){h[r]=!0,l[r]=!1,p[r].snapshots.push(e.payload),y(p[r],new f(e.payload,p[r])),u.length>0&&u.forEach((function(e){return e.postMessage({action:"initialConnectSnapshots",payload:p})}));break}l[r]?l[r]=!1:(p[r].snapshots.push(e.payload),//! INVOKING buildHierarchy FIGURE OUT WHAT TO PASS IN!!!!
y(p[r],new f(e.payload,p[r]))),u.length>0&&u.forEach((function(e){return e.postMessage({action:"sendSnapshots",payload:p,sourceTab:m})}))}return!0})),chrome.tabs.onRemoved.addListener((function(e){u.length>0&&u.forEach((function(t){return t.postMessage({action:"deleteTab",payload:e})})),delete p[e],delete l[e],delete h[e]})),chrome.tabs.onUpdated.addListener((function(e,t){t&&p[e]&&t.title&&t.title!==p[e].title&&(u.length>0&&u.forEach((function(t){return t.postMessage({action:"deleteTab",payload:e})})),delete p[e],delete l[e],delete h[e],p[e]=d(t.title))})),chrome.tabs.onActivated.addListener((function(e){u.length>0&&u.forEach((function(t){return t.postMessage({action:"changeTab",payload:e})}))})),chrome.runtime.onInstalled.addListener((function(){chrome.contextMenus.create({id:"reactime",title:"Reactime",contexts:["page","selection","image","link"]})})),chrome.contextMenus.onClicked.addListener((function(e){var t=e.menuItemId,n={type:"panel",left:0,top:0,width:380,height:window.screen.availHeight,url:chrome.runtime.getURL("panel.html")};"reactime"===t&&chrome.windows.create(n)}))}});