var RebateInfo = {
    coupon: "",
    saving: "",
    savingPrice: 0,
    redirect: ""
};

var page_taobao = {
    isLogin: false,
    loginUrl: "#",
    insertRebate: function (id) {
        var content = [];
        content.push("<div><div>预计可省：" + RebateInfo.savingPrice + " 元</div><div>送集分宝：" + RebateInfo.saving + "</div><div>优惠券：" + RebateInfo.coupon + "</div>");
        if (!this.isLogin) {
            content.push("<div><a class='ebutton big eblue' href='" + this.loginUrl + "' title='登录后重新点击此按钮'>使用一淘</a></div>");
        } else {
            content.push("<div><a class='ebutton big eblue' href='" + RebateInfo.redirect + "'>使用一淘</a></div>");
        }
        content.push("</div>");
        $(id).prepend(content.join(""));
    },
    init: function () {
        var login = $("#site-nav-bd .login-info").text();
        this.loginUrl = $("#site-nav-bd .login-info a:first").attr("href");
        this.isLogin = login.indexOf("请登录") == -1;
        this.insertRebate("#J_juValid");
    }
};

var page_tmall = {
    isLogin: false,
    loginUrl: "#",
    insertRebate: function (id) {
        var content = [];
        content.push("<div><div>预计可省：" + RebateInfo.savingPrice + " 元</div><div>送集分宝：" + RebateInfo.saving + "</div><div>优惠券：" + RebateInfo.coupon + "</div>");
        if (!this.isLogin) {
            content.push("<div><a class='ebutton big eblue' href='" + this.loginUrl + "' title='登录后重新点击此按钮'>使用一淘</a></div>");
        } else {
            content.push("<div><a class='ebutton big eblue' href='" + RebateInfo.redirect + "'>使用一淘</a></div>");
        }
        content.push("</div>");
        $(id).prepend(content.join(""));
    },
    init: function () {
        var login = $("#site-nav #login-info").text();
        this.loginUrl = $("#site-nav #login-info a:first").attr("href");
        this.isLogin = login.indexOf("请登录") == -1;
        this.insertRebate($("#J_LinkBuy").parent().parent());
    }
};

function parseInfo(html) {
    var re = /<dl id="J_discountList">[\s\S]*?<\/dl>/;
    var re2 = /<body[\s\S]*?>[\s\S]*?<\/body>/;
    var dd = $(html.match(re).toString()).find("dd");
    var body = $(html.match(re2).toString());
    var btn = body.find("#J_discountBuyBtn:first");
    RebateInfo.coupon = $(dd[0]).find("#J_quanList:first").text().replace(/\s+/, '');
    RebateInfo.coupon += $(dd[0]).find("#J_quanList:first").parent().next().text().replace(/\s+/, '');
    var prevRebateSaving = $(dd[1]).find("#J_prevRebateSaving:first").text();
    var rebateSaving = $(dd[1]).find("#J_rebateSaving:first").text();
    var rebateDesc = $(dd[1]).find("#J_rebateDesc:first").text();
    RebateInfo.saving = rebateSaving.length > 0 ? rebateSaving + rebateDesc : prevRebateSaving;
    RebateInfo.savingPrice = $(btn).find("#J_savingPrice:first").text();
    RebateInfo.redirect = $(btn).attr("href");
}

$.get(tool.getRebateUrl(location.href), function (data) {
    parseInfo(data);
    var curUrl = location.href;
    if (curUrl.indexOf(host.taobao) > -1) {
        page_taobao.init();
    } else if (curUrl.indexOf(host.tmall) > -1) {
        page_tmall.init();
    }
});

