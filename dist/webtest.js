!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ConvertClient=t.StorageClient=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1);function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=t.StorageClient=function(){function e(t,n){a(this,e),this.url=t,n&&n.accessToken&&(this.accessToken=n.accessToken)}return r(e,[{key:"fetch",value:function(e,t){var n={"Content-Type":"application/json",Authorization:"Bearer "+this.accessToken};return t.headers=Object.assign({},t.headers,n),(0,o.fetchAdapter)(e,t)}},{key:"status",value:function(e){var t=this.url+"/file/"+e;return this.fetch(t)}},{key:"getResponseHeaders",value:function(e){var t=this.url+"/file/"+e+"/responseHeaders";return this.fetch(t)}},{key:"getMetadata",value:function(e){var t=this.url+"/file/"+e+"/metadata";return this.fetch(t)}},{key:"generatePresignedUpload",value:function(e){var t=this.url+"/file/upload/sign",n=JSON.stringify({requestHeaders:e.requestHeaders,requestParameters:e.requestParameters,storage:e.storage});return this.fetch(t,{method:"POST",body:n})}},{key:"upload",value:function(e){var t=this;return e=e||{},this.generatePresignedUpload(e).then(function(t){if("string"==typeof t&&(t=JSON.parse(t)),t.url){var n={headers:t.headers};return(0,o.uploadAdapter)(t.url,n,e.file).then(function(){return new Promise(function(e,n){e(t.uploadId)})})}}).then(function(n){var r=t.url+"/file/upload/commit",o=JSON.stringify({storage:e.storage,uploadId:n,contentType:e.contentType,accessControl:e.accessControl,responseHeaders:e.responseHeaders,metadata:e.metadata});return t.fetch(r,{method:"POST",body:o})})}},{key:"urlFor",value:function(e){var t=this.url+"/file/download/sign",n=JSON.stringify(e);return this.fetch(t,{method:"POST",body:n})}},{key:"delete",value:function(e){var t=this.url+"/file",n=JSON.stringify({fileId:e});return this.fetch(t,{method:"DELETE",body:n})}}]),e}(),s=t.ConvertClient=function(){function e(t,n,r){a(this,e),this.url=t,this.appId=n,r&&r.accessToken&&(this.accessToken=r.accessToken)}return r(e,[{key:"fetch",value:function(e,t){var n={"Content-Type":"application/json",Authorization:"Bearer "+this.accessToken,"x-appId":this.appId};return t.headers=Object.assign({},t.headers,n),(0,o.fetchAdapter)(e,t)}},{key:"enqueue",value:function(e){var t=this.url+"/convert",n=JSON.stringify(e);return this.fetch(t,{method:"POST",body:n})}},{key:"status",value:function(e,t,n){var r=this.url+"/convert?fileId="+e+"&kind="+t+"&name="+n;return this.fetch(r)}},{key:"estimatedTime",value:function(e,t,n){var r=this.url+"/convert/estimateTime?fileId="+e+"&kind="+t;return n&&(r+="&params="+encodeURIComponent(n)),this.fetch(r)}}]),e}();try{window&&!window.ufs&&(window.ufs={StorageClient:i,ConvertClient:s})}catch(e){}},function(e,t,n){"use strict";function r(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchAdapter=function(e,t){t=Object.assign({},t);try{if(weex)return new Promise(function(n,r){var o=weex.requireModule("stream");t.url=e,o.fetch(t,function(e){e.ok?("string"==typeof e.data&&(e.data=JSON.parse(e.data)),n(e.data,e.status,e.statusText)):r(e.status,e.statusText)})})}catch(n){return new Promise(function(n,o){var a=r(),i=t.method||"GET";if(a.open(i,e),t.headers)for(var s in t.headers)a.setRequestHeader(s,t.headers[s]);a.onreadystatechange=function(){if(4==a.readyState)if(200==a.status){var e=JSON.parse(a.response);n(e)}else o(new Error(a.response))},t.body?a.send(t.body):a.send()})}},t.uploadAdapter=function(e,t,n){t=Object.assign({},t);try{if(weex)return new Promise(function(r,o){var a=weex.requireModule("FileTransferModule");a.upload(n,e,{headers:t.headers,method:"PUT"},null,function(e){r()},function(e){o(e)})})}catch(o){return new Promise(function(o,a){var i=r(),s=t.method||"PUT";if(i.open(s,e,!0),t.headers)for(var u in t.headers)i.setRequestHeader(u,t.headers[u]);i.onreadystatechange=function(){4==i.readyState&&(200==i.status?o():a(new Error(i.response)))},i.send(n)})}}},function(e,t,n){"use strict";var r=n(0),o=function(e,t){if(!t){var n=document.getElementById("result").innerHTML;e=""===n?""+e:n+"</br>"+e}document.getElementById("result").innerHTML=e};window&&(window.ufsUploadTest=function(e){fetch("http://10.201.78.206/sso/oauth2/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=admin&password=cj123456&client_id=apigw&client_secret=apigw"}).then(function(e){return e.json()}).then(function(e){var t={url:"http://10.200.20.95:32105/api",accessToken:e.access_token};return o("AccessToken: "+e.access_token),new r.StorageClient(t.url,{accessToken:t.accessToken})}).catch(function(e){o(e)}).then(function(t){t&&t.upload({file:e}).then(function(e){return o("上传结果: "+JSON.stringify(e)),t.urlFor({fileId:e.id}).then(function(e){o("文件路径: "+e.url)})})})})}]);