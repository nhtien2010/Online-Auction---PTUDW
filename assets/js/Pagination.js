$( ".page" ).hide();
$('.page-item').eq(1).addClass('active').siblings().removeClass('active');
$( ".page" ).eq(0).show()
$('.page-item').click(function() {
    var index = $(this).index() - 1;
    if($(this).index() === 0) {
        if($('.active').index() > 1) {
            index = $('.active').index() - 1;
            $('.page-item').eq(index).addClass('active').siblings().removeClass('active');
            index--;
        }
        else
            return;
    }
    else if($(this).index() > $('.page').length) {
        if($('.active').index() < $('.page').length) {
            index = $('.active').index() + 1;
            $('.page-item').eq(index).addClass('active').siblings().removeClass('active');
            index--;
        }
        else
            return;
    }
    else
        $(this).addClass('active').siblings().removeClass('active');

    $( ".page" ).hide();
    $( ".page" ).eq(index).show()
  });