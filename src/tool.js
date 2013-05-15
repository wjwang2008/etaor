host = {
    taobao: "item.taobao.com",
    tmall: "detail.tmall.com"
};

tool = {
    getRebateUrl: function (src) {
        var d = document, e = encodeURIComponent,
            s1 = window.getSelection,
            s2 = d.getSelection,
            s3 = d.selection,
            s = s1 ? s1() : s2 ? s2() : s3 ? s3.createRange().text : '',
            r = 'http://ok.etao.com/item.htm?tb_lm_id=t_fangshan_wuzhao&url=' + e(src) + '&sel=' + e(s) + '&v=1&rebatepartner=188';
        return r;
    },
    isTargetPage: function (src) {
        for (var name in host) {
            if (src.indexOf(host[name]) > -1) {
                return true;
            }
        }
        return false;
    }
};
