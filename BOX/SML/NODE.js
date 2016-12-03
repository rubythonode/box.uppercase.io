global.SML=METHOD(function(){"use strict";var t=function(n,i,e){var r,o,u="",s="",c=0,a=function(n){var o,c,a=0,m="",d="",f=[];EACH(n,function(t){return"\t"===t&&void(a+=1)}),""!==n.trim()&&(a===i?(n=n.trim(),"#"!==n[0]&&(""!==s?(u+=">\n"+t(s,i+1,e),s="",REPEAT(i+e+1,function(){u+="\t"}),u+="</"+r+">\n",r=void 0):void 0!==r&&"'"!==r&&(u+="meta"===r||"link"===r||"br"===r?">\n":"script"===r?"></script>\n":" />\n"),REPEAT(i+e+1,function(){u+="\t"}),"'"===n[0]?(r="'",o=n):(r="",EACH(n,function(t,i){return" "===t||"\t"===t?(o=n.substring(i),!1):void("#"===t||"."===t?(""!==d&&(f.push(d),d=""),c=t):"#"===c?m+=t:"."===c?d+=t:r+=t)}),""!==d&&(f.push(d),d=""),u+="<"+r),f.length>0&&(o=" class='"+RUN(function(){var t="";return EACH(f,function(n,i){i>0&&(t+=" "),t+=n}),t})+"'"+(void 0===o?"":o)),""!==m&&(o=" id='"+m+"'"+(void 0===o?"":o)),void 0!==o&&RUN(function(){var t,n="",s="",c="",a=0;EACH(o,function(u,m){"'"===u&&"\\"!==o[m-1]?t===!0?(""===c.trim()?s+=RUN(function(){var t=o.substring(a+1,m),n="",r=i+1;return EACH(t,function(o,u){r!==-1&&("\t"===o?(r+=1,r===i+2&&(r=-1)):r=-1),r===-1&&("\r"===o||"\\"===o&&"'"===t[u+1]||("\n"===o?(""!==n&&""!==t.substring(u).trim()&&(n+="<br>"),n+="\n",REPEAT(r+e+2,function(){n+="\t"}),r=i+1):n+=o))}),n}):"meta"===r?(c=c.trim(),c=c.substring(0,c.length-1),n+=' name="'+c+'" content="'+o.substring(a+1,m)+'"'):n+=c+'"'+o.substring(a+1,m)+'"',c="",t=!1):t=!0:t!==!0&&(c+=u,a=m+1)}),t===!0&&SHOW_ERROR("[SML] 문자열 구문이 아직 끝나지 않았습니다.",o),""===s?u+=n:(u+="'"===r?s+"\n":n+">"+s+"</"+r+">\n",r=void 0)}))):s+=n+"\n")};return EACH(n,function(t,i){"'"===t&&"\\"!==n[i-1]?o=o!==!0:o!==!0&&"\n"===t&&(a(n.substring(c,i)),c=i+1)}),o===!0?SHOW_ERROR("[SML] 문자열 구문이 아직 끝나지 않았습니다.",n.substring(c)):a(n.substring(c)),""!==s?(u+=">\n"+t(s,i+1,e),REPEAT(i+e+1,function(){u+="\t"}),u+="</"+r+">\n",r=void 0):void 0!==r&&"'"!==r&&(u+="meta"===r||"link"===r||"br"===r?">\n":"script"===r?"></script>\n":" />\n"),u};return{run:function(n){var i,e,r=n.indexOf("body");return"\n"!==n[r+5]||0!==r&&"\n"!==n[r-1]?(i=t(n,0,1),e=""):(i=t(n.substring(0,r),0,1),e=t(n.substring(r),0,0)),'<!doctype html>\n<html>\n\t<head>\n\t\t<meta charset="UTF-8">\n'+i+"\t</head>\n"+e+"</html>"}}}),global.LOAD_SML=METHOD(function(t){var n={};return{run:function(t,i){var e=i.notExists,r=i.error,o=i.success;GET_FILE_INFO(t,{notExists:e,success:function(i){var u=n[t];void 0!==u&&(void 0!==i.lastUpdateTime&&u.lastUpdateTime.getTime()===i.lastUpdateTime.getTime()||void 0!==i.createTime&&u.lastUpdateTime.getTime()===i.createTime.getTime())?o(u.html):READ_FILE(t,{notExists:e,error:r,success:function(e){var r=SML(e.toString());n[t]={lastUpdateTime:void 0===i.lastUpdateTime?i.createTime:i.lastUpdateTime,html:r},o(r)}})}})}}}),global.SML_BRIDGE=METHOD(function(t){var n=require("path"),i=function(t,n){t({statusCode:500,content:'<!doctype html><html><head><meta charset="UTF-8"><title>'+n+"</title></head><body>Error</body></html>",contentType:"text/html"})},e=function(t){t({statusCode:404,content:'<!doctype html><html><head><meta charset="UTF-8"><title>Page not found.</title></head><body><p><b>Page not found.</b></p></body></html>',contentType:"text/html"})};return{run:function(t){var r=t.rootPath;return{notExistsHandler:function(t,n,i){e(i)},requestListener:function(t,o,u,s){var c,a,m=t.uri,d=function(){LOAD_SML(c,{notExists:function(){e(o)},error:function(t){i(o,t)},success:function(t){o({content:t,contentType:"text/html"})}})};return NEXT([function(t){""===m?CHECK_IS_FILE_EXISTS(r+"/index.sml",function(n){m=n===!0?"index.sml":"index.html",t()}):t()},function(){return function(){c=r+"/"+m,a=n.extname(m).toLowerCase(),".sml"===a?d():""===a?NEXT([function(t){CHECK_IS_FILE_EXISTS(c+".sml",function(n){n===!0?CHECK_IS_FOLDER(c+".sml",function(n){n===!0?t():(c+=".sml",d())}):t()})},function(){return function(){CHECK_IS_FILE_EXISTS(c,function(t){t===!0?CHECK_IS_FOLDER(c,function(t){t===!0?(c+="/index.sml",d()):s()}):s()})}}]):s()}}]),!1}}}}});