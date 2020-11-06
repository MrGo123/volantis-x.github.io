var SearchService="";!function(e){SearchService=function(o){var t=this;t.config=e.extend({per_page:10,selectors:{body:"body",form:".u-search-form",input:".u-search-input",container:"#u-search",modal:"#u-search .modal",modal_body:"#u-search .modal-body",modal_footer:"#u-search .modal-footer",modal_overlay:"#u-search .modal-overlay",modal_results:"#u-search .modal-results",modal_metadata:"#u-search .modal-metadata",modal_error:"#u-search .modal-error",modal_loading_bar:"#u-search .modal-loading-bar",modal_ajax_content:"#u-search .modal-ajax-content",modal_logo:"#u-search .modal-footer .logo",btn_close:"#u-search .btn-close",btn_next:"#u-search .btn-next",btn_prev:"#u-search .btn-prev"},brands:{hexo:{logo:"",url:""},google:{logo:"google.svg",url:"https://cse.google.com"},algolia:{logo:"algolia.svg",url:"https://www.algolia.com"},baidu:{logo:"baidu.svg",url:"http://zn.baidu.com/cse/home/index"},azure:{logo:"azure.svg",url:"https://azure.microsoft.com/en-us/services/search/"}},imagePath:"https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/"},o),t.dom={},t.percentLoaded=0,t.open=!1,t.queryText="",t.nav={next:-1,prev:-1,total:0,current:1},t.parseSelectors=function(){for(var a in t.config.selectors)t.dom[a]=e(t.config.selectors[a])},t.beforeQuery=function(){t.open||t.dom.container.fadeIn(),t.dom.input.each((function(a,o){e(o).val(t.queryText)})),document.activeElement.blur(),t.dom.modal_error.hide(),t.dom.modal_ajax_content.removeClass("loaded"),t.startLoading()},t.afterQuery=function(){t.dom.modal_body.scrollTop(0),t.dom.modal_ajax_content.addClass("loaded"),t.stopLoading()},t.search=function(e,a){t.beforeQuery(),t.search instanceof Function?t.query(t.queryText,e,(function(){t.afterQuery()})):(console.log("query() does not exist."),t.onQueryError(t.queryText,""),t.afterQuery())},t.onQueryError=function(e,a){var o="";o="success"===a?'No result found for "'+e+'".':"timeout"===a?"Unfortunate timeout.":"Mysterious failure.",t.dom.modal_results.html(""),t.dom.modal_error.html(o),t.dom.modal_error.show()},t.nextPage=function(){-1!==t.nav.next&&t.search(t.nav.next)},t.prevPage=function(){-1!==t.nav.prev&&t.search(t.nav.prev)},t.getUrlRelativePath=function(e){var a=e.split("//"),o=a[1].indexOf("/"),t=a[1].substring(o);return-1!=t.indexOf("?")&&(t=t.split("?")[0]),t},t.buildResult=function(e,a,o){var n="";return n="<li>",n+="<a class='result' href='"+t.getUrlRelativePath(e)+"'>",n+="<span class='title'>"+a+"</span>",""!==o&&(n+="<span class='digest'>"+o+"</span>"),n+="</a>",n+="</li>"},t.close=function(){t.open=!1,t.dom.container.fadeOut(),t.dom.body.removeClass("modal-active")},t.onSubmit=function(a){a.preventDefault(),t.queryText=e(this).find(".u-search-input").val(),t.queryText&&t.search(1)},t.startLoading=function(){t.dom.modal_loading_bar.show(),t.loadingTimer=setInterval((function(){t.percentLoaded=Math.min(t.percentLoaded+5,95),t.dom.modal_loading_bar.css("width",t.percentLoaded+"%")}),100)},t.stopLoading=function(){clearInterval(t.loadingTimer),t.dom.modal_loading_bar.css("width","100%"),t.dom.modal_loading_bar.fadeOut(),setTimeout((function(){t.percentLoaded=0,t.dom.modal_loading_bar.css("width","0%")}),300)},t.addLogo=function(e){var a="";t.config.brands[e]&&t.config.brands[e].logo&&(a+="<a href='"+t.config.brands[e].url+"' class='"+e+"'>",a+='<img src="'+t.config.imagePath+t.config.brands[e].logo+'" />',a+="</a>",t.dom.modal_logo.html(a))},t.destroy=function(){t.dom.form.each((function(a,o){e(o).off("submit")})),t.dom.modal_overlay.off("click"),t.dom.btn_close.off("click"),t.dom.btn_next.off("click"),t.dom.btn_prev.off("click"),t.dom.container.remove()},t.init=function(){e("body").append(a),t.parseSelectors(),t.dom.modal_footer.show(),t.dom.form.each((function(a,o){e(o).on("submit",t.onSubmit)})),t.dom.modal_overlay.on("click",t.close),t.dom.btn_close.on("click",t.close),t.dom.btn_next.on("click",t.nextPage),t.dom.btn_prev.on("click",t.prevPage)},t.init()};var a='<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="fas fa-search"></span> </button></form> <a class="btn-close"> <span class="fas fa-times"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="fal fa-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="fal fa-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>'}(jQuery);var GoogleCustomSearch="";!function(e){"use strict";GoogleCustomSearch=function(a){SearchService.apply(this,arguments);var o=this,t="https://www.googleapis.com/customsearch/v1";return o.addLogo("google"),o.buildResultList=function(a){var t="";return e.each(a,(function(e,a){var n=a.link,r=a.title,s=(a.htmlSnippet||"").replace("<br>","");t+=o.buildResult(n,r,s)})),t+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},o.buildMetadata=function(e){e.queries&&e.queries.request&&"0"!==e.queries.request[0].totalResults?(o.nav.current=e.queries.request[0].startIndex,o.nav.currentCount=e.queries.request[0].count,o.nav.total=parseInt(e.queries.request[0].totalResults),o.dom.modal_metadata.children(".total").html(o.nav.total),o.dom.modal_metadata.children(".range").html(o.nav.current+"-"+(o.nav.current+o.nav.currentCount-1)),o.dom.modal_metadata.show()):o.dom.modal_metadata.hide(),e.queries&&e.queries.nextPage?(o.nav.next=e.queries.nextPage[0].startIndex,o.dom.btn_next.show()):(o.nav.next=-1,o.dom.btn_next.hide()),e.queries&&e.queries.previousPage?(o.nav.prev=e.queries.previousPage[0].startIndex,o.dom.btn_prev.show()):(o.nav.prev=-1,o.dom.btn_prev.hide())},o.query=function(a,n,r){e.get(t,{key:o.config.apiKey,cx:o.config.engineId,q:a,start:n,num:o.config.per_page},(function(e,t){if("success"===t&&e.items&&e.items.length>0){var n=o.buildResultList(e.items);o.dom.modal_results.html(n)}else o.onQueryError(a,t);o.buildMetadata(e),r&&r()}))},o}}(jQuery);