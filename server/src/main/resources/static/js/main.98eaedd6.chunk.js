(this.webpackJsonpRepDict=this.webpackJsonpRepDict||[]).push([[0],{18:function(e){e.exports=JSON.parse('{"a":"http://192.168.95.176:5050","b":{"MAIN":"/","USERS":"/users","REGISTRATION":"/registration","LOGIN":"/login","AUTH":"/auth","GET_DECKS":"/get_decks"}}')},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var i={};n.r(i),n.d(i,"login",(function(){return A}));var a={};n.r(a),n.d(a,"show",(function(){return F})),n.d(a,"hide",(function(){return U}));var c=n(1),s=n.n(c),r=n(23),o=n.n(r),l=n(15),d=n(10),u=n(4),j=n(5),h=n(7),m=n(6),b=n(3),O=n(16),p=n(31),f=n(29),v=n.n(f),g=n(18),x=function(){function e(){Object(u.a)(this,e)}return Object(j.a)(e,null,[{key:"GET",value:function(e,t,n){return v.a.get(e,{params:Object(d.a)(Object(d.a)({},t),{},{token:localStorage.getItem("token")||""}),responseType:(null===n||void 0===n?void 0:n.downloadFile)?"blob":"json"})}},{key:"POST",value:function(e,t,n){return v.a.post(e,Object(d.a)(Object(d.a)({},t),{},{token:localStorage.getItem("token")||""}),{responseType:(null===n||void 0===n?void 0:n.downloadFile)?"blob":"json"})}},{key:"registration",value:function(e){return this.POST(this.API_URLS.REGISTRATION,e)}},{key:"login",value:function(e){return this.POST(this.API_URLS.LOGIN,e)}},{key:"auth",value:function(){return this.GET(this.API_URLS.AUTH,{})}},{key:"getDecks",value:function(){return this.GET(this.API_URLS.GET_DECKS,{})}}]),e}();x.API_URLS={REGISTRATION:g.a+g.b.REGISTRATION,LOGIN:g.a+g.b.LOGIN,AUTH:g.a+g.b.AUTH,GET_DECKS:g.a+g.b.GET_DECKS};var N,k,_=x;!function(e){e.RUS="RUS",e.ENG="ENG",e.JPN="JPN",e.CHI="CHI",e.ITA="ITA",e.SPA="SPA",e.FRA="FRA",e.GER="GER"}(N||(N={})),function(e){e.SUCCESS="SUCCESS",e.ERROR="ERROR",e.WARNING="WARNING"}(k||(k={}));var y,L="APP/LOGIN",S="NOTIFY/SHOW",w="NOTIFY/HIDE",R=n(17),E=n(8),I=function(e,t){var n=function(n){e.current&&!e.current.contains(n.target)&&t()};Object(c.useEffect)((function(){return document.addEventListener("click",n),function(){document.removeEventListener("click",n)}}))},C=n(0),T=function(e){var t=Object(c.useState)(!1),n=Object(R.a)(t,2),i=n[0],a=n[1],s=Object(c.useState)(e.activeLike||!1),r=Object(R.a)(s,2),o=r[0],l=r[1],d=Object(c.useState)(e.countLikes||0),u=Object(R.a)(d,2),j=u[0],h=u[1],m=Object(c.useRef)(null);I(m,(function(){i&&a(!1)}));return Object(C.jsxs)("div",{className:"card_item card_item_noactive",children:[Object(C.jsxs)("div",{className:"control",children:[Object(C.jsx)("span",{className:"icon",onClick:function(e){return a(!i)},children:Object(C.jsx)(E.c,{})}),Object(C.jsxs)("ul",{className:"dropdown ".concat(i?"active":"noactive"),ref:m,children:[Object(C.jsx)("li",{className:"dropdown_item",onClick:e.edit,children:"Edit"}),Object(C.jsx)("li",{className:"dropdown_item",onClick:e.delete,children:"Delete"})]})]}),Object(C.jsxs)("p",{className:"card_item_head",children:[Object(C.jsx)("span",{className:"private_lock",children:e.isPrivate?Object(C.jsx)(E.g,{}):Object(C.jsx)(E.h,{})}),Object(C.jsx)("span",{className:"card_item_head_name",children:e.name}),void 0!==e.author&&Object(C.jsxs)(O.b,{to:e.authorLink||"/users",className:"author",children:["(by ",e.author,")"]})]}),Object(C.jsxs)("div",{className:"middle_layer",children:[Object(C.jsxs)("div",{className:"card_item_head_langs",children:[Object(C.jsx)("div",{className:"lang main_lang",children:e.mainLang}),"/",Object(C.jsx)("div",{className:"lang sec_lang",children:e.secondaryLang})]}),Object(C.jsxs)("div",{className:"info",children:[Object(C.jsxs)("p",{className:"info_count_words",children:[e.countWords," words"]}),Object(C.jsxs)("p",{className:"info_count_repetitions",children:[e.countRepetitions," repetitions"]})]})]}),Object(C.jsx)("p",{className:"card_item_description",children:e.description}),Object(C.jsx)("div",{className:"footer",children:Object(C.jsxs)("span",{className:"likes",onClick:function(t){return function(t){l(!o),h(o?j-1:j+1),e.like(t)}(t)},children:[Object(C.jsx)("span",{className:"heart ".concat(o?"active":"noactive"),children:Object(C.jsx)(E.d,{})}),j]})})]})},G=function(e){return Object(C.jsxs)("div",{className:"card_item card_item_active",children:[Object(C.jsx)("p",{className:"card_item_name",children:"Nature"}),Object(C.jsx)("span",{className:"card_item_count_words",children:"23 words"}),Object(C.jsx)("p",{className:"card_item_count_repetitions",children:"3 repetitions"}),Object(C.jsxs)("div",{className:"card_item_panel_adding",children:[Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"email",className:"form-control",id:"floatingInput",placeholder:"name@example.com"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Email address"})]}),Object(C.jsx)("span",{className:"card_item_panel_toggler",children:"\u2194"}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"email",className:"form-control",id:"floatingInput",placeholder:"name@example.com"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Email address"})]}),Object(C.jsx)("button",{className:"card_item_panel_button_add",children:"add"}),Object(C.jsx)("div",{className:"card_item_panel_item_words",children:Object(C.jsxs)("ul",{className:"card_item_panel_item_words_ul",children:[Object(C.jsx)("li",{className:"item",children:"First - Link"}),Object(C.jsx)("li",{className:"item",children:"Second - Link"}),Object(C.jsx)("li",{className:"item",children:"Third - Link"}),Object(C.jsx)("li",{className:"item",children:"Fourth - Link"}),Object(C.jsx)("li",{className:"item",children:"Fifth - Link"}),Object(C.jsx)("li",{className:"item",children:"Sixth - Link"}),Object(C.jsx)("li",{className:"item",children:"Seventh - Link"}),Object(C.jsx)("li",{className:"item",children:"Eighth - Link"}),Object(C.jsx)("li",{className:"item",children:"Ninth - Link"}),Object(C.jsx)("li",{className:"item",children:"Tenth - Link"}),Object(C.jsx)("li",{className:"item",children:"Eleventh Link"}),Object(C.jsx)("li",{className:"item",children:"Twelfth Link"}),Object(C.jsx)("li",{className:"item",children:"Thirteenth Link"}),Object(C.jsx)("li",{className:"item",children:"Fourteenth Link"}),Object(C.jsx)("li",{className:"item",children:"Fifteenth Link"}),Object(C.jsx)("li",{className:"item",children:"Sixteenth Link"}),Object(C.jsx)("li",{className:"item",children:"Seventeenth Link"}),Object(C.jsx)("li",{className:"item",children:"Eighteenth Link"}),Object(C.jsx)("li",{className:"item",children:"Nineteenth Link"}),Object(C.jsx)("li",{className:"item",children:"Twentieth Link"})]})})]}),Object(C.jsxs)("div",{className:"buttons_group",children:[Object(C.jsx)("button",{className:"button_manipulate",onClick:function(t){return e.save(t,e.id,[])},children:"save"}),Object(C.jsx)("button",{className:"button_manipulate",onClick:function(t){return e.delete(t,e.id)},children:"delete"})]})]})},D=function(e){return Object(C.jsx)("div",{className:"card_item card_item_noactive new_card",children:Object(C.jsx)(E.j,{onClick:function(t){return e.add(t)}})})};n(76);!function(e){e[e.NOT=0]="NOT",e[e.GOOGLE=1]="GOOGLE",e[e.VK=2]="VK",e[e.FACEBOOK=3]="FACEBOOK"}(y||(y={}));var P,A=function(e){return{type:L,payload:e}},F=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:300;return{type:S,payload:{type:e,head:t,content:n,timeout:i}}},U=function(){return{type:w}},B={app:i,notification:a},H=n(20),V=n(45),W=n(46),K={auth:!0,user:{name:"\u0414\u0430\u043d\u0438\u043b\u0443\u0442",login:"daniil00t"}},M={visible:!1,type:null,head:"OK",content:"sfsdfsdafsadf sadf sadf ",timeout:2e3},J=Object(H.combineReducers)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;return t.type===L?(localStorage.setItem("token",t.payload.token),Object(d.a)(Object(d.a)({},e),{},{auth:!0,user:{name:t.payload.name,login:t.payload.login}})):e},notification:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case S:return{visible:!0,type:t.payload.type,head:t.payload.head,content:t.payload.content,timeout:t.payload.timeout};case w:return Object(d.a)({},M);default:return e}}}),Y=J,q=Object(W.composeWithDevTools)({trace:!0,traceLimit:25}),z=Object(H.createStore)(Y,q(Object(H.applyMiddleware)(V.a,(function(e){return function(t){return function(n){var i=!1,a=[];function c(){a.forEach((function(t){return e.dispatch(t)})),a=[]}var s=Object.assign({},n,{asyncDispatch:function(e){a=a.concat([e]),i&&c()}}),r=t(s);return i=!0,c(),r}}}))));!function(e){e.SUCCESS="SUCCESS",e.ERROR="ERROR",e.WARNING="WARNING"}(P||(P={}));var Q=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;z.dispatch(B.notification.show("error",e,t,n))},X=function(e){var t=Object(c.useState)(e.visible),n=Object(R.a)(t,2),i=(n[0],n[1]);return e.visible&&setTimeout((function(){i(!1),z.dispatch(B.notification.hide())}),e.timeout||2e3),Object(C.jsx)("div",{className:"Notification notify_".concat(e.type||"default"),style:{display:e.visible?"block":"none"},children:Object(C.jsxs)("div",{className:"Notification_wrapper_content",children:[Object(C.jsx)("div",{className:"close",onClick:function(e){return z.dispatch(B.notification.hide())},children:Object(C.jsx)(E.m,{})}),Object(C.jsx)("h2",{className:"head",children:e.head}),Object(C.jsx)("p",{className:"content",children:e.content})]})})},Z=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).state={decks:[{id:1,name:"Kitchen",countWords:3,countRepetitions:5,isPrivate:!1,mainLang:N.RUS,secondaryLang:N.ENG,author:"daniil00t",authorLink:"/user/8",description:"This deck about kitchen and some subjects in there"}],isEdit:!1,idEdit:-1},i}return Object(j.a)(n,[{key:"addDeck",value:function(e){this.setState({isEdit:!0})}},{key:"saveDeck",value:function(e,t,n){console.log("save"),this.setState({isEdit:!1})}},{key:"editDeck",value:function(e,t){this.setState({isEdit:!0})}},{key:"deleteDeck",value:function(e,t){console.log("delete",t)}},{key:"like",value:function(){console.log("like")}},{key:"componentDidMount",value:function(){var e=this;_.getDecks().then((function(t){return!t.error&&e.setState({decks:[].concat(Object(p.a)(e.state.decks),Object(p.a)(t))})})).catch((function(e){return Q("Error","Failed to load data",3e3)}))}},{key:"render",value:function(){var e=this;return Object(C.jsx)(s.a.Fragment,{children:Object(C.jsxs)("section",{className:"lesson_section",children:[Object(C.jsx)("h2",{className:"cards_main_name",children:"My Cards"}),Object(C.jsxs)("div",{className:"cards",children:[this.state.isEdit&&Object(C.jsx)(G,{id:1,name:"Kitchen",countWords:3,countRepetitions:4,isPrivate:!0,mainLang:N.RUS,secondaryLang:N.ENG,words:[],save:this.saveDeck.bind(this),delete:this.deleteDeck}),Object(C.jsx)(D,{add:this.addDeck.bind(this)}),this.state.decks.map((function(t){return Object(C.jsx)(T,{id:t.id,name:t.name,countWords:t.countWords,author:t.auhtor,authorLink:t.authorLink,description:t.description,countRepetitions:t.countRepetitions,isPrivate:t.isPrivate,mainLang:t.mainLang,secondaryLang:t.secondaryLang,countLikes:10,activeLike:!1,edit:e.editDeck.bind(e),delete:e.deleteDeck,like:e.like})}))]})]})})}}]),n}(s.a.Component),$=(n(40),n(41),function(e){return Object(C.jsx)("div",{className:"home",children:Object(C.jsx)("p",{style:{color:"white"},children:"Home, sweet home"})})}),ee=(n(42),Object(l.b)((function(e){return{auth:e.app.auth}}),(function(e){return{login:function(t){return e(B.app.login(t))}}}))(function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).state={loginValidate:null,passwordValidate:null},i.login=Object(c.createRef)(),i.password=Object(c.createRef)(),i}return Object(j.a)(n,[{key:"clickLogin",value:function(e){var t,n,i=this;e.preventDefault(),_.login({login:null===(t=this.login.current)||void 0===t?void 0:t.value,password:null===(n=this.password.current)||void 0===n?void 0:n.value}).then((function(e){return i.props.login(e.data)})).catch((function(e){return Q("Error","Error on server")}))}},{key:"validateForm",value:function(e){switch(console.log(e),e.target.name){case"login":e.target.value.length>3&&e.target.value.length<30?this.setState({loginValidate:!0}):this.setState({loginValidate:!1});break;case"password":e.target.value.length>7&&e.target.value.length<40?this.setState({passwordValidate:!0}):this.setState({passwordValidate:!1})}}},{key:"render",value:function(){var e=this;return Object(C.jsx)("div",{className:"login",children:Object(C.jsxs)("form",{children:[Object(C.jsx)("h2",{children:"Login"}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"text",name:"login",onBlur:function(t){return e.validateForm(t)},ref:this.login,className:"input-login form-control \n\t\t\t\t\t\t\t\t".concat(null!==this.state.loginValidate?this.state.loginValidate?"is-valid":"is-invalid":""),id:"floatingInput",placeholder:"your login"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Login"})]}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"password",onBlur:function(t){return e.validateForm(t)},ref:this.password,className:"input-password form-control \n\t\t\t\t\t\t\t\t".concat(null!==this.state.passwordValidate?this.state.passwordValidate?"is-valid":"is-invalid":""),id:"floatingInput",name:"password",placeholder:"your password"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Password"})]}),Object(C.jsx)("button",{className:"btn btn-primary",onClick:function(t){return e.clickLogin(t)},children:"login"})]})})}}]),n}(s.a.Component))),te=function(e){return Object(C.jsx)("div",{className:"page_statistics",children:"Statistics"})},ne=Object(l.b)((function(e){return{auth:e.app.auth}}),(function(e){return{login:function(t){return e(B.app.login(t))}}}))(function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).state={},i.name=Object(c.createRef)(),i.login=Object(c.createRef)(),i.password=Object(c.createRef)(),i.rpassword=Object(c.createRef)(),i}return Object(j.a)(n,[{key:"clickRegistration",value:function(e){var t,n,i,a,c,s=this;(e.preventDefault(),(null===(t=this.password.current)||void 0===t?void 0:t.value)===(null===(n=this.rpassword.current)||void 0===n?void 0:n.value))?_.registration({name:null===(i=this.name.current)||void 0===i?void 0:i.value,login:null===(a=this.login.current)||void 0===a?void 0:a.value,password:null===(c=this.password.current)||void 0===c?void 0:c.value,refer:null}).then((function(e){s.props.login(e.data)})).catch((function(e){return console.log(e)})):console.log("passwords is not equal")}},{key:"render",value:function(){var e=this;return Object(C.jsx)("div",{className:"registration",children:Object(C.jsxs)("form",{children:[Object(C.jsx)("h2",{children:"Registration"}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"text",ref:this.name,className:"form-control",id:"floatingInput",placeholder:"your name"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Name"})]}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"text",ref:this.login,className:"form-control",id:"floatingInput",placeholder:"your login"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Login"})]}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"password",ref:this.password,className:"form-control",id:"floatingInput",placeholder:"your password"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Password"})]}),Object(C.jsxs)("div",{className:"form-floating mb-3",children:[Object(C.jsx)("input",{type:"password",ref:this.rpassword,className:"form-control",id:"floatingInput",placeholder:"your password"}),Object(C.jsx)("label",{htmlFor:"floatingInput",children:"Repeat password"})]}),Object(C.jsx)("button",{className:"btn btn-primary",onClick:function(t){return e.clickRegistration(t)},children:"registration"})]})})}}]),n}(s.a.Component)),ie=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(u.a)(this,n),t.call(this,e)}return Object(j.a)(n,[{key:"render",value:function(){return Object(C.jsx)("div",{className:"Play",style:{color:"white"},children:"Play!!!"})}}]),n}(s.a.Component),ae=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(u.a)(this,n),t.call(this,e)}return Object(j.a)(n,[{key:"render",value:function(){return Object(C.jsx)("div",{className:"Store",style:{color:"white"},children:"Store!!!"})}}]),n}(s.a.Component),ce=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(u.a)(this,n),t.call(this,e)}return Object(j.a)(n,[{key:"render",value:function(){return Object(C.jsx)("div",{className:"Rating",style:{color:"white"},children:"Rating!!!"})}}]),n}(s.a.Component),se=(n(77),{Main:function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(u.a)(this,n),t.call(this,e)}return Object(j.a)(n,[{key:"render",value:function(){return Object(C.jsx)("div",{className:"Main",style:{color:"white"},children:Object(C.jsxs)("div",{className:"slider",children:[Object(C.jsx)("div",{className:"image_wrapper",children:Object(C.jsx)("img",{className:"image_slider",src:"images/slider.png",alt:"slider image"})}),Object(C.jsxs)("div",{className:"text_block",children:[Object(C.jsx)("h1",{children:"Learn, Repeate and Develop"}),Object(C.jsx)("p",{children:"Welcome to the service for memorizing words in foreign languages using flashcards"})]})]})})}}]),n}(s.a.Component),Cards:Z,Home:$,Statistics:te,Play:ie,Store:ae,Rating:ce,Registration:ne,Login:ee}),re=[{isNavBar:!1,isLogin:!1,isExact:!0,path:"/",name:"Main",component:se.Main},{isNavBar:!0,isLogin:!0,isExact:!0,path:"/home",name:"Home",component:se.Home,icon:E.e},{isNavBar:!0,isLogin:!0,isExact:!0,path:"/play",name:"Play",component:se.Play,icon:E.i},{isNavBar:!0,isLogin:!0,isExact:!0,isPrivate:!0,path:"/cards",name:"Cards",component:se.Cards,icon:E.f},{isNavBar:!0,isExact:!0,path:"/store",name:"Store",component:se.Store,icon:E.l},{isNavBar:!0,isLogin:!0,isExact:!0,path:"/statistics",name:"Statistics",component:se.Statistics,icon:E.b},{isNavBar:!0,isExact:!0,path:"/rating",name:"Rating",component:se.Rating,icon:E.k},{isNavBar:!0,isExact:!0,isLogin:!1,path:"/registration",name:"Registration",component:se.Registration},{isNavBar:!0,isLogin:!1,isExact:!0,path:"/login",name:"Login",component:se.Login},{isNavBar:!1,isLogin:!1,isExact:!0,path:"/user/:id",name:"User",component:se.Home}],oe=(n(43),{Header:Object(l.b)((function(e){return{auth:e.app.auth,user:e.app.user}}),(function(e){return{login:function(t){return e(B.app.login(t))}}}))((function(e){var t=Object(c.useState)(!1),n=Object(R.a)(t,2),i=n[0],a=n[1],s=Object(c.useState)(!1),r=Object(R.a)(s,2),o=r[0],l=r[1],d=Object(c.useRef)(null),u=Object(b.g)().pathname;return I(d,(function(){i&&a(!1)})),Object(c.useEffect)((function(){document.body.style.overflow=o?"hidden":"unset"}),[o]),Object(C.jsxs)("header",{className:"main_header",children:[Object(C.jsx)("div",{className:"logo",children:Object(C.jsx)("span",{className:"logo_text",children:Object(C.jsx)(O.b,{to:"/",onClick:function(e){return l(!1)},children:"RepDict"})})}),Object(C.jsxs)("div",{className:"menu",children:[Object(C.jsx)("div",{className:"icon_bars",onClick:function(e){return l(!o)},children:Object(C.jsx)(E.a,{})}),Object(C.jsxs)("ul",{className:"menu_list responsive_".concat(o?"active":"noactive"),children:[e.routes.filter((function(t){return t.isLogin===e.auth||void 0===t.isLogin})).map((function(e){return Object(C.jsx)("li",{className:"menu_list_item ".concat(e.path===u?"active":"noactive"),children:Object(C.jsxs)(O.b,{className:"menu_list_item_link",to:"".concat(e.path),onClick:function(e){return l(!1)},children:[!!e.icon&&Object(C.jsx)(e.icon,{}),e.name]})},e.path)})),e.auth&&Object(C.jsxs)("li",{style:{color:"white"},className:"user_panel",onClick:function(e){return a(!i)},children:[Object(C.jsxs)("div",{className:"user_panel_head",children:[Object(C.jsx)(E.n,{}),e.user.name]}),Object(C.jsxs)("ul",{className:"dropdown ".concat(i?"showedDB__fadeIn":"closed"),ref:d,children:[Object(C.jsx)("li",{className:"dropdown_item",children:Object(C.jsx)(O.b,{to:"/settings",onClick:function(e){return l(!1)},children:"Setting"})}),Object(C.jsx)("li",{className:"dropdown_item",children:Object(C.jsx)(O.b,{to:"/logout",onClick:function(e){return l(!1)},children:"Logout"})})]})]})]})]})]})})),Deck:T,Currsection:function(e){var t=e.info;return Object(C.jsx)("section",{className:"lesson_section lesson_info",children:Object.keys(t).map((function(e,n){return Object(C.jsxs)("p",{className:"lesson_info_item",children:[Object(C.jsxs)("span",{className:"lesson_info_item_key",children:[e,":"]}),Object(C.jsx)("span",{className:"lesson_info_item_value",children:Object.values(t)[n]})]})}))})},Notification:X}),le=function(e,t){var n=function(n){Object(h.a)(a,n);var i=Object(m.a)(a);function a(){return Object(u.a)(this,a),i.apply(this,arguments)}return Object(j.a)(a,[{key:"render",value:function(){return t?Object(C.jsx)(e,Object(d.a)({},this.props)):Object(C.jsx)(b.a,{to:"/login"})}}]),a}(s.a.Component);return n},de=(n(78),n(79),n(80),Object(l.b)((function(e){return{auth:e.app.auth,notify:e.notification}}),(function(e){return{login:function(t){return e(B.app.login(t))}}}))(function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).state={auth:!0},i}return Object(j.a)(n,[{key:"componentDidMount",value:function(){}},{key:"renderSwitch",value:function(){var e=this;return Object(C.jsx)(b.d,{children:re.map((function(t){var n=t.isPrivate?le(t.component,e.state.auth):t.component;return Object(C.jsx)(b.b,{exact:!0,path:t.path,component:n},t.path)}))})}},{key:"render",value:function(){return Object(C.jsx)(O.a,{children:Object(C.jsxs)(s.a.Fragment,{children:[Object(C.jsx)(oe.Header,{routes:re.filter((function(e){return e.isNavBar}))}),Object(C.jsx)("div",{id:"ui-content",children:this.renderSwitch()}),Object(C.jsx)(oe.Notification,Object(d.a)({},this.props.notify))]})})}}]),n}(s.a.Component)));o.a.render(Object(C.jsx)(l.a,{store:z,children:Object(C.jsx)(de,{})}),document.getElementById("root"))}},[[81,1,2]]]);
//# sourceMappingURL=main.98eaedd6.chunk.js.map