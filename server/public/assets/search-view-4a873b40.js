import{_ as f,o as c,c as h,a as l,n as w,r as p,b as m,t as u,d as _,e as y,F as g}from"./index-8b50b40d.js";const $={name:"download-progress",watch:{downInfo(t,e){if(t){let{dowhat:o,info:i}=t;switch(o){case"updateDownInfo":this.updateDownInfo(i);break;case"completeDownInfo":this.completeDownInfo(i);break}}}},props:{downInfo:{type:Object,default:null}},data(){return{progress:null,textContent:null}},methods:{updateDownInfo(t){let{filesize:e,progress:o,cn:i,speed:a,eta:n,data:r}=t;this.progress=o;let d=[e,o,a].reduce((v,b)=>String(v).concat(" ",b),"");this.textContent=d},completeDownInfo(t){this.progress=null}}},D={class:"progress"},A=["textContent"];function C(t,e,o,i,a,n){return c(),h("div",D,[l("div",{ref:"progressDIV",textContent:this.textContent,style:w({width:this.progress}),class:"progress-bar bg-success"},null,12,A)])}const k=f($,[["render",C]]),V={name:"video-list",components:{DownloadProgress:k},props:{videoList:{type:Object,default:{}},defaultauthor:{type:String,default:""},scrollVid:{type:String,default:null},messageDownload:{type:Object,default:null}},watch:{scrollVid(t,e){if(t){let o=this.$refs[t];Array.isArray(o)&&o[0].scrollIntoView({behavior:"smooth"})}},messageDownload(t,e){if(t){let{dowhat:o,info:i,vid:a}=t;switch(this.downvid=a,this.downInfo={dowhat:o,info:i},o){case"completeDownInfo":this.downvid=null;break}}}},data(){return{prehost:"http://localhost:16206/",downvid:null,downInfo:null}},methods:{showDownInfo(t){return this.downvid===t},getRefProgress(t){return String(t).concat("progress")},fetchOpen(t){let e=`${this.prehost}open/${t}`;fetch(e).then()},fetchNoticeMP4(t){let e={vid:t,playlist:null},o=`${this.prehost}notice/mp4`,i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};fetch(o,i).then()},fetchVideoDelete(t,e,o){delete this.videoList[t],this.$emit("delete-vid",t),Object.keys(this.videoList).length===0&&(this.$emit("go-allauthor",this.defaultauthor),this.$emit("delete-author",e));let a={vid:t,withfile:o},n=`${this.prehost}video/`,r={method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)};fetch(n,r).then()},copyText(t){window.navigator.clipboard.writeText(t)}}},T=["id"],L={class:"my-3"},x=l("button",{class:"btn disabled"}," info ",-1),S={class:"btn disabled"},I=["onClick"],O=["onClick"],j=["onClick"],N=["onClick"],P={class:"my-3"},B=l("button",{class:"btn disabled"}," open ",-1),z=["onClick"],F={class:"my-3"},G=l("button",{class:"btn disabled"}," delete ",-1),J=["onClick"],M=["onClick"];function R(t,e,o,i,a,n){const r=p("DownloadProgress");return c(!0),h(g,null,m(this.videoList,s=>(c(),h("div",{class:"row border my-3",key:s.vid,id:s.vid,ref_for:!0,ref:s.vid},[l("div",L,[x,l("button",S,u(s.quality),1),l("button",{class:"btn btn-outline-info",onClick:d=>n.copyText(s.title)},"title ",8,I),l("button",{class:"btn btn-outline-info",onClick:d=>n.copyText(s.description)},"description ",8,O),l("button",{class:"btn btn-outline-info",onClick:d=>n.copyText(s.vlink)},"video link ",8,j),l("button",{class:"btn btn-outline-info",onClick:d=>n.fetchNoticeMP4(s.vid)},"redownload ",8,N)]),this.showDownInfo(s.vid)?(c(),h("div",{key:0,class:"my-3",ref_for:!0,ref:this.getRefProgress(s.vid)},[_(r,{downInfo:this.downInfo},null,8,["downInfo"])],512)):y("",!0),l("div",P,[B,l("button",{onClick:d=>n.fetchOpen(s.vid),class:"btn btn-outline-primary"},u(s.title),9,z)]),l("div",F,[G,l("button",{class:"btn btn-outline-danger",onClick:d=>n.fetchVideoDelete(s.vid,s.author,!1)},"video data ",8,J),l("button",{class:"btn btn-outline-danger",onClick:d=>n.fetchVideoDelete(s.vid,s.author,!0)}," video data and file ",8,M)])],8,T))),128)}const q=f(V,[["render",R]]),E={name:"search-nav",components:{VideoList:q},props:{messageSearch:{type:Object,default:null},messageDownload:{type:Object,default:null}},watch:{async messageSearch(t,e){if(t){let{dowhat:o,info:i}=t;switch(o){case"fetchAllAuthor":await this.fetchAllAuthor();break;case"fetchAuthorVideo":await this.fetchAllAuthor();let{author:a,vid:n}=i;await this.fetchAuthorVideo(a),await new Promise(r=>setTimeout(r,16)),this.scrollVid=n;break}}}},data(){return{prehost:"http://localhost:16206/",defaultauthor:"All Author",authorList:{},videoList:{},searchType:!0,searchTypText:"author",scrollVid:null}},methods:{titleChange(t){this.videoList=null;let e=t.target.value;if(e.length>0){let o=`${this.prehost}video/title/${e}`;fetch(o).then(i=>i.json()).then(i=>{this.videoList=i})}},changeSearchType(){this.searchType=!this.searchType,this.searchTypText=this.searchType?"author":"title",this.videoList=null},deleteVid(t){delete this.videoList[t]},deleteAuthor(t){delete this.authorList[t];let e=`${this.prehost}notice/fetchallauthor`;fetch(e)},goAllAuthor(t){this.$refs.selectOnAuthor.value=t},async fetchAllAuthor(){let t=`${this.prehost}video/authors`,o=await(await fetch(t)).json();this.authorList=o},async fetchAuthorVideo(t){this.$refs.selectOnAuthor.value=t;let e=`${this.prehost}video/author/${t}`,i=await(await fetch(e)).json();this.videoList=i},authorChange(t){let e=t.target.value;e.includes(this.defaultauthor)?this.videoList=null:this.fetchAuthorVideo(e)}},async created(){await this.fetchAllAuthor()}},H={class:"row my-3"},K={class:"col-auto"},Q={class:"btn btn-secondary disabled"},U={key:0,class:"col-auto"},W=["value"],X=["value"],Y={key:1,class:"col-auto"},Z={for:"vtitle"};function tt(t,e,o,i,a,n){const r=p("VideoList");return c(),h("div",null,[l("div",H,[l("div",K,[l("button",{onClick:e[0]||(e[0]=(...s)=>n.changeSearchType&&n.changeSearchType(...s)),class:"btn btn-outline-primary"},"search "),l("button",Q,u(this.searchTypText),1)]),a.searchType?(c(),h("div",U,[l("select",{ref:"selectOnAuthor",class:"form-select","aria-label":"Default select example",onChange:e[1]||(e[1]=(...s)=>n.authorChange&&n.authorChange(...s))},[l("option",{selected:"",value:this.defaultauthor},u(this.defaultauthor),9,W),(c(!0),h(g,null,m(this.authorList,s=>(c(),h("option",{value:s,key:s},u(s),9,X))),128))],544)])):(c(),h("div",Y,[l("label",Z,[l("input",{onInput:e[2]||(e[2]=(...s)=>n.titleChange&&n.titleChange(...s)),class:"form-control",id:"vtitle",type:"text",placeholder:"type title to search"},null,32)])]))]),_(r,{videoList:this.videoList,defaultauthor:this.defaultauthor,scrollVid:this.scrollVid,messageDownload:this.messageDownload,onDeleteVid:n.deleteVid,onGoAllauthor:n.goAllAuthor,onDeleteAuthor:n.deleteAuthor},null,8,["videoList","defaultauthor","scrollVid","messageDownload","onDeleteVid","onGoAllauthor","onDeleteAuthor"])])}const et=f(E,[["render",tt]]),st={name:"search-view",components:{SearchNav:et},props:{messageSearch:{type:Object,default:null},messageDownload:{type:Object,default:null}},methods:{}},ot={class:"container-fluid"};function nt(t,e,o,i,a,n){const r=p("SearchNav");return c(),h("div",ot,[_(r,{messageSearch:this.messageSearch,messageDownload:this.messageDownload},null,8,["messageSearch","messageDownload"])])}const it=f(st,[["render",nt]]);export{it as default};
