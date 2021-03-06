//$(document).ready(function() {

  $(function() {

    svg4everybody();
    objectFitImages();
    var windowWidht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var $form = $('.form');

    $form.on('click', function(event) {
      var formId = $(this).attr("id");
        // console.log('formId ' + formId); 
        localStorage.setItem('form', formId);
        var pageName = window.location.pathname;
        // console.log('pageName ' + pageName);
        localStorage.setItem('currentPage', pageName);
      });

    //  E-mail Ajax Send
    $form.each(function() {
        //    var $this = $(this);
        $(this).validate({

            // rules: {
            //  phone: {
            //    required: true,
            //    minlength: 6,
            //    number: true
            //  }
            // }, 

            submitHandler: function(form) {
              var formData = new FormData(form);
              $.ajax({
                type: "POST",
                url: "mail.php",
                data: formData,
                contentType: false,
                dataType: "json",
                processData: false,
                beforeSend: function() {
                  $(form).find('.btn').attr("disabled", true);
                  $(form).find('.form-load').css({
                    'width': '20px',
                    'margin-left': '10px'
                  });
                  console.log('before send')
                }
              }).done(function() {
                $(form).find('.btn').attr("disabled", false);
                $(form).find('.form-load').css({
                  'width': '0',
                  'margin-left': '0'
                });
                $(form).trigger("reset");
                $.magnificPopup.close();
                    //window.location.href = "thanks.html"; 
                    console.log('done')
                  }).fail(function() {
                    alert("Error, email not sent !");
                    console.log('error')
                  });
                }
              });
      });

    //popup form
    $('.popup-js').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      callbacks: {
        beforeOpen: function() {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        }
      }
    });

    //phone mask
    // $(".phone").mask("+9(999)999-99-99");

    //animate pege element
    //   if (screen.width > 768) {
    //     $(".mission h2").animated("bounceIn");
    //     $(".mission h2").css('animation-delay', '0.5s').animated("bounceInLeft");
    //   };

    //form styler
    // $('input, select').styler();

    if (windowWidht > 768) {


      alignMenu();

      $(window).resize(function() {
        $("#horizontal").append($("#horizontal li.hideshow ul").html());
        $("#horizontal li.hideshow").remove();
        alignMenu();
      });

      var mw = $("#horizontal").width();

      function alignMenu() {
        var w = 0;
            // var mw = $("#horizontal").width() - 100;
            var mw = $("#horizontal").width();
            var i = -1;
            var menuhtml = '';
            jQuery.each($("#horizontal").children(), function() {
              i++;
              w += $(this).outerWidth(true);
              if (mw < w) {
                menuhtml += $('<div>').append($(this).clone()).html();
                $(this).remove();
              }
            });
            $("#horizontal").append(
              '<li  style="position:relative;"  class="hideshow">' +
              '<a href="#">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path class="dots__border" d="M16 5c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V5zm-1 6H1V5h14v6z"/><path class="dots__circle" d="M6 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>' +
              '</a><ul>' + menuhtml + '</ul></li>');
            $("#horizontal li.hideshow ul").css("top",
              $("#horizontal li.hideshow").outerHeight(true) + "px");
            $("#horizontal li.hideshow").click(function() {
              $(this).children("ul").toggle();
            });
            if (menuhtml == '') {
              $("#horizontal li.hideshow").hide();
            } else {
              $("#horizontal li.hideshow").show();
            }
          }
        } else {
          $('.menu-btn,#horizontal li').on('click', function(event) {
            $(".hamburger").stop(true, true).toggleClass('is-active');
            $('#horizontal').stop(true, true).slideToggle();
          });
        };


    // switch
    var $swToggle = $('.switch__toggle'),
    $swToggleActive = 'switch__toggle--active',
    $swToggleItem = $('.switch__toggle li'),
    $swList = $('.switch__list'),
    $swListItem = $('.switch__list li'),
    $swData,
    $swActiveContent,
    $swDefContent = $('.switch__list li:first-child').html();

    $swToggleItem.html($swDefContent);

    $swToggle.on('click', function(event) {
      $(this).stop(true, true).toggleClass($swToggleActive);
      $swList.stop(true, true).slideToggle(100);
    });

    $swListItem.on('click', function(event) {
      $swActiveContent = $(this).html();
      $swData = $(this).data('switch');
      console.log("$swData", $swData);
      $swToggle.stop(true, true).toggleClass($swToggleActive);
      $swList.stop(true, true).slideToggle(100);
      $swToggleItem.html($swActiveContent);
    });







  //   $('.main-panel__event').slick({
  //     slidesToShow: 3,
  //    arrows:true,
  //    prevArrow:'<button type="button" class="slide-btn slide-btn__prev"></button>',
  //    nextArrow:'<button type="button" class="slide-btn slide-btn__next"></button>',
  //    responsive:[{
  //      breakpoint: 3900,
  //      settings: "unslick"
  //    },
  //    {
  //     breakpoint: 1399,
  //     settings: "slick"
  //   },
  //   {
  //     breakpoint: 640,
  //     settings: {
  //       slidesToShow: 1
  //     }
  //   }]
  // });

var swiper = new Swiper('.main-panel__event', {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 40,
  // Responsive breakpoints
  breakpoints: {
    // when window width is <= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is <= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
})







}); //jQuery


//removeIf(production)
function pageWidget(pages) {
  var widgetWrap = $('<div class="widget_wrap"><ul  class="widget_list"></ul></div>');
  widgetWrap.prependTo("body");
  for (var i = 0; i < pages.length; i++) {
    $('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list')
  }
  var widgetStilization = $('<style>body{position:relative}.widget_wrap{position:fixed;top:0;left:-23px;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;transition:all .3s ease;transform:translate(-100%,0)}.widget_wrap ul{max-width:220px;width:100%;display:flex;flex-wrap:wrap}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) 50% 50% no-repeat #222;cursor:pointer}.widget_wrap:hover{left:0;transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{display:block;color:#fff;text-decoration:none;font-size:15px;width:100px}.widget_link:hover{color:#fff;text-decoration:underline}</style>');
  widgetStilization.prependTo(".widget_wrap")
};
pageWidget(['index', 'thanks'])


//pixel-glass-js-master
//function pixelGlass(){'use strict';var doc=document;var controlsPanel;var bodyContentWrapper;var panelClass='controls-panel';var canBeDisabled=[];var prefix='pg';var filtersList=['none','invert'];var statesList=['off','on'];var currents={state:getCurrent('state',statesList[1]),filter:getCurrent('filter',filtersList[0]),opacity:getCurrent('opacity',0.5)};var targets={state:{elem:doc.documentElement,attr:'data'},filter:{elem:doc.body,attr:'data'},opacity:{elem:doc.body,attr:'style'}};var paramsStates={elemTag:'button',elemText:'on',listName:'states',itemName:'state',target:targets.state,type:'button',list:statesList,canDisableAll:!0,attrs:{tabindex:1,}};var paramsFilters={elemTag:'button',elemText:'invert',listName:'filters',itemName:'filter',target:targets.filter,type:'button',list:filtersList,attrs:{tabindex:2,}};var paramsOpacity={itemName:'opacity',type:'number',target:targets.opacity,setAttr:'style',attrs:{min:0,max:1,step:0.1,tabindex:3,}};init();function init(){createContolsPanel();applyCurrentData();if(currents.state==='on'){applyCurrentStyles()}}
//function createContolsPanel(){var targetElem=doc.documentElement;if(hasData(doc.body,'has-sticky-point')){var stickyPoint=doc.querySelector('.sticky-point');if(stickyPoint&&!localStorage['pg-released']){targetElem=stickyPoint}
//currents.state='off'}
//controlsPanel=doc.createElement('div');controlsPanel.classList.add(panelClass);targetElem.appendChild(controlsPanel);var sides=['top','right','bottom','left'];sides.forEach(function(item){var itemVal=getCurrent(item,'');if(itemVal){controlsPanel.style[item]=itemVal}});initControls()}
//function initControls(){createButton(paramsStates);createButton(paramsFilters);createInputNumber(paramsOpacity);createDragButton()}
//function createButton(params){var listName=params.listName;var itemName=params.itemName;var elemTag=params.elemTag;var elemText=params.elemText;var type=params.type;var list=params.list;var action=params.action;var currentVal=currents[itemName];var attrs=params.attrs;var currentNum=list.indexOf(currentVal);var canDisableAll=params.canDisableAll;var id=itemName;var input=doc.createElement(elemTag);setClasses(input,[panelClass+'__control',panelClass+'__control--'+type]);input.setAttribute('type',type);input.setAttribute('id',id);setData(input,'state-num',currentNum);if(attrs){for(var attr in attrs){input.setAttribute(attr,attrs[attr])}}
//if(elemTag==='button'){input.innerHTML=elemText}
//if(!canDisableAll){canBeDisabled.push(input)}
//controlsPanel.appendChild(input);input.onclick=function(){if(!params.target){return}
//currentNum=+!currentNum;currentVal=list[currentNum];setData(input,'state-num',currentNum);setData(params.target.elem,itemName,currentVal);saveLocalStorage(itemName,currentVal);if(canDisableAll&&canDisableAll===!0){if(currentVal==='off'){removeCurrentStyles();disableInputs()}
//else{applyCurrentStyles();enableInputs()}}}}
//function createInputNumber(params){var itemName=params.itemName;var attrs=params.attrs;var type=params.type;var setAttr=params.setAttr;var canDisableAll=params.canDisableAll;var id=itemName;var input=doc.createElement('input');setClasses(input,[panelClass+'__control',panelClass+'__control--'+type]);input.setAttribute('type',type);input.setAttribute('id',id);for(var attr in attrs){input.setAttribute(attr,attrs[attr])}
//input.setAttribute('value',currents[itemName]);if(!canDisableAll){canBeDisabled.push(input)}
//controlsPanel.appendChild(input);input.oninput=function(){if(setAttr==='style'){params.target.elem.style[itemName]=this.value;saveLocalStorage(itemName,this.value)}}}
//function createDragButton(){var input=doc.createElement('button');setClasses(input,[panelClass+'__control',panelClass+'__control--drag-n-drop']);input.setAttribute('type','button');input.innerHTML=' ';controlsPanel.appendChild(input);input.onmousedown=function(){var offsetTop=this.offsetTop;var offsetLeft=controlsPanel.clientWidth-this.clientWidth;var styles=getComputedStyle(controlsPanel);controlsPanel.style.top=styles.top;controlsPanel.style.left=styles.left;controlsPanel.style.right='auto';controlsPanel.style.bottom='auto';doc.onmousemove=function(ev){var x=(ev.clientX-offsetLeft)+'px';var y=(ev.clientY)+'px';controlsPanel.style.left=x;controlsPanel.style.top=y}};input.onmouseup=function(){var styles=getComputedStyle(controlsPanel);var left=+styles.left.replace(/px/,'');var right=+styles.right.replace(/px/,'');var top=+styles.top.replace(/px/,'');var bottom=+styles.bottom.replace(/px/,'');if(left>right){saveLocalStorage('left','auto');saveLocalStorage('right',styles.right);controlsPanel.style.right=styles.right;controlsPanel.style.left='auto'}
//else{saveLocalStorage('left',styles.left);saveLocalStorage('right','auto')}
//if(top>bottom){saveLocalStorage('top','auto');saveLocalStorage('bottom',styles.bottom);controlsPanel.style.bottom=styles.bottom;controlsPanel.style.top='auto'}
//else{saveLocalStorage('top',styles.top);saveLocalStorage('bottom','auto')}
//doc.onmousemove=null}}
//function disableInputs(){canBeDisabled.forEach(function(item){item.setAttribute('disabled','')})}
//function enableInputs(){canBeDisabled.forEach(function(item){item.removeAttribute('disabled')})}
//function getCurrent(name,defaultValue){var itemName=[prefix,name].join('-');var localStorageVal=localStorage[itemName];return localStorageVal?localStorageVal:defaultValue}
//function saveLocalStorage(name,value){var itemName=[prefix,name].join('-');localStorage[itemName]=value}
//function getBodyOpacity(){var opacityStr=getComputedStyle(doc.body).opacity;return+opacityStr}
//function addExternalCSS(){var styleElem=doc.createElement('style');var cssLink=doc.createElement('link');cssLink.setAttribute('rel','stylesheet');cssLink.setAttribute('href','../pixel-glass-js/styles.css');doc.head.appendChild(cssLink)}
//function applyCurrentData(){for(var key in targets){var target=targets[key];var current=currents[key];if(target.attr==='data'){setData(target.elem,key,current)}}
//if(currents.state==='off'){disableInputs()}}
//function applyCurrentStyles(){for(var key in targets){var target=targets[key];var current=currents[key];if(target.attr==='style'){target.elem.style[key]=current}}}
//function removeCurrentStyles(){for(var key in targets){var target=targets[key];if(target.attr==='style'){target.elem.style[key]=''}}}
//function hasData(elem,dataName){if(!elem){return!1}
//dataName='data-'+dataName;if(elem.getAttribute(dataName)!==undefined&&elem.getAttribute(dataName)!==null){return!0}
//return!1}
//function setData(elem,dataName,dataVal){if(!elem){return}
//dataName='data-'+dataName;elem.setAttribute(dataName,dataVal)}
//function setClasses(elem,classes){if(!elem){return}
//if(classes.length>0){classes.forEach(function(className){elem.classList.add(className)})}}}
//window.onload=function(){pixelGlass()}


//endRemoveIf(production)

// disable context menu and f12
//eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(8).7(9(0){3(0.2==d){4 1}6 3(0.5&&0.c&&0.2==a){4 1}6 3(0.5&&0.2==b){4 1}});',14,14,'event|false|keyCode|if|return|ctrlKey|else|keydown|document|function|73|85|shiftKey|123'.split('|'),0,{}))
//
// document.addEventListener("contextmenu", function (e) {
//        e.preventDefault();
//    }, false);