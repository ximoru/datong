/*全站*/

$(function(){
    global.init();
});

$(window).on('scroll',function(){
    var top = $(this).scrollTop(),
        half = $(this).height()/3;
    if(top > half)
        $('body').addClass('is-scrolled');
    else
        $('body').removeClass('is-scrolled');
    $('.cover-img').css({transform:'translate3d(0px, '+(top*.05)+'px, 0px)'});
    $('.cover-txt').css({transform:'translate3d(0px, -'+(top*.05)+'px, 0px)'});
});

var global = {};

global.init = function(){
    $('body').addClass('is-loaded');
    $('.loading-wait').remove();
};

/*获取URL参数*/
global.getParam = function(name,url){
    var reg=new RegExp("(^|&|\\?|#)"+name+"=([^&]*?)(&|#|$)"),
        url=url||location.href,
        tempHash=url.match(/#.*/)?url.match(/#.*/)[0]:"";

    url=url.replace(/#.*/,"");
    if(reg.test(tempHash)){
        return decodeURIComponent(tempHash.match(reg)[2]);
    }else if(reg.test(url)){
        return decodeURIComponent(url.match(reg)[2])
    }else return"";
};


/*图片延迟加载*/
global.lazyload = function(range){    
    if(typeof range != "object") range = $('body');
    function lazyload() {
        this.config = {'attrName': 'data-src','nodeName': 'img'};
        this.lazyloader = function() {
            var a = $('img['+this.config.attrName+']',range),
                len = a.length,
                node = null;
            if (len == 0) {
                $(window).off('scroll',$.proxy(this.lazyloader,this));
                $(window).off('resize',$.proxy(this.lazyloader,this));
                $(document).off('touchmove',$.proxy(this.lazyloader,this));
                return;
            }
            var height = $(document).scrollTop() + document.documentElement.clientHeight;
            for (var i = 0; i < len; ++i) {
                node = $(a[i]);
                var nodeTop = node.offset().top;
                if (height >= nodeTop) {
                    var src = node.attr(this.config.attrName);
                    node.attr({'src':src,'data-src':''});
                    node.removeAttr(this.config.attrName);
                }
            }
        };
        this.bindEvent = function() {
            $(window).on('scroll',$.proxy(this.lazyloader,this));
            $(window).on('resize',$.proxy(this.lazyloader,this)); 
            $(document).on('touchmove',$.proxy(this.lazyloader,this));
        }
    };

    var loader = new lazyload();
    loader.lazyloader();
    loader.bindEvent();
};