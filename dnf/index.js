//活动地址 不带任何参数
var _pageUrl = location.protocol + '//' + location.host + location.pathname;
//AMS新集成
zHttp.baseUrl = "http://iyouxi3.vip.qq.com/ams3.0.php";
var qb_guid = 0; // window.external.getGuid 有可能不返回数据
var getGuid = function () {
    try {
        var guid = window.external.getGuid();
        qb_guid = guid.split('-').join('');
    }catch(e){
        var web_page_extension_id = '{A3C609B3-3E61-4508-8953-117B7286068B}';
        var platform_extension_id = '{420DEFEE-20A8-468C-BFDA-61A09A99325D}';
        var extension;
        try {
            extension = window.getExtension(web_page_extension_id);
            extension.sendMessage(platform_extension_id, {serviceId: "hardware.getGuid", args: []}, function (data) {
                qb_guid = data[0].split('-').join('');
            });
        }catch(e){
            qb_guid = 0;
        }
    }
};
getGuid();
function hint(){
    var qb_dialog = new qv.zero.Dialog({
        title: "QQ浏览器用户专享",
        content: "<p>       亲，这是QQ浏览器用户的专属特权活动。</p><p>             用QQ浏览器打开即可参加。</p>",
        type: "alert",
        buttons: [{
            text: "下载QQ浏览器",
            click: function() {
                document.getElementById('downloadQBBtn').click();
                qb_dialog.hide();
            }
        }]
    });
    hint = function(){
        qb_dialog.show();
    };
    qb_dialog.show();
}

var reportDownloadQB = function () {
    var adtag = zURL.get('ADTAG');
    if(adtag) {
        api.report('BROWSER.ACTIVITY.DNF_170525.QBDOWNLOADCLICK_' + adtag);
    }
    api.report('BROWSER.ACTIVITY.DNF_170525.QBDOWNLOADCLICK');
};


//签到 设置按钮 显示天数
function setMoney(demo, m){
    var me = jQuery(demo);
    var meVal = parseInt(me.text());
    var k = 0;
    if(parseInt(m) < 0) {
        k = meVal + parseInt(m);
    } else if (m === '++') {
        k = meVal + 1;
    } else if (m === '--') {
        k = meVal - 1;
    } else if(!isNaN(m)) {
        if(m.toString().indexOf('-') >= 0 || m.toString().indexOf('+') >= 0) {
            k = meVal + parseInt(m);
        } else {
            k = m;
        }
    }
    if(k < 0){
        k = 0;
    }
    me.text(k);
}


/*分页*/
(function (window,$) {
    var me = {
        init:function(args){
            return (function(){
                args.pageCount = parseInt((args.dataContainer.length - 1) / args.perPage) + 1;
                me.fillHtml(args);
                me.bindEvent(args);
            })();
        },
        //填充html
        fillHtml:function(args){
            return (function(){
                args.liftsContainer.empty();
                args.pageContainer.empty();
                //第一页
                if(args.firstAndLast) {
                    if(args.current > 1){
                        args.pageContainer.append('<a href="javascript:;" class="firstPage">第一页</a>');
                    } else {
                        args.pageContainer.append('<span class="disabled">第一页</span>');
                    }
                }
                //上一页
                if(args.current > 1){
                    args.pageContainer.append('<a href="javascript:;" class="prevPage">上一页</a>');
                }else{
                    args.pageContainer.remove('.prevPage');
                    args.pageContainer.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                args.pageContainer.append('<span>第'+ args.current +'/'+ args.pageCount +'页</span>');
                //下一页
                if(args.current < args.pageCount){
                    args.pageContainer.append('<a href="javascript:;" class="nextPage">下一页</a>');
                }else{
                    args.pageContainer.remove('.nextPage');
                    args.pageContainer.append('<span class="disabled">下一页</span>');
                }
                //最后一页
                if(args.firstAndLast) {
                    if(args.current < args.pageCount){
                        args.pageContainer.append('<a href="javascript:;" class="lastPage">最后一页</a>');
                    } else {
                        args.pageContainer.append('<span class="disabled">最后一页</span>');
                    }
                }
                //列表
                var _star = (args.current - 1) * args.perPage,
                    _end = args.current * args.perPage;
                args.liftsContainer.append(args.dataContainer.slice(_star, _end).join(''));
                if(typeof(args.backFn)=="function"){
                    args.backFn({current: args.current});
                }
            })();
        },
        //绑定事件
        bindEvent:function(args){
            return (function(){
                //上一页
                args.pageContainer.on("click","a.prevPage",function(){
                    if(args.current > 1) {
                        args.current--;
                    }
                    me.fillHtml(args);
                });
                //下一页
                args.pageContainer.on("click","a.nextPage",function(){
                    if(args.current < args.pageCount) {
                        args.current++
                    }
                    me.fillHtml(args);
                });
                //第一页、最后一页
                if(args.firstAndLast) {
                    args.pageContainer.on("click","a.firstPage",function(){
                        args.current = 1;
                        me.fillHtml(args);
                    });
                    args.pageContainer.on("click","a.lastPage",function(){
                        args.current = args.pageCount;
                        me.fillHtml(args);
                    });
                }
            })();
        }
    };
    createPage = function (options) {
        var args = $.extend(
            {
                dataContainer: [],
                liftsContainer: $('#liftsContainer'),//列表容器
                pageContainer: $('#pageContainer'),//分页容器
                perPage : 10,//每页显示数
                pageCount : 0,//总页数
                current : 1,//当前页码
                startPage : 1,//初始页
                firstAndLast: false,//是否显示第一页、最后一页
                backFn : function(){}
            },
            options
        );
        me.init(args);
    }
})(window, jQuery);

(function (window,$) {
    Page = qv.zero.extend(qv.zero.AbstractPage,{
        userJsonID : 190585,
        preloads : ['AreaSvrSelector'],
        loadExtHandler  : true,
        //vipmonth : 1,
        init : function () {
            Page.superclass.init.apply(this,arguments);
        },
        initEvent : function () {
            Page.superclass.initEvent.apply(this,arguments);
            $('body').on('click','a[href="#"]',function (e) {
                e.preventDefault();
            });
            page.svr = new qv.zero.AreaSvrSelector({
                game: 'dnf'
            });
            if(!!qq.login.getUin()) {
                page.queryActidInfo();
                page.queryDays();
            }
            qq.login.bind('login', function () {
                page.queryActidInfo();
                page.queryDays();
            });
            qq.login.bind('logout', function () {
                setMoney('#day',0);
                setMoney('#chance',0);
                $('.moddle_4 .openBox').removeClass('disabled');
            });
        },
        //领取礼包
        exchange: function(e,act) {
            var actArr = [196358,196360,196366,196371],
                index = act[0],
                _actid = actArr[index];
            if(index == 1 || index == 2) {
                if(!api.isQQBrowser()){
                    hint();
                    return;
                }
            }else if(index == 3){
                if($('.getChance .fastGet').hasClass('disabled')){
                    return;
                }
            }
            zUtil.ensureLogin(function(){
                page.svr.show({
                    send: function (args, callb) {
                        zHttp.send({actid: _actid, area: args.area, roleid: args.roleid}, function (res) {
                            if (res.ret == 0) {
                                zHttp.showResponse(res, res.actid, $.noop);
                            } else if (res.ret == 10002) {
                                qq.login.open();
                            } else if (res.ret == 10001 || res.ret == 10004){
                                zMsg.alert("活动已经结束，敬请期待更多QQ浏览器特权活动！");
                            } else {
                                zHttp.showResponse(res, res.actid, $.noop);
                            }
                        })
                    }
                });
            });
            api.report('BROWSER.ACTIVITY.DNF_170525.EXCHANGE_' + index);
        },
        signin: function () {
            if(!api.isQQBrowser()){
                return;
            }
            zHttp.send({actid: 196362}, function (res) {
                if (res.ret == 0) {
                    setMoney('#day','++');
                }
            })
        },
        queryActidInfo: function () {
            zHttp.send({actid: 196379}, function (res) {
                if (res.ret == 0) {
                    if(res.data.op.join['196369'] > 0) {
                        $('.moddle_4 .openBox').addClass('disabled');
                        $('.box').addClass('open');
                    }
                }
            })
        },
        queryDays : function(){
            zUtil.ensureLogin(function () {
                zHttp.send({'actid': 196375}, function (res) {
                    if(res.ret==0){
                        var m = res.data.op;
                        setMoney('#day',m);
                        var t = res.data.rule.join_level;
                        if(t >= 6){
                            $('.getChance .fastGet').removeClass('disabled')
                        }
                        setMoney('#chance',t);
                    }
                    page.signin();
                });
            });
        },
        openBX: function (cb) {
            $('.box').addClass('open');
            setTimeout(function () {
                cb();
            }, 200)
        },
        getLucky: function(e,act){
            api.report('BROWSER.ACTIVITY.DNF_170525.GETLUCKYCLICK');
            if(!qb_guid) {
                getGuid();
            }
            if($('..moddle_4 .openBox').hasClass('disabled')) {
                return;
            }
            zUtil.ensureLogin(function(){
                page.svr.show({
                    send: function (args, callb) {
                        // 记录奖品时 必须加字段 _record_gift_flow : 1 ， 若记录末等奖时 再加字段(不记录则不加) _record_def_gift : 1
                        zHttp.send({actid: 196369, area: args.area, roleid: args.roleid,  guid: qb_guid}, function (res) {
                            if (res.ret == 0){
                                $('.moddle_4 .openBox').addClass('disabled');
                                setMoney('#chance','++');
                                page.openBX(function () {
                                    zHttp.showResponse(res, res.actid, $.noop);
                                });
                            } else if (res.ret == 10002) {
                                qq.login.open();
                            } else if (res.ret == 10001 || res.ret == 10004) {
                                zMsg.alert("活动已经结束，敬请期待更多QQ浏览器特权活动！");
                            } else {
                                zHttp.showResponse(res, res.actid, $.noop);
                            }
                        });
                    }
                });
            });
        },
        //查询中奖记录
        queryRecord: function () {
            zUtil.ensureLogin(function () {
                zHttp.send({actid: 196374}, function (res) {
                    if (res.ret == 0) {
                        var records = res.data.op;
                        var _htmlArr = [],
                            _html = '',
                            pageHtml = '',
                            PageCount = 0;
                        for (var i = records.length - 1; i >= 0; i--) {
                            var obj = records[i].val,
                                time = qv.date.format("Y-m-d H:i:s", obj.time * 1000),
                                name = obj.name,
                                level = obj.level,
                                cdkey = obj.info ? obj.info : '',
                                btn = '';
                            btn = '<a href="http://dnf.qq.com/gift.shtml" target="_blank">兑换</a>';
                            cdkey = obj.info;
                            _htmlArr.push('<tr><td>' + time + '</td><td>' + name + '</td><td>' + cdkey + '</td><td>' + btn + '</td></tr>');
                            PageCount++;
                        }
                        if (PageCount == 0) {
                            _htmlArr.push('<tr><td colspan="4" class="noGifts">您尚未获得任何礼包</td></tr>');
                        }
                        _html = '<table width="100%" class="giftsLists">\
                                    <thead><tr><th>获得时间</th><th>礼包内容</th><th>CDKEY</th><th>操作</th></tr></thead>\
                                    <tbody id="giftsContainer"></tbody>\
                                </table>\
                                <div id="pageContainer"></div>';
                        var giftsDialog = new qv.zero.Dialog({
                            width: 600,
                            title: "查询获奖记录",
                            content: _html,
                            type: "show",
                            buttons: [{
                                text: "确定",
                                click: function () {
                                    giftsDialog.hide();
                                }
                            }]
                        });
                        giftsDialog.show();
                        var _createPage = new createPage({
                            dataContainer: _htmlArr,//列表数据 Array类型
                            liftsContainer: $('#giftsContainer'),//列表容器
                            pageContainer: $('#pageContainer'),//分页容器
                            backFn: function (p) {
                                //解决dialog弹框自动居中，若未使用zMsg弹框，可删除
                                $(window).resize();
                            }
                        })
                    } else if (res.ret == 10002) {
                        qq.login.open();
                    } else if (res.ret == 10001 || res.ret == 10004) {
                        zMsg.alert("活动已经结束，敬请期待更多QQ浏览器特权活动！");
                    } else {
                        zHttp.showResponse(res, res.actid, $.noop);
                    }
                })
            });
            api.report("BROWSER.ACTIVITY.DNF_170525.QUERYRECORDCLICK");
        }
    });
    window.page = new Page();
})(window,jQuery);

(function (window, $) {
    //头尾初始化
    api.initNav("header","footer",{ //对应header footer div的id
        background:"#452163",  //footer的背景色，常常需要根据页面设计改变颜色 默认：黑色（可选）
        color:"#8c6ca8",  //footer中文字的颜色 默认：白色（可选）
        qblink:"javascript:document.getElementById('downloadQBBtn').click();", //下载QB按钮的链接 默认：特权中心QB包（可选）
        report:false, //点击流数据上报（可选）
        isTqHide:false //特权LOGO是否显示（可选）
    });
})(window, jQuery);


