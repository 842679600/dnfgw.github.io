(function($){if(!qv.zero){qv.zero={}}$.extend(qv.zero,{version:"5.0.3",isIE:$.browser.msie,isIE6:$.browser.msie&&$.browser.version<7,getIndex:(function(){var zIndex=1000;return function(){return zIndex++}})(),extend:function(){var oc=Object.prototype.constructor;return function(superclass,overrides){var sb=overrides.constructor!=oc?overrides.constructor:function(){superclass.apply(this,arguments)},F=function(){},sbp,spp=superclass.prototype;F.prototype=spp;sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==oc){spp.constructor=superclass}this.override(sb,overrides);return sb}}(),override:function(oclass,overrides){if(!overrides){return}var p=oclass.prototype,method;for(method in overrides){p[method]=overrides[method]}if(this.isIE&&overrides.toString!=oclass.toString){p.toString=overrides.toString}}});if(typeof Function.prototype.zdelay==="undefined"){Function.prototype.zdelay=function(delay,params,scope){var me=this;if(!jQuery.isArray(params)){scope=params;params=[]}return !delay?this.apply(scope,params||[]):setTimeout(function(){me.apply(scope,params||[])},delay)}}qv.pkg("qv.zero.Debug",{level:["info","log","error","dir"],debug:function(){if(!qv.zero.URL.get("debug")||qv.zero.isIE){return}if(typeof console!=="undefined"){var args=$.makeArray(arguments),level=0;if(arguments.length>1){level=args.pop()}level==2&&(console.trace());console[this.level[level||0]].apply(console,args)}return true},info:function(){var args=$.makeArray(arguments);args.push(0);this.debug.apply(this,args)},error:function(){var args=$.makeArray(arguments);args.push(2);this.debug.apply(this,args)},log:function(){var args=$.makeArray(arguments);args.push(1);this.debug.apply(this,args)}});qv.pkg("qv.zero.APIs",{widgetsPath:"http://youxi.vip.qq.com/common/js/widgets/",bulletin:["http://imgcache.gtimg.cn/club/portal_new/bulletin.js","gbk"],ping:["http://pingjs.qq.com/tcss.ping.js"],pay:["http://youxi.vip.qq.com/common/js/v2/ams_pay.js"],newpay:["http://youxi.vip.qq.com/common/js/newPay_v2.js"],swfobject:["http://imgcache.gtimg.cn/ACT/vip_game/swfobject.js"],qweibo:["http://youxi.vip.qq.com/common/js/widgets/v4/qweibo.js"],miapi:["http://www.qq.com/mb/mat1/mb/js/mi.api.js"],gamelist:["http://imgcache.gtimg.cn/ACT/vip_act/act_data/game.json.js"],actlist:["http://vip.qq.com/my/subscribe/subscribeActList.js"],oz:["http://youxi.vip.qq.com/common/js/ams_oz_v2.js"],frendlist:["http://imgcache.gtimg.cn/club/portal_new/js/friend_selecter.js"],globaltail:["http://youxi.vip.qq.com/common/js/globalTail.js"],tvpplayer:["http://imgcache.gtimg.cn/clubact/common/tvp.player.js"],video:["http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2.js"]});qv.pkg("qv.zero.Msg",{version:2,dataStatus:false,bindDataSource:function(config,callback){var cfg={hasRetCode:true,hasBaseCode:true},jsonid;this.hasAID=config.hasAID;this.vipmonth=config.vipmonth;if(typeof config=="object"){$.extend(cfg,config);jsonid=cfg.userJsonID}else{jsonid=config}this.userJsonID=jsonid;if(!cfg.hasRetCode){return}if(cfg.hasBaseCode){qv.zero.Http.loadScript("http://imgcache.gtimg.cn/c/=/ACT/vip_act/act_data/ams.json.js,/ACT/vip_act/act_data/game.json.js")}var url="http://imgcache.gtimg.cn/ACT/vip_act/act_data/"+jsonid+".json.js";qv.zero.Http.loadScript(url);var bid="AMD_ams",uid="AMD_"+jsonid,st=window.setInterval($.proxy(function(){if(window[bid]&&window[uid]){clearInterval(st);this.baseMsg=window[bid];this.userMsg=window[uid].msg;this.dataStatus=true;callback()}},this),50)},getFormData:function(id){var form=window["AMD_"+this.userJsonID].form[id];return form?$.extend(true,{},form):null},getRetMsg:function(actid,code){var msg;msg=this.userMsg[actid]?this.userMsg[actid][code]:null;if(!msg){msg=this.userMsg["0"]?this.userMsg["0"][code]:null}if(!msg){msg=this.baseMsg[code]||this.baseMsg["10000"]}return msg?$.extend(true,{},msg):null},getLotMsg:function(actid,level){var lott=this.userMsg[actid].lott,msg=lott[level]||lott["10000"];if(!msg){qv.zero.Debug.error("lottery【%d】need cfg,level：%d,",actid,level);msg={msg:"很遗憾，您没中奖哦，继续加油吧！"}}return msg?$.extend(true,{},msg):null},repair:function(msg){var fn,me=this;return msg.replace(/[\r\n]/g,"").replace(/&quot;/g,'"').replace(/href=("|')(http:|javascript:)(.*?)(\1)/gi,function(_0,_1,_2,_3){return{"http:":'target="_blank" href='+_1+"http:"+_3+_1,"javascript:":'href="#" target="_self" onclick='+_1+decodeURIComponent(_3)+";return false;"+_1}[_2]})},show:function(msg){return this.dialog(msg,"success")},alert:function(msg){return this.dialog(msg,"alert")},confirm:function(msg,sureFn,cancleFn,scope,sureBtnText){zUtil.appendStyle("body .mod_pop_gd_v3 .mod_pop_wrap .mod_pop_gd_ft .cle__em_mod,body .mod_pop_gd_v3 .mod_pop_wrap .mod_pop_gd_ft .cle__em_mod span{background-color:#f3f3f3!important;background-image:none!important;color:#000!important;}");var cancleBtn={text:"取消",cls:"cle__em_mod",click:function(){box.hide();cancleFn&&cancleFn.call(scope)}};var box=this.dialog(msg,"alert",[{text:sureBtnText||"确定",click:function(){box.hide();sureFn&&sureFn.call(scope)}},cancleBtn]);return box},dialog:function(msg,type,btns){var me=this,box=+new Date+"box",dialog=new qv.zero.Dialog({title:"亲爱的用户"+qv.zero.Util.getQQNick(),content:msg,type:type||"",buttons:btns||[{text:"确定",click:function(){dialog.hide()}}]});dialog.show();return dialog}});var _M=qv.zero.Msg;qv.pkg("qv.zero.Http",{version:5,baseUrl:(function(){if(window.location.host==="youxitest.vip.qq.com"){return"http://iyouxitest.vip.qq.com/ams3.0.php"}else{return"http://iyouxi.vip.qq.com/ams3.0.php"}})(),counter:0,request:function(args,fn,type){var self=arguments,me=this,selfFn=function(exArgs){self.callee.call(me,$.extend(true,args,exArgs),fn,type)};qv.zero.Util.ensureLogin(function(){var postUrl=qv.zero.URL.appendParams(args,this.baseUrl+"?_c="+(args.ctrl||"page"));this.send(postUrl,function(ret){if(fn){fn.call(me,ret,ret.actid,selfFn)}else{me.showResponse(ret,ret.actid,selfFn)}},type||"jsonp",args.actid)},this);return this},send:function(url,fn,type,actid){var t1=new Date();var callback="json"+(+new Date())+this.counter++,jsonp=(type||"jsonp")==="jsonp",tk,args,me=this,self=arguments;try{tk=qq.security.getCSRFToken()}catch(e){}!this.page.pcfg&&(this.page.pcfg={});args={g_tk:tk,pvsrc:qv.zero.URL.get("pvsrc")||qv.zero.URL.get("adtag"),ozid:this.page.pcfg.rid,vipid:this.page.pcfg.oid};if(typeof url==="object"){args=$.extend(true,args,url);url=args.url||this.baseUrl;delete args.url}if(jsonp){if(args.callbackName){args[args.callbackName]=callback;delete args.callbackName}else{args.callback=callback}window[callback]=function(ret){(fn||$.noop)(ret);try{OZ&&ret.actid&&OZ.report({operID:ret.actid,retID:ret.ret,operType:ret.data.act.op||"",operDesc:ret.data.actname||"",itemID:((ret.op&&ret.op.diamonds)?ret.op.diamonds:"")})}catch(e){}me.page&&me.page.speed&&me.page.speed({4:new Date()-t1})}}url=qv.zero.URL.appendParams(args,url);return function(){qv.net.getScript(url,function(data,textStatus,jqXHR){jsonp?"":fn&&fn(data)},{plugins:{"qq.cgiSpeedReport":{reportParams:["_c"]}}})}.zdelay(Math.random()*50)},bindRetCode:function(cfg){this["act_"+this.getActid()]=cfg},cleanRetCode:function(){delete this["act_"+this.getActid()]},loadScript:function(url,callback,charset){if(typeof callback=="string"){charset=callback;callback=$.noop}var sc=document.createElement("script"),head=document.getElementsByTagName("head")[0];sc.setAttribute("charset",charset||"utf-8");sc.src=url;sc.onreadystatechange=sc.onload=function(){if(!sc.readyState||sc.readyState=="loaded"||sc.readyState=="complete"){callback&&callback();head.removeChild(sc)}};head.appendChild(sc)},loadCss:function(url){$("<link>").attr({type:"text/css",rel:"stylesheet",href:url}).appendTo("head")},showResponse:function(json,actid,fn){var code=Number(json.ret),me=this;var msgCfg=this.getMsgByState(json.data,actid,code,fn);if(msgCfg===false){return}if(typeof msgCfg==="string"){msgCfg={m:msgCfg}}var type=(code==0?"success":"alert"),l=msgCfg.l;return box=_M.dialog(zMsg.repair(msgCfg.m),type,[{text:msgCfg.b||"确定",click:function(){box.hide();if(l){if(/\$openvip(\d*)\$/.test(l)){_M.hasAID?AID.openWindow():PAY.showPay(RegExp.$1||_M.vipmonth)}else{if(/^http/.test(l)){window.open(l)}else{$.globalEval(l.replace(/&#39;/g,"'").replace(/&quot;/g,'"'))}}}}}])},getMsgByState:function(idata,actid,code,fn){var rcode="r_"+code;try{return this["act_"+actid][code].call(this,idata,actid,code,fn)}catch(e){return(this.v5CodeFnMap[rcode]||this.v5CodeFnMap.r_default).call(this,idata,actid,code,fn)}},v5CodeFnMap:{r_default:function(data,actid,code,fn){var msgCfg=_M.getRetMsg(actid,code);msgCfg.m=this.msgFormater.run(msgCfg.type)(data,msgCfg.m);return msgCfg},r_10002:function(data,actid,code,fn){qq.login.logout();qq.login.open($.proxy(function(){fn()},this));return false},r_10601:function(data,actid,code,fn){var msgCfg=_M.getRetMsg(actid,code);msgCfg.m=this.msgFormater.run(msgCfg.type,"r_")(data,msgCfg.m);return msgCfg},r_10603:function(data,actid,code,fn){var msgCfg=_M.getRetMsg(actid,code);msgCfg.m=this.msgFormater.run(msgCfg.type,"r_")(data,msgCfg.m);return msgCfg},r_0:function(data,actid,code,fn){var msgCfg;if($.inArray(data.act.op,["lottery_route_must","lottery_route","choose_mp_send","lottery_route_choose","lottery_choose_mp_send"])!=-1){var diamonds=data.op.diamonds;if(this["act_"+actid]&&this["act_"+actid]["lvl_"+diamonds]){msgCfg=this["act_"+actid]["lvl_"+diamonds].call(this,data,actid,diamonds,fn)}else{msgCfg=_M.getLotMsg(actid,diamonds)}}else{msgCfg=_M.getRetMsg(actid,code)}msgCfg.m=this.msgFormater.run(msgCfg.type)(data,msgCfg.m);return msgCfg},r_20123:function(data,actid,code,fn){var msgCfg={},data=data.rule.data;if(data.pay_err_code==="502205"){msgCfg={m:'对不起,您Q点帐户加Q币帐户余额都不足,请先<a href="http://pay.qq.com/paycenter/index.shtml" target="_blank">充值</a>！',b:"马上去充值",l:"http://pay.qq.com/paycenter/index.shtml"}}else{if(data.pay_err_info!==""){msgCfg.m=data.pay_err_info.replace(/(https?:\/\/[\w\.\/=?&]+)/gi,'<a href="$1" target="_blank">$1</a>')}else{msgCfg=_M.getRetMsg(actid,code)}}return msgCfg}},bindPage:function(page){this.page=page},msgFormater:{run:function(type,cate){var prefix=cate||"";return this[prefix+type]||this[prefix+"0"]},2410:function(data,msg){if(data.op.cdkey){var qqpwd=data.op.cdkey.split(",");msg=qv.string.format(msg,{qq:qqpwd[0],pwd:qqpwd[1]})}return msg},r_2410:function(data,msg){if(data.join.info){var qqpwd=data.join.info.split("|")[1].split(",");msg=qv.string.format(msg,{datetime:qv.date.format("Y-m-d H:i:s",data.join.time*1000),qq:qqpwd[0],pwd:qqpwd[1]})}return msg},r_0:function(data,msg){var cdkey=String(data.join.info).split("|"),game=AMD_game[data.game]||{};return qv.string.format(msg,{datetime:qv.date.format("Y-m-d H:i:s",data.join.time*1000),cdkey:cdkey[1],copy:"<a href=\"javascript:void(util.toClipBoard('"+cdkey[1]+"'));\" >复制</a>",name:data.actname||"",game:game.n||"",exchange:game.e||""})},0:function(data,msg){var kv=$.extend({name:data.actname||""},data.rule?data.rule.data:{},data.op),game=AMD_game[data.game]||{};kv.copy="<a href=\"javascript:void(util.toClipBoard('"+(data.op&&data.op.cdkey)+"'));\" >复制</a>";kv.game=game.n||"";kv.exchange=game.e||"";return qv.string.format(msg,kv)}}});qv.zero.Queue=function(){var queue={};this.Q=$(queue);this.id="q"+(+new Date());this.ret=[];var me=this;$.each(arguments,function(i,fn){fn&&me.pushAys(function(ret){fn(ret,me)},+new Date())})};qv.zero.Queue.prototype={push:function(e,name){var me=this;qv.zero.Debug.log("[queue:%s][%s] in queue",this.id,name);this.Q.queue(function(){var fireRet;if((fireRet=e(me.ret))!==false){me.deq("!@_#$",name)}else{qv.zero.Debug.log("[queue:%s][%s] stop queue",this.id,name)}});return this},pushAys:function(e,name){qv.zero.Debug.log("[queue:%s][%s] in queue",this.id,name);var me=this;this.Q.queue(function(){e(me.ret)});return this},deq:function(ret,name){ret!="!@_#$"&&(typeof ret)!="undefined"&&this.ret.push(ret);qv.zero.Debug.log("[queue:%s][%s] out queue",this.id,name);this.Q.dequeue()}};qv.zero.Queue.create=function(){return new qv.zero.Queue()};qv.pkg("qv.zero.URL",{unserialParams:function(paramstr){paramstr=paramstr||location.search.substring(1);var params=paramstr.split("&"),paramMap={},param;$.each(params,function(index,param){param=param.split(/=/);paramMap[param[0]]=(param[1]||"").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")});return paramMap},serialParams:function(params){return $.param(params)},get:function(name,url){if(!url&&!this.paramsMap){this.paramsMap=this.unserialParams()}else{if(url){var index=url.indexOf("?");return this.unserialParams(index!==-1?url.substr(index+1):url)[name]}}return name?this.paramsMap[name]:this.paramsMap},appendParams:function(params,url){if(!params){return url}url=url||location.href;params=this.serialParams(params);if(url.indexOf("?")!=-1){if(url.lastIndexOf("&")!=url.length-1){url+="&"}url+=params}else{url+="?"+params}return url}});qv.pkg("qv.zero.Util",{h:{";":"@#_@",",":"@#%@",":":"@%#@","=":"@_#@","?":"@_@#",">":"@#@_","&":"@@#_","|":"@@_#","^":"_#@@"},cache:{},wdcache:{},analyseParams:function(pstr){if(pstr){var parms=this.split(pstr,";"),ret={};$(parms).each($.proxy(function(index,parm){parm=this.split(parm,"=");ret[parm[0]]=parm[1]},this));return ret}},mkGroupPstr:function(cfgs){var pstr=[],tars=[],j=0,prm,id,gprms=[],gIndex=cfgs[0][2];$.each(cfgs,function(i,cfg){prm=[cfg[1]];zUtil.splitArgs(prm);id=prm[0][1].splice(gIndex,1)[0];gprms.push(id);tars.push({key:id,el:cfg[0]})});gprms=gprms.join("\\,");prm[0][1].splice(gIndex,0,gprms);return[tars,prm.join(",")]},analyseActFn:function(pstr){qv.zero.Debug.log("[dispatch expression]",pstr);if(this.cache[pstr]){qv.zero.Debug.info("[dispatch from cache] %s",pstr);return this.cache[pstr]}var hld=this.getHolder(pstr),acts=this.split(pstr,hld);if(hld=="?"){acts=[acts[0]].concat(this.split(acts[1],":"))}this.splitArgs(acts);return this[hld](pstr,acts)},"^":function(pstr,acts){return(this.cache[pstr]=$.proxy(function(src,host,group){this.fireFn(acts[0][0],[src,acts[0][1],group],host)},this))},"?":function(pstr,acts){return(this.cache[pstr]=$.proxy(function(src,host,group){return this.fireFn(acts[0][0],[src,acts[0][1],group],host)?this.fireFn(acts[1][0],[src,acts[1][1],group],host):this.fireFn(acts[2]&&acts[2][0],[src,acts[2]&&acts[2][1],group],host)},this))},"|":function(pstr,acts){var me=this;return(this.cache[pstr]=function(src,host,group){$.each(acts,function(i,act){me.fireFn(act[0],[src,act[1],group],host)})})},">":function(pstr,acts){return this["&"](pstr,acts,true)},"&":function(pstr,acts,def){var me=this;return(me.cache[pstr]=function(src,host,group){var q=qv.zero.Queue.create();$.each(acts,function(i,act){if(me.isAys(act[0])){function fn(qret){var deFn=function(ret){(def||ret.ret===0)&&q.deq(ret,act[0]+" "+act[1][0])};me.fireFn(act[0],[src,me.buildParams(act[1],qret,act[0],deFn,src),group],host)}q.pushAys(fn,act[0]+" "+act[1][0])}else{q.push(function(qret){var rs=me.fireFn(act[0],[src,[].concat(act[1],qret),group],host);rs!==false&&q.deq(rs,act[0]+" "+act[1])},act[0])}})})},isAys:function(name){return $.inArray(name,["send","request","vote","counter"])!==-1},autoResponse:function(name){return $.inArray(name,["request","vote"])!==-1},buildParams:function(params,qret,fnName,queueFn){var arr,me=this;return[params[0],function(ret,actid,fn){if(params[1]){me.evalFn(params[1])(ret,actid,fn,qret.concat(ret))}else{if(me.autoResponse(fnName)){qv.zero.Http.showResponse(ret,actid,fn)}}queueFn(ret)}]},getHolder:function(pstr){var holder="^";$.each(["?","|",">","&"],function(i,h){if(new RegExp("([^\\\\])\\"+h,"g").test(pstr)){holder=h;return false}});return holder},splitArgs:function(acts){var me=this;$.each(acts,function(index,act){var args=me.split(act,",");$.each(args,function(i,e){args[i]=$.isNumeric(e)?Number(e):e.replace(/\\(.)/g,"$1")});acts[index]=[args.shift(),args]});qv.zero.Debug.debug(acts,3)},split:function(str,c,map){$.extend(this.h,map);return str.replace(new RegExp("([^\\\\])\\"+c,"g"),"$1"+this.h[c]).split(this.h[c])},ensureLogin:function(fn,context){var me=this;if(!qq.login.getUin()){qq.login.open(function(){OZ&&OZ.report({operID:1,operType:"登录",operDesc:"登录访问页面"});fn.call(context||me)});return false}else{return fn.call(context||me)}},loginListener:function(loginFn,logoutFn,scope){loginFn&&qq.login.bind("login",$.proxy(loginFn,scope));logoutFn&&qq.login.bind("logout",$.proxy(logoutFn,scope))},getQQNick:function(){var nk="";if(!qq.login.getUin()){return""}nk=qv.cookie.get("_nick");if(!nk){try{nk=$.webStorage.local().getItem("nickname")||""}catch(e){}}return nk.replace(/</g,"&lt;").replace(/>/g,"&gt;")},appendStyle:function(css){var style=document.createElement("style");style.type="text/css";try{style.appendChild(document.createTextNode(css))}catch(E){style.styleSheet.cssText=css}var head=document.getElementsByTagName("head")[0];head.appendChild(style)},evalFn:function(fnName,scope){if(!fnName){return}if(typeof fnName==="function"){return fnName}var ns=scope||window,index=fnName.lastIndexOf(".");if(index!==-1){ns=eval(fnName.substr(0,index));fnName=fnName.substr(index+1)}scope=scope||ns||window;return function(){if(!ns[fnName]){qv.zero.Debug.error("the function %s is not defined",fnName)}return ns[fnName].apply(scope,arguments)}},fireFn:function(name,args,host){return name&&(!host[name]?this.evalFn(name):this.evalFn(name,host)).apply(this,args)},makeCallback:function(fn,params,scope){if(!$.isArray(params)){scope=params;params=[]}return function(){fn.apply(scope,params)}},isFunc:function(fnname){if(typeof fnname==="function"){return true}var a;try{eval("a = "+(fnname).toString()+";")}catch(e){return false}return typeof a==="function"},formatTpl:function(tpl,map){var reg=/<img[^>]+src=["']([^"']+)["'][^>]+(data-src=["']([^"']+)["'])[^><]*>/ig,reg2=/{([\w_.]+)#([\w_.]+(:?,[\w\d_]+)*)}/g;if(tpl.indexOf("data-src")!==-1){tpl=tpl.replace(reg,function(m,src,datasrc,holder){return m.replace(src,holder).replace(datasrc,"")})}return map?tpl.replace(reg2,function(m,$1,$2,$3){map[$1]=$2;return"{"+$1+"}"}):tpl},formatData:function(data,map,host){var me=this;if(!$.isEmptyObject(map)){var _m={},ed=data[0];$.each(map,function(k,v){if(!ed[k]){_m[k]=v}});$.each(data,function(i,edata){$.extend(edata,_m);$.each(edata,function(key,val){if(map[key]){var arg=[map[key]];zUtil.splitArgs(arg);edata[key]=me.fireFn(arg[0][0],[val,i,edata,arg[0][1]],host)}})})}return data},require:(function(){var http=qv.zero.Http,URL=qv.zero.URL,api=qv.zero.APIs,p="v4/";return function(modules,fncontext,config){var queue=new qv.zero.Queue(),me=this,tar,config=$.extend({base:api.widgetsPath},config),baseUrl=config.base+p,url;$.each([].concat(modules),function(i,m){if(config.id){try{tar=eval(config.id)}catch(e){}}else{try{tar=eval("qv.zero."+m)}catch(e){try{tar=eval(m)}catch(e){}}}if(!me.wdcache[m]&&!tar){queue.pushAys(function(){url=/^http:\/\//.test(m)?m:baseUrl+m+".js";http.loadScript(URL.appendParams({_v_:qv.zero.version,id:config.id||"x.x"},url),function(){me.wdcache[m]=true;queue.deq("js",m)},config.charset)},m)}else{qv.zero.Debug.log("[%s] has loaded",m);me.wdcache[m]=true}});typeof fncontext==="function"&&queue.push($.proxy(fncontext,config.scope),modules+"::callback")}})()});window.zDebug=qv.zero.Debug;window.zUtil=qv.zero.Util;window.zMsg=qv.zero.Msg;window.zURL=qv.zero.URL;window.zHttp=qv.zero.Http;window.zHandler;if(zURL.get("debug")){zDebug.info("enable debug mode")}var AbstractPage=function(){var timelist={},t1=new Date(),t2,t3;var me=this;this.readyState=false;this.readyFire=[];this.readyconditions=[];this.conditionCounter=0;this.APIs=qv.zero.APIs;this.beforeInit();zHttp.bindPage(this);$.each(this.readyconditions,function(index,cdt){cdt.call(me)});var pagetimer=setInterval(function(){if(me.conditionCounter<1){t2=new Date();clearInterval(pagetimer);me.readyState=1;me.init();zHandler.bindPage(me);me.dispatchElConfig();me.initEvent();$.each(me.readyFire,function(index,cdt){cdt.call(me,me)});me.readyState=2;t3=new Date();me.speed({1:t2-t1,2:t3-t2,3:t3-t1})}},20)};AbstractPage.prototype={newpay:true,domParamsName:"data-params",hasRetCode:true,vipmonth:1,loadExtHandler:false,speed:function(timelist,cfg){cfg=cfg||{};setTimeout(function(){var i=new Image();i.src="http://isdspeed.qq.com/cgi-bin/r.cgi?"+$.param($.extend(timelist,{flag1:cfg.flag1||169,flag2:cfg.flag2||2083,flag3:cfg.flag3||2}))},1000)},beforeInit:function(){var me=this;this.plLvl1=["PendantConfig"];this.addReadyCondition(function(){var h=["DispatchHandler","Mask","Dialog"];if(this.loadExtHandler){h.push("ExtDispatchHandler")}this.require(h,function(){this.popPageStatus()})});this.plLvl2=[];$.each(this.preloads||[],function(index,e){if($.isArray(e)){me.plLvl2=me.plLvl2.concat(e)}else{me.plLvl1.push(e)}});this.userJsonID&&this.addReadyCondition(function(){zMsg.bindDataSource({hasRetCode:this.hasRetCode,userJsonID:this.userJsonID,hasAID:!!this.aid,vipmonth:this.vipmonth},$.proxy(function(){zDebug.info("msg bind datasource finished!");this.popPageStatus()},this))});$.each(this.plLvl1,function(){me.addReadyCondition(function(){me.require(me.plLvl1.pop(),function(){me.popPageStatus()})})});if(this.reporthijack!==false){this.require("http://js.aq.qq.com/js/aq_common.js?max_age=8640000",function(){})}},popPageStatus:function(){var me=this;setTimeout(function(){me.conditionCounter--},20)},addReadyCondition:function(fn){this.readyconditions.push(fn);this.conditionCounter++},addReadyFire:function(fn){if(this.readyState){fn.call(this,this)}else{this.readyFire.push(fn)}},init:function(){window.zHandler=qv.zero.DispatchHandler;window.zGrpStore={};this.pcfg=window["AMD_"+this.userJsonID].cfg;if(this.aid){this.initAID()}else{if(this.pcfg.oid){this.loadPay(this.pcfg.oid)}}this.initOZ();this.initTCSS();this.loadBulletin.zdelay(200,this);this.loadGlobalTail.zdelay(500,this);this.fixedTitle();this.preload();this.require("http://youxi.vip.qq.com/common/js/expiredActGuide.js",function(){expiredActGuide(this)});zDebug.info("AbstractPage::init")},fixedTitle:function(){if(qv.zero.isIE){var title=document.title;setInterval(function(){document.title=title},1000)}},preload:function(){$.each(this.plLvl2,$.proxy(function(){this.require.zdelay(Math.random()*5000,[this.plLvl2],this)},this))},doDispatch:function(context){window.zGrpStore={};this.dispatchElConfig(context);this.bindConfigEvent(context)},dispatchElConfig:function(context){var doc=$(context||"body"),pn=this.domParamsName,atrpn="["+this.domParamsName+"]";this.dpEls=doc.filter(atrpn).add(doc.find(atrpn));this.dpEls.each(function(index,el){var params=zUtil.analyseParams($(el).attr(pn));$(el).removeAttr(pn);for(var name in params){$(el).attr("data-"+name,params[name])}})},bindConfigEvent:function(context){var doc=$(context||"body");doc.filter("[data-b4init]").add(doc.find("[data-b4init]")).each($.proxy(function(i,el){this.initHandler(el,"b4init")},this));(function(){doc.filter("[data-init]").add(doc.find("[data-init]")).each($.proxy(function(i,el){this.initHandler(el,"init")},this));this.initGroupHandler();doc.filter("[data-do],[data-oz]").add(doc.find("[data-do],[data-oz]")).bind("click",this.clickHandler)}).zdelay(100,this)},initEvent:function(){this.bindConfigEvent()},isAvailidClick:function(tar){if(this.limitClick!==false&&$(tar).data("click-buffer")&&(+new Date()-$(tar).data("click-buffer")<=3000)){zDebug.error("click in buffer time!");return false}return true},showlimitTip:function(tar){var p=$(tar).offset();var tip=$("#clb-tip");if(tip.size()==0){tip=$('<div id="clb-tip" class="mod_gst_pop" style="border:none;width:180px;height:34px;z-index:999"><div class="gst_popin clearfix" style="border:none;width:180px"><div class="gst_kind1" style="width:180px"><h4 class="gst_poptt"><b>亲，您点击太快啦~</b></h4></div></div></div>').appendTo("body")}tip.css({top:p.top+$(tar).height(),left:p.left}).show();clearTimeout(this.clbtip_st);this.clbtip_st=setTimeout(function(){tip.fadeOut()},2000)},hidelimitTip:function(){clearTimeout(this.clbtip_st);$("#clb-tip").hide()},clickHandler:function(evt){var todo=$(this).attr("data-do"),oz=$(this).attr("data-oz");if(!zHandler.page.isAvailidClick(this)){zHandler.page.showlimitTip(this);evt.preventDefault();return}zHandler.page.hidelimitTip();$(this).data("click-buffer",+new Date());if(oz&&OZ){oz=oz.split(",");OZ.report.zdelay(500,[{operType:oz[0],operDesc:oz[1]||""}],OZ)}if(todo){evt.preventDefault&&evt.preventDefault();zHandler.page.tryFire(todo,evt)}},asyclickHandler:function(evt,ret){var asydo=$(this).attr("data-asydo");if(!asydo||((ret!==0||ret===false)&&/^&/.test(asydo))){return}zHandler.page.tryFire(asydo.replace(/^[&>]/,""),evt)},tryFire:function(expr,tar){try{zUtil.analyseActFn(expr)(tar,zHandler)}catch(e){if(!(typeof e=="string"&&/zero#/.test(e))){throw e}}},initHandler:function(el,type){var toinit=$(el).attr("data-"+type);if(!toinit){return}if(type!=="b4init"&&/^(group_(?:\w)?(\d))#(.+)/.test(toinit)){if(!window.zGrpStore[RegExp.$1]){window.zGrpStore[RegExp.$1]=[]}window.zGrpStore[RegExp.$1].push([el,RegExp.$3,Number(RegExp.$2)-1]);$(el).attr("data-init",RegExp.$3)}else{toinit&&zHandler.page.tryFire(toinit,el)}},initGroupHandler:function(){$.each(window.zGrpStore,function(group,cfgs){var ret=zUtil.mkGroupPstr(cfgs);zUtil.analyseActFn(ret[1])([],zHandler,ret[0])})},fireConfig:function(el,type,ret){$(el).each($.proxy(function(index,el){switch(type){case"do":this.clickHandler.call(el,{target:el,currentTarget:el});break;case"init":this.initHandler.call(el,el,"init");break;case"asydo":this.asyclickHandler.call(el,{target:el,currentTarget:el,last_ret:ret},ret);break;default:this.clickHandler.call(el,{target:el,currentTarget:el});this.initHandler.call(el,el,"init");this.asyclickHandler.call(el,{target:el,currentTarget:el,last_ret:ret},ret)}},this))},firel:function(el,params){this.fireConfig($(params[0]),params[1])},initOZ:function(){this.require(this.APIs.oz,function(){OZ.config({actid:this.userJsonID,actName:this.pcfg.n});OZ.report({operID:1,operType:"访问",operDesc:"访问页面"})},{scope:this})},initTCSS:function(){this.require(this.APIs.ping,function(){typeof(pgvMain)=="function"&&pgvMain({senseParam:"pvsrc"})})},initAID:function(){var ar=this.aid.split(".");AID.config({sTeam:ar[1],sSite:ar[2],sPage:ar[3],sTag:ar[4],sPayPars:"cm=qdqb"});this.updateAidUrl();qq.login.bind("navrendered",this.updateAidUrl)},updateAidUrl:function(){$("div.mod_gst span.mod_st_btn a").attr("href",AID.getUrl())},setNavAid:function(){zDebug.info("page set nav aid");if(!this.payLoaded){return}$("div.mod_st span.mod_st_btn a,#menu_openclub_button a").attr({href:"javascript:void(0);",target:""}).click($.proxy(function(){PAY.showPay(this.vipmonth);return false},this))},pushOpenVipCallback:function(fn,scope){if(!this.payvipcallbacks){this.payvipcallbacks=[]}this.payvipcallbacks.push([fn,scope||this])},loadPay:function(mp){if(this.payLoaded){return true}var me=this;if(this.newpay){this.require(this.APIs.newpay,function(){PAY=newPay;PAY.init({actid:mp,aid:me.pcfg.aid||"vip.youxi.vipsite.newpay."+me.userJsonID,onSuccess:function(opt){$.each(me.payvipcallbacks||[],function(i,cbs){cbs[0].call(cbs[1])})}})})}else{$.getScript(this.APIs.pay,function(){var tm=+new Date();$('<div id="payDiv'+tm+'">').appendTo("body");PAY.init($e("#payDiv"+tm),mp)})}this.payLoaded=true;this.setNavAid();qq.login.bind("navrendered",$.proxy(function(){$("#g_top_open").unbind().click(function(event){PAY.showPay.apply(PAY,[me.vipmonth]);return false})},this));$("#g_top_open").unbind().click(function(event){PAY.showPay.apply(PAY,[me.vipmonth]);return false})},loadBulletin:function(){if($("div.bulletin").size()>0){$("div.bulletin").attr("id","container");zHttp.loadScript.apply(zHttp,this.APIs.bulletin)}},loadGlobalTail:function(){if($("#mod_global_tail").size()>0){zHttp.loadScript(this.APIs.globaltail)}},require:function(module,fncontext,config){zUtil.require(module,fncontext,$.extend({scope:this},config))}};if(!qv.zero){qv.zero={}}qv.zero.AbstractPage=AbstractPage})(jQuery);