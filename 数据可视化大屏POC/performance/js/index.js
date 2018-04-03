/**
 * Created by Happily on 17/8/15.
 */
$(function () {

  document.getElementById('root');
  // 自适应屏幕缩放
  const baseWidth = 1920;
  const baseHeight = 1080;

  var body = document.querySelector('body');
  var root = document.querySelector('#root');
  var realtime = document.querySelector('.performance');

  function adaptiveScreen() {
    var per = body.clientWidth / baseWidth;
    root.style.width = body.clientWidth + 'px';
    root.style.height = baseHeight * per + 'px';
    root.style.overflow = 'hidden';
    realtime.style.transform = 'scale(' + per + ')';
    realtime.style.transformOrigin = 'left top';

  }

  let timeout = null;
  window.onresize = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      adaptiveScreen();
    }, 400);
  };
  adaptiveScreen();


  /**
   * Gets a window from an element
   */
  function getWindow(elem) {
    return jQuery.isWindow(elem) ?
      elem :
      elem.nodeType === 9 ?
      elem.defaultView || elem.parentWindow :
        false;
  }

  $.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ?
        this :
        this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
    }

    var docElem, win,
      box = {top: 0, left: 0},
      elem = this[0],
      doc = elem && elem.ownerDocument;

    if (!doc) {
      return;
    }

    docElem = doc.documentElement;

    // Make sure it's not a disconnected DOM node
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }

    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if (typeof elem.getBoundingClientRect !== "undefined") {
//      box = elem.getBoundingClientRect();

      box = {
        top: elem.offsetTop,
        left: elem.offsetLeft
      };

    }
    win = getWindow(doc);


    return {
      top: box.top + ( win.pageYOffset || docElem.scrollTop ) - ( docElem.clientTop || 0 ),
      left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
    };
  }

  $.fn.position = function () {
    if (!this[0]) {
      return;
    }

    var offsetParent, offset,
      parentOffset = {top: 0, left: 0},
      elem = this[0];

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
    // because it is its only offset parent
    if (jQuery.css(elem, "position") === "fixed") {

      // we assume that getBoundingClientRect is available when computed position is fixed
      offset = elem.getBoundingClientRect();
      offset.top = elem.offsetTop;
      offset.left = elem.offsetLeft;

    } else {

      // Get *real* offsetParent
      offsetParent = this.offsetParent();

      // Get correct offsets
      offset = this.offset();


      if (!jQuery.nodeName(offsetParent[0], "html")) {
        parentOffset = offsetParent.offset();
      }

      // Add offsetParent borders
      parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
      parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
    }

    // Subtract parent offsets and element margins
    // note: when an element has margin: auto the offsetLeft and marginLeft
    // are the same in Safari causing offset.left to incorrectly be 0

    return {
      top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
      left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
    };
  };

  //滚图table1
  $('.slider2').bxSlider({
//      slideWidth: 300,
    mode: 'vertical', //默认的是水平
    displaySlideQty: 1,//显示li的个数
    moveSlideQty: 1,//移动li的个数
    captions: false,//自动控制
    auto: true,
    controls: false,//隐藏左右按钮
    minSlides: 1,
    slideMargin: 2,
    pager: false,
//    autoHover: true,
  });


  //datetime
  function currentTime() {
    var date = new Date();
    var str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    $(".datetime").html(str);
  }
  var timer = setInterval(currentTime, 1000);

})
