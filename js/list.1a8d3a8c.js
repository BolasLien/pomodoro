(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["list"],{"1a33":function(t,o,s){"use strict";s.r(o);var i=function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"row flex-column",attrs:{id:"list"}},[s("div",{staticClass:"col mb-3"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-8"},[s("b-form-input",{attrs:{placeholder:"新增待辦事項..."},model:{value:t.newtodo,callback:function(o){t.newtodo=o},expression:"newtodo"}})],1),s("div",{staticClass:"col-2"},[s("b-btn",{attrs:{variant:"success"},on:{click:t.addTodo}},[s("font-awesome-icon",{attrs:{icon:["fas","plus"]}})],1)],1),s("div",{staticClass:"col-2"},[s("b-btn",{attrs:{variant:t.editColor},on:{click:t.listEdit}},[s("font-awesome-icon",{attrs:{icon:["fas","pen"]}})],1)],1)])]),s("div",{staticClass:"col"},[s("b-table-simple",[s("draggable",t._b({attrs:{sort:t.isEdit,tag:"tbody"},model:{value:t.todos,callback:function(o){t.todos=o},expression:"todos"}},"draggable",t.dragOption,!1),[0==t.todos.length?s("b-tr",[s("b-td",[t._v("沒有資料")])],1):t._l(t.todos,(function(o,i){return s("b-tr",{key:i},[s("b-td",[o.edit?s("b-form-input",{model:{value:o.model,callback:function(s){t.$set(o,"model",s)},expression:"todo.model"}}):t._e(),o.edit?s("b-btn",{staticClass:"text-danger",attrs:{variant:"link"},on:{click:function(o){return t.cancelTodo(i)}}},[s("font-awesome-icon",{attrs:{icon:["fas","window-close"],size:"2x"}})],1):t._e(),o.edit?s("b-btn",{staticClass:"text-success",attrs:{variant:"link"},on:{click:function(o){return t.saveTodo(i)}}},[s("font-awesome-icon",{attrs:{icon:["fas","save"],size:"2x"}})],1):s("span",[t._v(t._s(o.name))])],1),s("b-td",[t.isEdit?s("b-btn",{staticClass:"text-primary",attrs:{variant:"link"},on:{click:function(o){return t.editTodo(i)}}},[s("font-awesome-icon",{attrs:{icon:["fas","pen"]}})],1):t._e(),t.isEdit?s("b-btn",{staticClass:"text-danger",attrs:{variant:"link"},on:{click:function(o){return t.delTodo(i)}}},[s("font-awesome-icon",{attrs:{icon:["fas","trash-alt"]}})],1):t._e()],1)],1)}))],2)],1)],1)])},n=[],a={data:function(){return{newtodo:"",isEdit:!1,editColor:"primary",dragOption:{animation:200}}},methods:{addTodo:function(){this.$store.commit("addTodo",this.newtodo)},delTodo:function(t){this.$store.commit("delTodo",t)},editTodo:function(t){this.$store.commit("editTodo",t)},cancelTodo:function(t){this.$store.commit("cancelTodo",t)},saveTodo:function(t){this.$store.commit("saveTodo",t)},listEdit:function(){this.isEdit=!this.isEdit,this.editColor=this.isEdit?"danger":"primary"}},computed:{todos:{get:function(){return this.$store.getters.todos},set:function(t){this.$store.commit("dragTodo",t)}}}},e=a,c=s("2877"),d=Object(c["a"])(e,i,n,!1,null,null,null);o["default"]=d.exports}}]);
//# sourceMappingURL=list.1a8d3a8c.js.map