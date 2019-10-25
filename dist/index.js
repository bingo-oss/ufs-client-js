!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.index=t():e.index=t()}(this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ConvertClient=t.StorageClient=void 0;var r=n(1);function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.StorageClient=function(e){function t(e,n){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n))}return a(t,e),t}(r.StorageBase),t.ConvertClient=function(e){function t(e,n,r){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r))}return a(t,e),t}(r.ConvertBase)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ConvertBase=t.StorageBase=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2);function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){return e&&!e.startsWith("http")&&t.baseUrl?e=function(){for(var e=[],t=!1,n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];r.length>0&&(t=r[0].startsWith("/"));var i=!0,a=!1,s=void 0;try{for(var u,c=r[Symbol.iterator]();!(i=(u=c.next()).done);i=!0){var f=u.value,l=f;f.endsWith("/")?l=f.substr(0,f.length-1):f.startsWith("/")&&(l=f.substr(1,f.length)),e.push(l)}}catch(e){a=!0,s=e}finally{try{!i&&c.return&&c.return()}finally{if(a)throw s}}var d=e.join("/");return t?"/"+d:d}(t.baseUrl,e):e}t.StorageBase=function(){function e(t,n){i(this,e),this.url=t,n&&(n.accessToken&&(this.accessToken=n.accessToken),n.appId&&(this.appId=n.appId))}return r(e,[{key:"fetch",value:function(e,t){var n={"Content-Type":"application/json"};return n.Authorization="Bearer "+this.accessToken,this.appId&&(n["x-ufs-appId"]=this.appId),t.headers=Object.assign({},t.headers,n),(0,o.fetchAdapter)(e,t)}},{key:"status",value:function(e){var t=this.url+"/file/"+e;return this.fetch(t)}},{key:"getResponseHeaders",value:function(e){var t=this.url+"/file/"+e+"/responseHeaders";return this.fetch(t)}},{key:"getMetadata",value:function(e){var t=this.url+"/file/"+e+"/metadata";return this.fetch(t)}},{key:"generatePresignedUpload",value:function(e){var t=this.url+"/file/upload/sign",n=JSON.stringify({requestHeaders:e.requestHeaders,requestParameters:e.requestParameters,storage:e.storage,filename:e.file.name||"",filesize:e.file.size||""});return this.fetch(t,{method:"POST",body:n})}},{key:"upload",value:function(e,t){var n=this;return e=e||{},(t=t||{}).headers=t.headers||{},this.generatePresignedUpload(e).then((function(n){if("string"==typeof n&&(n=JSON.parse(n)),n.url)return t.headers=Object.assign(t.headers,n.headers),!n.url.startsWith("http")&&t.baseUrl&&(n.url=a(n.url,t)),(0,o.uploadAdapter)(n.url,t,e.file).then((function(){return new Promise((function(e,t){e(n.uploadId)}))}))})).then((function(t){var r={"Content-Disposition":"inline; filename='"+e.file.metadata.filename+"'"},o=n.url+"/file/upload/commit",i=JSON.stringify({storage:e.commitStorage||e.storage,uploadId:t,contentType:e.contentType,accessControl:e.accessControl,responseHeaders:r,metadata:e.file.metadata});return n.fetch(o,{method:"POST",body:i})}))}},{key:"urlFor",value:function(e){var t=this.url+"/file/download/sign",n=JSON.stringify(e);return this.fetch(t,{method:"POST",body:n})}},{key:"delete",value:function(e){var t=this.url+"/file",n=JSON.stringify({fileId:e});return this.fetch(t,{method:"DELETE",body:n})}},{key:"preview",value:function(e,t){e=e||{},(t=t||{}).headers=t.headers||{};var n=e.url+"/preview/preview/oweb365/file?x-ufs-s="+e.xUfsS,r=JSON.stringify({fileId:e.fileId});return this.fetch(n,{method:"POST",body:r})}}]),e}(),t.ConvertBase=function(){function e(t,n,r){i(this,e),this.url=t,this.appId=n,r&&r.accessToken&&(this.accessToken=r.accessToken)}return r(e,[{key:"fetch",value:function(e,t){var n={"Content-Type":"application/json",Authorization:"Bearer "+this.accessToken,"x-appId":this.appId};return t.headers=Object.assign({},t.headers,n),(0,o.fetchAdapter)(e,t)}},{key:"enqueue",value:function(e){var t=this.url+"/convert",n=JSON.stringify(e);return this.fetch(t,{method:"POST",body:n})}},{key:"status",value:function(e,t,n){var r=this.url+"/convert?fileId="+e+"&kind="+t+"&name="+n;return this.fetch(r)}},{key:"estimatedTime",value:function(e,t,n){var r=this.url+"/convert/estimateTime?fileId="+e+"&kind="+t;return n&&(r+="&params="+encodeURIComponent(n)),this.fetch(r)}}]),e}()},function(e,t,n){"use strict";function r(){return XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}function o(e,t){e.upload&&t&&t.onProgress&&(e.upload.onprogress=function(e){e.total>0&&(e.percent=e.loaded/e.total*100),t.onProgress(e)})}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchAdapter=function(e,t){t=Object.assign({},t);try{if(weex)return new Promise((function(n,r){var o=weex.requireModule("stream");t.url=e,o.fetch(t,(function(e){e.ok?("string"==typeof e.data&&(e.data=JSON.parse(e.data)),n(e.data,e.status,e.statusText)):r(e.status,e.statusText)}))}))}catch(n){return new Promise((function(n,i){var a=r();o(a,t);var s=t.method||"GET";if(a.open(s,e),t.headers)for(var u in t.headers)a.setRequestHeader(u,t.headers[u]);a.onreadystatechange=function(){if(4==a.readyState)if(200==a.status){var e=JSON.parse(a.response);n(e)}else i(a)},t.body?a.send(t.body):a.send()}))}},t.uploadAdapter=function(e,t,n){t=Object.assign({},t);try{if(weex)return new Promise((function(r,o){weex.requireModule("FileTransferModule").upload(n,e,{headers:t.headers,method:"PUT"},null,(function(e){r()}),(function(e){o(e)}))}))}catch(i){return new Promise((function(i,a){var s=r();o(s,t);var u=t.method||"PUT";if(s.open(u,e,!0),t.headers)for(var c in t.headers)s.setRequestHeader(c,t.headers[c]);s.onreadystatechange=function(){4==s.readyState&&(200==s.status?i():a(s))},s.send(n)}))}}},function(e,t,n){"use strict";var r=n(0),o=function(e,t){if(!t){var n=document.getElementById("result").innerHTML;e=""===n?""+e:n+"</br>"+e}document.getElementById("result").innerHTML=e};window&&(window.ufsUploadTest=function(e){fetch("http://10.201.78.206/sso/oauth2/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=admin&password=cj123456&client_id=apigw&client_secret=apigw"}).then((function(e){return e.json()})).then((function(e){var t={url:"http://ufs-dev.bingosoft.net/api",accessToken:e.access_token};return o("AccessToken: "+e.access_token),new r.StorageClient(t.url,{accessToken:t.accessToken,version:"1.3.2"})})).catch((function(e){o(e)})).then((function(t){t&&t.upload({file:e}).then((function(n){return o("上传结果: "+JSON.stringify(n)),t.urlFor({fileId:n.id,responseHeaderOverrides:{"Content-Disposition":"attachment; filename="+e.name}}).then((function(e){o("文件路径: "+e.url)}))}))}))})}])}));