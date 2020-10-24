var AlgoliaSearch,AzureSearch,BaiduSearch,SearchService="";!function(e){SearchService=function(t){var o=this;o.config=e.extend({per_page:10,selectors:{body:"body",form:".u-search-form",input:".u-search-input",container:"#u-search",modal:"#u-search .modal",modal_body:"#u-search .modal-body",modal_footer:"#u-search .modal-footer",modal_overlay:"#u-search .modal-overlay",modal_results:"#u-search .modal-results",modal_metadata:"#u-search .modal-metadata",modal_error:"#u-search .modal-error",modal_loading_bar:"#u-search .modal-loading-bar",modal_ajax_content:"#u-search .modal-ajax-content",modal_logo:"#u-search .modal-footer .logo",btn_close:"#u-search .btn-close",btn_next:"#u-search .btn-next",btn_prev:"#u-search .btn-prev"},brands:{hexo:{logo:"",url:""},google:{logo:"google.svg",url:"https://cse.google.com"},algolia:{logo:"algolia.svg",url:"https://www.algolia.com"},baidu:{logo:"baidu.svg",url:"http://zn.baidu.com/cse/home/index"},azure:{logo:"azure.svg",url:"https://azure.microsoft.com/en-us/services/search/"}},imagePath:"https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/"},t),o.dom={},o.percentLoaded=0,o.open=!1,o.queryText="",o.nav={next:-1,prev:-1,total:0,current:1},o.parseSelectors=function(){for(var a in o.config.selectors)o.dom[a]=e(o.config.selectors[a])},o.beforeQuery=function(){o.open||o.dom.container.fadeIn(),o.dom.input.each((function(a,t){e(t).val(o.queryText)})),document.activeElement.blur(),o.dom.modal_error.hide(),o.dom.modal_ajax_content.removeClass("loaded"),o.startLoading()},o.afterQuery=function(){o.dom.modal_body.scrollTop(0),o.dom.modal_ajax_content.addClass("loaded"),o.stopLoading()},o.search=function(e,a){o.beforeQuery(),o.search instanceof Function?o.query(o.queryText,e,(function(){o.afterQuery()})):(console.log("query() does not exist."),o.onQueryError(o.queryText,""),o.afterQuery())},o.onQueryError=function(e,a){var t="";t="success"===a?'No result found for "'+e+'".':"timeout"===a?"Unfortunate timeout.":"Mysterious failure.",o.dom.modal_results.html(""),o.dom.modal_error.html(t),o.dom.modal_error.show()},o.nextPage=function(){-1!==o.nav.next&&o.search(o.nav.next)},o.prevPage=function(){-1!==o.nav.prev&&o.search(o.nav.prev)},o.getUrlRelativePath=function(e){var a=e.split("//"),t=a[1].indexOf("/"),o=a[1].substring(t);return-1!=o.indexOf("?")&&(o=o.split("?")[0]),o},o.buildResult=function(e,a,t){var n="";return n="<li>",n+="<a class='result' href='"+o.getUrlRelativePath(e)+"'>",n+="<span class='title'>"+a+"</span>",""!==t&&(n+="<span class='digest'>"+t+"</span>"),n+="</a>",n+="</li>"},o.close=function(){o.open=!1,o.dom.container.fadeOut(),o.dom.body.removeClass("modal-active")},o.onSubmit=function(a){a.preventDefault(),o.queryText=e(this).find(".u-search-input").val(),o.queryText&&o.search(1)},o.startLoading=function(){o.dom.modal_loading_bar.show(),o.loadingTimer=setInterval((function(){o.percentLoaded=Math.min(o.percentLoaded+5,95),o.dom.modal_loading_bar.css("width",o.percentLoaded+"%")}),100)},o.stopLoading=function(){clearInterval(o.loadingTimer),o.dom.modal_loading_bar.css("width","100%"),o.dom.modal_loading_bar.fadeOut(),setTimeout((function(){o.percentLoaded=0,o.dom.modal_loading_bar.css("width","0%")}),300)},o.addLogo=function(e){var a="";o.config.brands[e]&&o.config.brands[e].logo&&(a+="<a href='"+o.config.brands[e].url+"' class='"+e+"'>",a+='<img src="'+o.config.imagePath+o.config.brands[e].logo+'" />',a+="</a>",o.dom.modal_logo.html(a))},o.destroy=function(){o.dom.form.each((function(a,t){e(t).off("submit")})),o.dom.modal_overlay.off("click"),o.dom.btn_close.off("click"),o.dom.btn_next.off("click"),o.dom.btn_prev.off("click"),o.dom.container.remove()},o.init=function(){e("body").append(a),o.parseSelectors(),o.dom.modal_footer.show(),o.dom.form.each((function(a,t){e(t).on("submit",o.onSubmit)})),o.dom.modal_overlay.on("click",o.close),o.dom.btn_close.on("click",o.close),o.dom.btn_next.on("click",o.nextPage),o.dom.btn_prev.on("click",o.prevPage)},o.init()};var a='<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="fas fa-search"></span> </button></form> <a class="btn-close"> <span class="fas fa-times"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="fal fa-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="fal fa-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>'}(jQuery),function(e){"use strict";AlgoliaSearch=function(a){SearchService.apply(this,arguments);var t=this,o="https://"+t.config.appId+"-dsn.algolia.net/1/indexes/"+t.config.indexName;return t.addLogo("algolia"),t.buildResultList=function(a){var o="";return e.each(a,(function(e,a){var n=a.permalink||a.path||"";!a.permalink&&a.path&&(n=ROOT+n);var r=a.title;o+=t.buildResult(n,r,"",e+1)})),o+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},t.buildMetadata=function(e){t.nav.current=e.page*e.hitsPerPage+1,t.nav.currentCount=e.hits.length,t.nav.total=parseInt(e.nbHits),t.dom.modal_metadata.children(".total").html(t.nav.total),t.dom.modal_metadata.children(".range").html(t.nav.current+"-"+(t.nav.current+t.nav.currentCount-1)),t.nav.total>0?t.dom.modal_metadata.show():t.dom.modal_metadata.hide(),e.page<e.nbPages-1?(t.nav.next=e.page+1+1,t.dom.btn_next.show()):(t.nav.next=-1,t.dom.btn_next.hide()),e.page>0?(t.nav.prev=e.page+1-1,t.dom.btn_prev.show()):(t.nav.prev=-1,t.dom.btn_prev.hide())},t.query=function(a,n,r){e.get(o,{query:a,page:n-1,hitsPerPage:t.config.per_page,"x-algolia-application-id":t.config.appId,"x-algolia-api-key":t.config.apiKey},(function(e,o){if("success"===o&&e.hits&&e.hits.length>0){var n=t.buildResultList(e.hits);t.dom.modal_results.html(n)}else t.onQueryError(a,o);t.buildMetadata(e),r&&r(e)}))},t}}(jQuery),function(e){"use strict";AzureSearch=function(a){SearchService.apply(this,arguments);var t=this,o="https://"+t.config.serviceName+".search.windows.net/indexes/"+t.config.indexName+"/docs?api-version=2015-02-28";return t.nav.current=1,t.addLogo("azure"),t.buildResultList=function(a){var o="";return e.each(a,(function(e,a){var n=a.permalink||a.path||"";!a.permalink&&a.path&&(n="/"+n);var r=a.title,s=a.excerpt||"";o+=t.buildResult(n,r,s)})),o+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},t.buildMetadata=function(e,a){t.nav.current=a,t.nav.currentCount=e.value.length,t.nav.total=parseInt(e["@odata.count"]),t.dom.modal_metadata.children(".total").html(t.nav.total),t.dom.modal_metadata.children(".range").html(t.nav.current+"-"+(t.nav.current+t.nav.currentCount-1)),t.nav.total>0?t.dom.modal_metadata.show():t.dom.modal_metadata.hide(),t.nav.current+t.nav.currentCount<=t.nav.total?(t.nav.next=t.nav.current+t.nav.currentCount,t.dom.btn_next.show()):(t.nav.next=-1,t.dom.btn_next.hide()),t.nav.current>1?(t.nav.prev=t.nav.current-t.config.per_page,t.dom.btn_prev.show()):(t.nav.prev=-1,t.dom.btn_prev.hide())},t.query=function(a,n,r){e.ajax({url:o,headers:{Accept:"application/json","api-key":t.config.queryKey},data:{search:a,$orderby:"date desc",$skip:n-1,$top:t.config.per_page,$count:!0},type:"GET",success:function(e,o){if("success"===o&&e.value&&e.value.length>0){var s=t.buildResultList(e.value);t.dom.modal_results.html(s)}else t.onQueryError(a,o);t.buildMetadata(e,n),r&&r(e)}})},t}}(jQuery),function(e){"use strict";BaiduSearch=function(a){SearchService.apply(this,arguments);var t=this;return t.addLogo("baidu"),t.buildResultList=function(a,o){var n="";return e.each(a,(function(e,a){t.contentSearch(a,o)&&(n+=t.buildResult(a.linkUrl,a.title,a.abstract))})),n+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},t.buildMetadata=function(e){},t.loadScript=function(){t.dom.input.each((function(a,t){e(t).attr("disabled",!0)}));var a="<script src='http://zhannei.baidu.com/api/customsearch/apiaccept?sid="+t.config.apiId+"&v=2.0&callback=customSearch.initBaidu' type='text/javascript' charset='utf-8'><\/script>";t.dom.body.append(a)},t.initBaidu=function(){t.cse=new BCse.Search(t.config.apiId),t.dom.input.each((function(a,t){e(t).attr("disabled",!1)}))},t.query=function(e,a,o){t.cse.getResult(e,(function(a){console.log("Searching: "+e),t.cse.getError((function(e){console.log(e)})),a.length>0?(t.buildResultList(a,e),t.cse.getSearchInfo(e,(function(e){console.log(e),t.buildMetadata(e)}))):(t.nav.total=0,t.nav.next=-1,t.nav.prev=-1,t.dom.modal_metadata.hide(),t.dom.btn_next.hide(),t.dom.btn_prev.hide(),t.onQueryError(e,"success")),o instanceof Function&&o()}))},t.loadScript(),t}}(jQuery);var HexoSearch,GoogleCustomSearch="";!function(e){"use strict";GoogleCustomSearch=function(a){SearchService.apply(this,arguments);var t=this,o="https://www.googleapis.com/customsearch/v1";return t.addLogo("google"),t.buildResultList=function(a){var o="";return e.each(a,(function(e,a){var n=a.link,r=a.title,s=(a.htmlSnippet||"").replace("<br>","");o+=t.buildResult(n,r,s)})),o+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},t.buildMetadata=function(e){e.queries&&e.queries.request&&"0"!==e.queries.request[0].totalResults?(t.nav.current=e.queries.request[0].startIndex,t.nav.currentCount=e.queries.request[0].count,t.nav.total=parseInt(e.queries.request[0].totalResults),t.dom.modal_metadata.children(".total").html(t.nav.total),t.dom.modal_metadata.children(".range").html(t.nav.current+"-"+(t.nav.current+t.nav.currentCount-1)),t.dom.modal_metadata.show()):t.dom.modal_metadata.hide(),e.queries&&e.queries.nextPage?(t.nav.next=e.queries.nextPage[0].startIndex,t.dom.btn_next.show()):(t.nav.next=-1,t.dom.btn_next.hide()),e.queries&&e.queries.previousPage?(t.nav.prev=e.queries.previousPage[0].startIndex,t.dom.btn_prev.show()):(t.nav.prev=-1,t.dom.btn_prev.hide())},t.query=function(a,n,r){e.get(o,{key:t.config.apiKey,cx:t.config.engineId,q:a,start:n,num:t.config.per_page},(function(e,o){if("success"===o&&e.items&&e.items.length>0){var n=t.buildResultList(e.items);t.dom.modal_results.html(n)}else t.onQueryError(a,o);t.buildMetadata(e),r&&r()}))},t}}(jQuery),function(e){"use strict";HexoSearch=function(a){SearchService.apply(this,arguments);var t=this;return t.config.endpoint=ROOT+((a||{}).endpoint||"content.json"),t.config.endpoint=t.config.endpoint.replace("//","/"),t.cache="",t.contentSearch=function(a,t){var o=a.title.trim().toLowerCase(),n=a.text.trim().toLowerCase(),r=t.trim().toLowerCase().split(" "),s=!1,i=-1,c=-1,d=-1;return""!==o&&""!==n&&e.each(r,(function(e,t){if(i=o.indexOf(t),c=n.indexOf(t),i<0&&c<0?s=!1:(s=!0,c<0&&(c=0),0===e&&(d=c)),s){n=a.text.trim();var l=0,u=0;if(d>=0){u=0===(l=Math.max(d-40,0))?Math.min(200,n.length):Math.min(d+120,n.length);var m=n.substring(l,u);r.forEach((function(e){var a=new RegExp(e,"gi");m=m.replace(a,"<b mark>"+e+"</b>")})),a.digest=m+"......"}else u=Math.min(200,n.length),a.digest=n.trim().substring(0,u)}})),s},t.buildResultList=function(a,o){var n="";return e.each(a,(function(e,a){t.contentSearch(a,o)&&(n+=t.buildResult(a.permalink,a.title,a.digest))})),n+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},t.buildMetadata=function(e){t.dom.modal_footer.hide()},t.query=function(a,o,n){if(t.cache){var r="";r+=t.buildResultList(t.cache.pages,a),r+=t.buildResultList(t.cache.posts,a),t.dom.modal_results.html(r),t.buildMetadata(t.cache),n&&n(t.cache)}else e.get(t.config.endpoint,{key:t.config.apiKey,cx:t.config.engineId,q:a,start:o,num:t.config.per_page},(function(e,o){if("success"!==o||!e||!e.posts&&!e.pages||e.posts.length<1&&e.pages.length<1)t.onQueryError(a,o);else{t.cache=e;var r="";r+=t.buildResultList(e.pages,a),r+=t.buildResultList(e.posts,a),t.dom.modal_results.html(r)}t.buildMetadata(e),n&&n(e)}))},t}}(jQuery);