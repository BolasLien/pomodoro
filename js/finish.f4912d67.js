(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["finish"],{dc0d:function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"row",attrs:{id:"finish"}},[i("div",{staticClass:"col"},[i("b-table",{staticClass:"text-center",attrs:{items:t.finishs,fields:t.fields},scopedSlots:t._u([{key:"cell(again)",fn:function(n){return[i("b-btn",{attrs:{variant:"success"},on:{click:function(i){return t.again(n)}}},[i("font-awesome-icon",{attrs:{icon:["fas","plus"]}})],1)]}},{key:"cell(del)",fn:function(n){return[i("b-btn",{attrs:{variant:"danger"},on:{click:function(i){return t.delFinish(n)}}},[i("font-awesome-icon",{attrs:{icon:["fas","trash-alt"]}})],1)]}}])})],1)])},s=[],a={data:function(){return{fields:[{key:"name",label:"名稱"},{key:"again",label:"再一次"},{key:"del",label:"移除"}]}},computed:{finishs:function(){return this.$store.getters.finishs}},methods:{again:function(t){this.$store.commit("again",t)},delFinish:function(t){this.$store.commit("delFinish",t.index)}}},c=a,l=i("2877"),o=Object(l["a"])(c,e,s,!1,null,null,null);n["default"]=o.exports}}]);
//# sourceMappingURL=finish.f4912d67.js.map