/*关于我们*/

$(function(){
    global.lazyload($('.container'));
    about.showImg();
    
});

var about = {};
about.showImg = function(){
    $('body').on('click','[data-big]',function(){
        var bigPathList =new Array(), bigPathTitle =new Array(), bigPathWidth =new Array(), bigPathHeight = new Array(), index = $(this).index();
        $(this).parent().find('[data-big]').each(function(){
            if($(this).attr('data-big')) {
                bigPathList.push($(this).attr('data-big'));
                bigPathWidth.push($(this).attr('data-width'));
                bigPathHeight.push($(this).attr('data-height'));
                if($(this).attr('data-title')){
                    bigPathTitle.push($(this).attr('data-title'));
                } else{
                    bigPathTitle.push('');
                }
            }
        });
        if(!bigPathList.length) return;
        var imgHtml = '<ul id="bigImgShow">';
        for (var len = 0; len < bigPathList.length; len++) {
            if(len==index)
                imgHtml+='<li class="big-show-li">';
            else
                imgHtml+='<li class="big-show-li hide">';
            imgHtml+='<img src="'+bigPathList[len]+'" alt="'+bigPathTitle[len]+'" width="'+bigPathWidth[len]+'" height="'+bigPathHeight[len]+'" class="block" /></li>';
        }
        imgHtml+='</ul><div class="dialogboxPrevWrap" title="上一张"><div class="dialogboxPrev">&lt;</div></div><div class="dialogboxNextWrap" title="下一张"><div class="dialogboxNext">&gt;</div></div>';
        $.dialogbox(imgHtml,'dialogbox-license','',bigPathTitle[$(this).index()]);
        var $title = $('.dialogboxTitle');
        if(bigPathList.length>1){
            $('.dialogboxPrevWrap').click(function(){
                var $show = $('#bigImgShow li').not(':hidden');
                $show.addClass('hide');
                if($show.prev('.big-show-li').length>0){
                    $show.prev('.big-show-li').removeClass('hide');
                    $title.html(bigPathTitle[$show.index()-1]);                 
                }
                else{
                    $show.siblings('.big-show-li:last').removeClass('hide');  
                    $title.html(bigPathTitle[bigPathTitle.length-1]);                    
                }
                $.dialogbox.position($('.dialogbox'));
            });
            $('.dialogboxNextWrap').click(function(){
                var $show = $('#bigImgShow li').not(':hidden');
                $show.addClass('hide');
                if($show.next('.big-show-li').length>0){
                    $show.next('.big-show-li').removeClass('hide');
                    $title.html(bigPathTitle[$show.index()+1]);
                }
                else{
                    $show.siblings('.big-show-li:first').removeClass('hide');
                    $title.html(bigPathTitle[0]);                   
                }
                $.dialogbox.position($('.dialogbox'));
            });
            $('body').unbind('keydown');
            $('body').on('keydown',function(event){
                if(event.preventDefault) event.preventDefault();
                switch(event.keyCode){
                case 37:
                    $(".dialogboxPrevWrap").trigger('click');
                    break;
                case 38:
                    $(".dialogboxPrevWrap").trigger('click');
                    break;
                case 39:
                    $(".dialogboxNextWrap").trigger('click');
                    break;
                case 40:
                    $(".dialogboxNextWrap").trigger('click');
                    break;
                }
            });
        }else{
            $('.dialogboxPrev,dialogboxNext').hide();
        }
    });
};


   