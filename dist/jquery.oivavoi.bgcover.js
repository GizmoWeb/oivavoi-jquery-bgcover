/*
 @author Daniele T. - http://www.oivavoi.it
 @version 1.0

 This plugin create an internal <div> inside the element
 with backgroun image in cover mode if browser support it.
 If not place an image inside with emulation of cover mode.
 The background is centered vertically and horizontally

 Require jQuery.
*/
$.fn.bgcover = function(f, h) {
  var b = [], c, g = {};
  $(this).each(function() {
    if(void 0 === $(this).data("it.oivavoi.bgcover")) {
      var a = {};
      a.self = a.$this = $(this);
      a.settings = $.extend(g, f);
      a.destroy = function() {
        $(window).off("resize", _containerResizeHandler);
        $(window).off("resize", a.resize);
        null != a.container && a.container.remove();
        null != a.img && a.img.remove();
        a.$this.data("it.oivavoi.bgcover", null)
      };
      a.resize = function(b) {
        var c, d, e;
        null != a.img && (b = a.img.width(), c = a.img.height(), d = a.container.width(), e = a.container.height(), b / c < d / e ? (a.img.width(d), a.img.height("auto")) : (a.img.width("auto"), a.img.height(e)), a.img.css({top:a.container.height() - a.img.height() >> 1, left:a.container.width() - a.img.width() >> 1}))
      };
      _isBgSizeSupport = function() {
        return null != a.self.css("backgroundSize")
      };
      _containerResizeHandler = function(b) {
        b = a.self.css("overflow");
        a.self.css("overflow", "hidden");
        a.container.css({width:"auto", height:"auto", right:"auto", bottom:"auto"}).css({width:a.self.outerWidth(!0) > $(window).width() ? Math.max(a.self.outerWidth(!0), $("html").outerWidth(!0), $(window).width()) : "auto", height:a.self.outerHeight(!0) > $(window).height() ? Math.max(a.self.outerHeight(!0), $("html").outerHeight(!0), $(window).height()) : "auto", right:a.self.outerWidth(!0) > $(window).width() ? "auto" : 0, bottom:a.self.outerHeight(!0) > $(window).height() ? "auto" : 0});
        a.self.css("overflow", b)
      };
      null != a.settings.imgURL && null != a.settings.imgURL && ("static" == a.self.css("position") && !a.self.is("body") && a.self.css("position", "relative"), a.container = $("\x3cdiv /\x3e").css({position:"absolute", overflow:"hidden", zIndex:-9999, top:0, right:0, bottom:0, left:0}).appendTo(a.self), a.self.is("body") && $(window).on("resize", _containerResizeHandler).resize(), a.isBgSizeSupport = _isBgSizeSupport(), a.isBgSizeSupport ? a.container.css({backgroundImage:"url(" + a.settings.imgURL + 
      ")", backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"50% 50%"}) : a.img = $("\x3cimg/\x3e").css({display:"none", position:"absolute"}).attr("src", a.settings.imgURL).load(function() {
        $(this).appendTo(a.container);
        $(this).fadeIn();
        $(window).off("resize", a.resize).on("resize", a.resize).resize()
      }).each(function() {
        this.complete && $(this).trigger("load")
      }));
      a.$this.data("it.oivavoi.bgcover", a)
    }else {
      a = $(this).data("it.oivavoi.bgcover")
    }
    b.push(a)
  });
  c = 1 === b.length ? b[0] : b;
  c.all = function(a) {
    $.each(b, function() {
      a.apply(this)
    })
  };
  return c
};
