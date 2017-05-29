//document.writeln('<div id="maskDiv" class="mask" style="position: fixed;display: none; left:0; top:0;width: 100%;height: 100%; z-index: 900; background: #DFE0E1 ;filter: alpha(opacity=50);opacity: 0.5"></div>');

function CMaskDiv(maskDiv){
//    this.oMaskDiv=false;
}
CMaskDiv.prototype.show=function(){
//	this.body=document.body || document.documentElement;
//    this.oMaskDiv=document.getElementById("maskDiv");
//    this.oMaskDiv.style.width=this.body.scrollWidth+"px";
//    this.oMaskDiv.style.height=this.body.scrollHeight+"px";
//    this.oMaskDiv.style.display="block"; 
}
CMaskDiv.prototype.close=function(){
 //   this.oMaskDiv.style.display="none"; 
}
//__MaskDiv__=new CMaskDiv('maskDiv');

document.domain="qq.com";
function ptlogin2_onResize(width, height)
{	
	var login_wnd = document.getElementById("__LoginDiiv__");
	if (login_wnd)
	{
		login_wnd.style.width = width + "px";
		login_wnd.style.height = height + "px";
		
		login_wnd.style.visibility = "hidden";
		login_wnd.style.visibility = "visible";
	}
}
function ptlogin2_onClose()
{
	document.getElementById("__LoginDiiv__").style.display="none";
	//__MaskDiv__.close();
	if (document.removeEventListener) {
        window.removeEventListener("scroll", LL_moveHandler, false);
        window.removeEventListener("resize", LL_moveHandler, false);
    }else if (document.detachEvent) {
        window.detachEvent('onscroll', LL_moveHandler);
        window.detachEvent('onresize', LL_moveHandler);
    }
}
if (!window.Cookie) 
{
    var Cookie = new Object();
}

Cookie.get = function(sName,sDefaultValue)
{
    var sRE = "(?:; |^)" + sName + "=([^;]*);?";
    var oRE = new RegExp(sRE);
    
    if (oRE.test(document.cookie)) {
        return unescape(RegExp["$1"]);
    } else {
        return sDefaultValue||null;
    }
}
Cookie.set = function(sName,sValue,iExpireSec,sDomain,sPath,bSecure)
{
    if(sName==undefined) {
        return;
    }
    if(sValue==undefined) {
        sValue="";
    }
    var oCookieArray = [sName+"="+escape(sValue)];
    if(!isNaN(iExpireSec)){
        var oDate = new Date();
        oDate.setTime(oDate.getTime()+iExpireSec*1000);
        oCookieArray.push("expires=" + oDate.toGMTString());
    }
	if(sDomain!=undefined){
		oCookieArray.push("domain="+sDomain);
	}
	if(sPath!=undefined){
	    oCookieArray.push("path="+sPath);
	}
	if(bSecure){
	    oCookieArray.push("secure");
	}
    document.cookie=oCookieArray.join("; ");
}

Cookie.clear = function(sName)
{
    var oDate = new Date();
    Cookie.set(sName,"", -oDate.getTime()/1000,"qq.com");
}

function GetCookieUin()
{
    if(Cookie.get("uin")==null)
        return "";
    else 
        return Cookie.get("uin");
}

function CheckLogin()
{
    if(GetCookieUin()=="")
    {
        UnloginCallback();
    }
    else
    {
        LoginedCallback();
    }
}
LL_CheckLogin=CheckLogin;

function LogoutPage()
{
    Cookie.clear("uin");
    Cookie.clear("skey");
    document.cookie = "uin=; path=/; domain=qq.com";
	document.cookie = "skey=; path=/; domain=qq.com";
    LL_CheckLogin();
    __MaskDiv__.show();
    if(!document.getElementById("__LogoutDiv__"))
    {
        var oDiv=document.createElement("div");
        oDiv.id="__LogoutDiv__";
        oDiv.style.height="0px";
        oDiv.style.width="150px";
		oDiv.style.backgroundColor="#FFFFCC";
        oDiv.style.border="0px";
        oDiv.style.padding="50px";
        oDiv.style.zIndex="999";
        oDiv.style.margin="0px";
        oDiv.style.position="absolute";
        oDiv.style.top="30%";
        oDiv.style.left="30%";
        oDiv.innerHTML="�װ����û������Ѿ�ע���ɹ���";
        document.body.appendChild(oDiv);
	}
    else
    {
        document.getElementById("__LogoutDiv__").style.display="block";
    }
    setTimeout(function(){document.getElementById("__LogoutDiv__").style.display="none";__MaskDiv__.close();},1500);
}
var __IED_APPID__={ "qqtang": 21000107,
                    "battle": 21000111,
                    "kaixuan": 21000112,
                    "qqgame": 21000110,
                    "fo": 21000106,
                    "pet": 21000109,
                    "sg": 21000103,
                    "r2": 21000105,
                    "tgame": 21000113,
                    "st": 21000114,
                    "xx": 21000104,
                    "xunxian": 21000104,
                    "game": 21000115,
                    "gcs": 21000108,
                    "pigpet": 21000117,
                    "fcm": 21000116,
                    "speed": 21000118,
                    "petbear": 21000101,
                    "nana": 21000119,
                    "cf": 21000124,
                    "gamesafe": 21000109,
                    "dnf": 21000127,
                    "ffo": 21000106,
                    "x5": 21000118,
                    "gamevip": 21000121,
                    "webgame": 21000118,
                    "ava":21000128,
                    "ied-gameinfo": 21000501};
function GetAppId()
{
    var n=location.host.split(".qq.com")[0].split(".");
    n=n[n.length-1];
    return __IED_APPID__[n] || __IED_APPID__[n.replace("test","")] || __IED_APPID__["dnf"];
}

var LL_moveHandler=null;
function OpenLoginDiiv(sStyle,bNotFreshTop)
{
	//__MaskDiv__.show();
    if(!document.getElementById("__LoginDiiv__"))
    {
        var oDiv=document.createElement("div");
        oDiv.id="__LoginDiiv__";
        oDiv.style.height="365px";
        oDiv.style.width="530px";
        oDiv.style.border="0px";
        oDiv.style.padding="0px"; 
        oDiv.style.margin="0px";
        oDiv.style.position="absolute";
        oDiv.style.zIndex="998";
        oDiv.style.top="20%";
        oDiv.style.left="30%";
        //oDiv.style.visibility = "hidden";
        var oIFrame=document.createElement("iframe");
        oIFrame.id="__LoginIframe__";
        oIFrame.frameborder="0";
        oIFrame.scrolling="no";
        oIFrame.width="100%";
        oIFrame.height="100%";
		oIFrame.frameBorder ="0";
        oDiv.appendChild(oIFrame);
        document.body.appendChild(oDiv);
	}
    else
    {
        document.getElementById("__LoginDiiv__").style.display="block";
    }
    if(!bNotFreshTop)
    {
		var sUrl=(sStyle+"&s_url="+escape(top.location.href)).split("s_url=")[1].split("&")[0];
		document.getElementById("__LoginIframe__").src="login.htm";
	}
	else
	{
	    var sUrl="login.htm";
	    document.getElementById("__LoginIframe__").src="login.htm";
	}
    
    if(!LL_moveHandler) LL_moveHandler=function(){__MaskDiv__.show();
        var oDiv=document.getElementById("__LoginDiiv__");
        var min_clientHeight=Math.min(document.documentElement.clientHeight,document.body.clientHeight);
        var min_clientWidth=Math.min(document.documentElement.clientWidth,document.body.clientWidth);
        if(min_clientHeight==0) min_clientHeight=document.documentElement.clientHeight+document.body.clientHeight;
        if(min_clientWidth==0) min_clientWidth=document.documentElement.clientWidth+document.body.clientWidth;
        var o_top=Math.floor((document.body.scrollTop+document.documentElement.scrollTop)+(min_clientHeight-parseInt(oDiv.style.height))*0.5);
        var o_left=Math.floor((document.body.scrollLeft+document.documentElement.scrollLeft)+(min_clientWidth-parseInt(oDiv.style.width))*0.5);
        oDiv.style.top=o_top;
        oDiv.style.left=o_left;
        if(oDiv.style.top!=o_top) oDiv.style.top=o_top+"px";
        if(oDiv.style.left!=o_left) oDiv.style.left=o_left+"px";};
    LL_moveHandler();
    if (document.addEventListener) {
        window.addEventListener("scroll", LL_moveHandler, false);
        window.addEventListener("resize", LL_moveHandler, false);
    }else if (document.attachEvent) {
        window.attachEvent('onscroll', LL_moveHandler);
        window.attachEvent('onresize', LL_moveHandler);
    }
}
function LoginedCallback()
{
    document.getElementById("unlogin").style.display="none";
    document.getElementById("logined").style.display="block";
}
function UnloginCallback()
{
    document.getElementById("logined").style.display="none";
    document.getElementById("unlogin").style.display="block";
}
// JavaScript Document