"use strict";!function(){var i=window.Bliss,r=window.Mavo;function a(n){return new Promise(function(t){setTimeout(t,n)})}r.Backend.register(i.Class({extends:r.Backend,id:"Offline",constructor:function(t,n){var e=this,a=t.split("offline?")[1],o=r.Backend.types.filter(function(t){return t.test(a)})[0]||r.Backend.Remote;this.backend=new o(a,n),this.permissions=this.backend.permissions,this.ready=this.backend.ready.then(function(){if(e.online=!1,e.loading=!1,e.storing=!1,e.offlineStatusElem=i(".offline-status",e.mavo.element),e.offlineStatusElem&&(!function(){var t=document.createElement("style");t.type="text/css";var n=document.createTextNode('\n      .offline-status {\n        font-size: 12px;\n        padding: 9px;\n        margin-left: auto;\n      }\n\n      .offline-status:after {\n        display: inline-block;\n        margin-left: 5px;\n        border: 3px solid #FC006B;\n        border-radius: 50%;\n        width: 8px;\n        height: 8px;\n        content: \'\';\n        padding: 1px;\n        vertical-align: top;\n      }\n\n      .offline-status[status="Up to date"]:after {\n        border-color: #6AC715;\n      }\n\n      .offline-status[status="Done"]:after {\n        border-color: #6AC715;\n      }\n\n      .offline-status[status="Loading"]:after, .offline-status[status="Storing"]:after {\n        border-color: #f3f3f3;\n        border-top-color: #13A0F2;\n        animation: spin 1s linear infinite;\n      }\n\n      @keyframes spin {\n        0% { transform: rotate(0deg); }\n        100% { transform: rotate(360deg); }\n      }\n    ');t.appendChild(n),document.getElementsByTagName("head")[0].appendChild(t)}(),e.updateStatus(),e.backend.onStatusChange&&e.backend.onStatusChange(function(t){e.online=t,e.updateStatus()})),e.backend.onNewData){var n=e.backend.onNewData.bind(e.backend);e.backend.onNewData=function(t){e.updateStorage(t),n(t)}}e.backend.setListenForChanges&&e.backend.setListenForChanges(!0),e.backend.upload&&(e.upload=e.backend.upload.bind(e.backend))})},load:function(){var n=this;this.ready=this.ready.then(function(){return n.loadTry()});var t=this.storageGet("data");return t?(this.ready.then(function(t){return n.isNewData(t)?(n.mavo.render(t),n.mavo.setUnsavedChanges(!1),void n.updateStorage(t)):n.storageGet("modified")?n.store(n.storageGet("data")):void 0}),Promise.resolve(t)):this.ready.then(function(t){return n.updateStorage(t),t})},loadTry:function(){var n=this;return this.loading=!0,this.updateStatus(),function n(){return this.backend.load().catch(function(t){return 0===t.status?a(5e3).then(function(){return n()}):Promise.reject(t)})}.call(this).then(function(t){return n.loading=!1,n.updateStatus(),t||{}})},isNewData:function(t){return!this.backend.compareDocRevs||1===this.backend.compareDocRevs(this.storageGet("data"),t)},updateStorage:function(t){this.storageSet("data",t),this.storageSet("modified",!1)},store:function(t){var n=this;return this.mavo.unsavedChanges&&(this.storageSet("data",t),this.storageSet("modified",!0),this.storeData=t,this.storing||(this.storing=!0,this.updateStatus(),this.ready=this.ready.then(function(){return n.storeTry()}).then(function(){n.storing=!1,n.updateStatus()}))),Promise.resolve()},storeTry:function(n){var e=this;return n=this.storeData||n,delete this.storeData,this.backend.store(n).catch(function(t){switch(t.status){case 0:return a(5e3).then(function(){return e.storeTry(n)})}return Promise.reject(t)}).then(function(){if(e.storeData)return e.storeTry()})},login:function(){return this.backend.login()},logout:function(){return this.backend.logout()},storageSet:function(t,n){try{window.localStorage["offline-".concat(this.mavo.id||"default","-").concat(t)]=JSON.stringify(n)}catch(t){}},storageGet:function(t){try{return JSON.parse(window.localStorage["offline-".concat(this.mavo.id||"default","-").concat(t)])}catch(t){}},updateStatus:function(){if(this.offlineStatusElem){var t=function(t){if(t.backend.onStatusChange){if(!t.online)return"Offline";if(!t.storing&&!t.loading)return"Up to date"}if(t.loading)return"Loading";if(t.storing)return"Storing";return"Done"}(this);this.offlineStatusElem.setAttribute("status",t),this.offlineStatusElem.textContent=t}},static:{test:function(t){return/offline/.test(t)}}}))}();