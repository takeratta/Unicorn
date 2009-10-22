// $Id: w3c_unicorn_index-yc.js,v 1.3 2009-10-22 17:39:29 tgambet Exp $
// Author: Thomas GAMBET.
// (c) COPYRIGHT MIT, ERCIM and Keio, 2009.
// Compressed with YUI Compressor 2.4.2 (source: ./w3c_unicorn_index.js)
var W3C={start:function(){W3C.Tabs=$("tabset_tabs");W3C.TabLinks=W3C.Tabs.getChildren("li a");W3C.TaskSelect=$("tasks");W3C.TaskOptions=W3C.TaskSelect.getChildren("option");W3C.TaskDescrip=$("task_descrip");W3C.TaskInputs=$$("input.task");W3C.LangParameter=$$("html").getProperty("lang")[0];W3C.Forms=$$("form.ucn_form");W3C.Action=W3C.Forms[0].getProperty("action");W3C.SelectedTab=0;W3C.SelectedTask=W3C.TaskOptions.getProperty("value").indexOf(W3C.TaskInputs[0].value);W3C.WithOptions=false;W3C.Loader=new Element("img",{src:"images/ajax-loader.gif","class":"loader"});W3C.prepareDocument();W3C.parseHash();W3C.showTab(W3C.SelectedTab,false);W3C.selectTask(W3C.SelectedTask,false);W3C.toggleOptions(false);W3C.addOptionEvents()},prepareDocument:function(){$$("input#task_change").setStyle("display","none");W3C.TaskSelect.addEvent("change",function(a){a.stop();W3C.selectTask(this.selectedIndex,true);W3C.updateHash()});W3C.TabLinks.each(function(b,a){b.addEvent("click",function(c){c.stop();W3C.showTab(a,true);W3C.updateHash()})});W3C.TaskOptions.addEvent("mouseover",function(){W3C.TaskDescrip.set("text",this.title)});W3C.TaskOptions.addEvent("mouseout",function(){W3C.TaskDescrip.set("text",W3C.TaskOptions[W3C.SelectedTask].title)});$$("div#messages pre").slide("hide");$$("div#messages > div").each(function(a){if(a.getElement("pre")){a.addClass("pointer");a.addEvent("click",function(b){a.getElement("pre").slide("toggle")})}});$$("ul#lang_choice").getElements("a").each(function(b){b.addEvent("click",function(a){this.setProperty("href",this.getProperty("href")+window.location.hash)})});W3C.Forms.filter("form[method=get]").each(function(a){new FormValidator(a,{onFormValidate:function(e,c,b){if(e){b.preventDefault();var d=c.toQueryString().replace("uri=http%3A%2F%2F","uri=")+"#"+W3C.getHash();window.location="./"+W3C.Action+"?"+d}}})});W3C.Forms.filter("form[method=post]").each(function(a){new FormValidator(a,{onFormValidate:function(d,c,b){if(d){c.setProperty("action",c.getProperty("action")+"#"+W3C.getHash())}}})})},addOptionEvents:function(){$$("fieldset.advanced legend").removeEvents("click");$$("fieldset.advanced legend").addEvent("click",function(a){W3C.WithOptions=!W3C.WithOptions;W3C.toggleOptions(true);W3C.updateHash()})},showTab:function(a,b){if(W3C.Tabs.getElements("li")[a]==W3C.Tabs.getElement("li.selected")){return}W3C.SelectedTab=a;W3C.Forms.each(function(d,c){if(c!=a){d.setStyle("display","none")}else{if(b){d.setStyle("opacity",0)}d.setStyle("display","block")}});W3C.TabLinks.each(function(d,c){if(c!=a){d.setProperty("class","")}else{d.setProperty("class","selected")}});W3C.toggleOptions(false);if(b){W3C.Forms[a].set("tween",{duration:350});W3C.Forms[a].tween("opacity",0,1)}},selectTask:function(d,g){W3C.SelectedTask=d;var b=$$("fieldset.options");var c;W3C.TaskOptions.each(function(j,h){if(h!=d){j.removeProperty("selected")}else{c=j.value;j.setProperty("selected","selected")}});W3C.TaskDescrip.set("text",W3C.TaskOptions[d].title);W3C.TaskInputs.each(function(h){h.value=c});var b=$$("fieldset.options");b.setStyle("display","none");b.getElements(".option_input").each(function(h){h.setProperty("disabled","disabled")});var e=$$(".ucn_text_mime");e.setStyle("display","none");e.setProperty("disabled","disabled");var a=b.filter("fieldset."+c);var f=$$(".ucn_text_mime."+c);if(!a.length>0){W3C.requestOptions(d,g)}else{a.getElements(".option_input").each(function(h){h.removeProperty("disabled")});a.setStyle("opacity",0);a.setStyle("display","block");if(g){a.set("tween",{duration:350});a.tween("opacity",0,1)}a.setStyle("opacity",1);f.removeProperty("disabled");f.setStyle("opacity",0);f.setStyle("display","block");if(g){f.set("tween",{duration:350});f.tween("opacity",0,1)}f.setStyle("opacity",1)}W3C.toggleOptions(false)},requestOptions:function(a,c){var b=new Request.HTML({url:window.location.pathname.replace(new RegExp(""+W3C.Action+"$"),""),method:"get",onRequest:function(){W3C.Loader.injectBefore(W3C.Forms[W3C.SelectedTab].getElement("div.submit"))},onSuccess:function(h,e,i,g){var f;e.filter("fieldset.options").each(function(j){W3C.Forms.each(function(l,k){var m=j.clone();m.setStyle("opacity",0);m.injectBefore(l.getElement("div.submit"));if(c){m.set("tween",{duration:350});m.tween("opacity",0,1)}m.setStyle("opacity",1)})});e.filter(".ucn_text_mime").each(function(j){j.setStyle("opacity",0);j.inject($("ucn_text"),"after");if(c){j.set("tween",{duration:350});j.tween("opacity",0,1)}j.setStyle("opacity",1)});W3C.Loader.dispose();W3C.toggleOptions(false);W3C.addOptionEvents();return true},onFailure:function(){return false}});var d="ucn_task="+W3C.TaskOptions[a].value+"&ucn_lang="+W3C.LangParameter;b.send(d)},toggleOptions:function(b){var a=$$("fieldset.advanced");if(a.length==0){return}if(W3C.WithOptions){a.addClass("toggled");a.removeClass("toggles")}else{a.addClass("toggles");a.removeClass("toggled")}W3C.Forms.each(function(e,c){var d=e.getElements("fieldset.advanced div.options");if(b&&c==W3C.SelectedTab){if(W3C.WithOptions){d.slide("in")}else{d.slide("out")}}else{if(W3C.WithOptions){d.slide("show")}else{d.slide("hide")}}})},parseHash:function(){var g=window.location.hash;if(g==""){return}var f=g.replace("#","").split("+");var b=f[0];var d=f[1];var a=f[2];var c=W3C.Forms.getProperty("id").indexOf(b);if(c==-1){W3C.setHash("");return}W3C.SelectedTab=c;if(!d||!d.contains("task_")){W3C.setHash(b);return}var e=W3C.TaskOptions.getProperty("value").indexOf(d.replace("task_",""));if(e==-1){W3C.setHash(b);return}W3C.SelectedTask=e;if(!a||!a=="with_options"){W3C.setHash(b+"+"+d);return}W3C.WithOptions=true},updateHash:function(){var c=W3C.Forms[W3C.SelectedTab].getProperty("id");var b="+task_"+W3C.TaskOptions[W3C.SelectedTask].getProperty("value");var a=W3C.WithOptions?"+with_options":"";W3C.setHash(c+b+a)},getHash:function(){var c=W3C.Forms[W3C.SelectedTab].getProperty("id");var b="+task_"+W3C.TaskOptions[W3C.SelectedTask].getProperty("value");var a=W3C.WithOptions?"+with_options":"";return c+b+a},setHash:function(a){if(window.webkit419){W3C.FakeForm=W3C.FakeForm||new Element("form",{method:"get"}).injectInside(document.body);W3C.FakeForm.setProperty("action","#"+a).submit()}else{window.location.replace("#"+a)}}};window.addEvent("domready",W3C.start);