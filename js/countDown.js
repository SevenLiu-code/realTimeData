(function($){
    $.fn.countDown = function(endCount){
        // var countDown_el = $(this).find('.countDown-item');
        var endCount = Math.round(endCount);
        var currentCount = '';
        var endCount_arr = endCount.toString().split('');
        if(!$(this).find('.digit').length) {
          for (var i=0; i<endCount_arr.length; i++) {
             $(this).append('<div class="digit"><div class="top"></div><div class="bottom"></div></div>');
          }
        } else {
          $(this).find('.digit .top').each(function(index, el){
             currentCount += $(el).html(); // 拿到已有的数值
          });
          currentCount = parseInt(currentCount); // 有值
        }
        $(this).doCountDown($(this).attr('id'), currentCount ? currentCount : endCount, endCount, 500);
    }
    $.fn.doCountDown = function (id, diffSecs, endCount, duration) {
    		$this = $('#' + id);
    		// if (diffSecs = endCount){ // 当前计数与结束计数相等，停止计数
    		// 	 diffSecs = endCount;
    		// 	if ($.data($this[0], 'timer')) {
    		// 		clearTimeout($.data($this[0], 'timer'));
    		// 	}
    		// }
  		  $this.dashChangeTo(id, diffSecs, duration ? duration : 800);

    		$.data($this[0], 'diffSecs', diffSecs);
    		if (diffSecs != endCount) { // 当前值大于结束值是执行计数
    			e = $this;
    			// t = setTimeout(function() { e.doCountDown(id, endCount, endCount, duration) } , 1000);
          e.doCountDown(id, endCount, endCount, duration);
    			//$.data(e[0], 'timer', t);
    		}
    	};
    $.fn.dashChangeTo = function(id, n, duration) {
      if( $this.find('.digit').length < n.toString().split('').length) { // 进位
        for(var i=0; i<=n.toString().split('').length - $this.find('.digit').length; i++){ // 判断要进几位
          $(this).append('<div class="digit"><div class="top"></div><div class="bottom"></div></div>');
          }
      }
  		  $this = $('#' + id);
  		  for (var i=($this.find('.digit').length-1); i>=0; i--){
  				var d = n%10; // 取余
  				n = (n - d) / 10; // 逐次减零
  				$this.digitChangeTo('#' + $this.attr('id') + ' .digit:eq('+i+')', d, duration);
  		  }
  	};
    $.fn.digitChangeTo = function (digit, n, duration) {
  		if (!duration){
  			duration = 800;
  		}
  		if ($(digit + ' div.top').html() != n + ''){
  			$(digit + ' div.top').css({'display': 'none'});
  			$(digit + ' div.top').html((n ? n : '0')).slideDown(duration);
  			$(digit + ' div.bottom').animate({'height': ''}, duration, function() {
  				$(digit + ' div.bottom').html($(digit + ' div.top').html());
  				$(digit + ' div.bottom').css({'display': 'block', 'height': ''});
  				$(digit + ' div.top').hide().slideUp(10);
  			});
  		}
      // if ($(digit + ' div.top').html() != n + ''){
  		// 	$(digit + ' div.top').css({'position': 'absolute',
      //     'top': '0', 'background-color':'#000'});
  		// 	$(digit + ' div.top').html((n ? n : '0')).animate({
      //       'top': '-100px',
      //   }, duration, function() {
  		// 		$(digit + ' div.bottom').html($(digit + ' div.top').html());
  		// 		$(digit + ' div.bottom').css({'display': 'block', 'height': ''});
  		// 		$(digit + ' div.top').css({'top': '0'});
  		// 	});
      //   $(digit + ' div.bottom').html($(digit + ' div.top').html());
  		// }
    };
})(jQuery)
