!function(i,t,n){"use strict";var r={init:function(){for(var i in this.win=n(window),this.doc=n(t),this.body=n("body"),this)"function"==typeof this[i].init&&this[i].init()},carousel:{init:function(){n("#projects-list").slick({prevArrow:'<i class="prev far fa-chevron-left"></i>',nextArrow:'<i class="next far fa-chevron-right"></i>',centerPadding:"60px"})}}};i.app=r,n(i).ready(function(){r.init()})}(window,document,jQuery);