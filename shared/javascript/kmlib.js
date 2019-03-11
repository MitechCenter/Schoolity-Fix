/*
Mượn ý từ w3schools
https://www.w3schools.com/howto/howto_html_include.asp
*/

function includeHTML(tag) {
    var x, i, k, e, file;
    x = document.getElementsByTagName(tag);//"div");
    k = x.length;
    var getHTML=(e,file)=> {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { e.innerHTML = this.responseText; }
                e.removeAttribute("km-include-html");
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        }

    for (i = 0; i < k; i++) {
        e = x[i];
        file = e.getAttribute("km-include-html");
        if (file) getHTML(e,file);
        }
}
    document.addEventListener('readystatechange', () => {includeHTML("footer");});
    document.addEventListener('DOMContentLoaded', () => {includeHTML("div");includeHTML("header");});
    //document.addEventListener('DOMContentLoaded', () => {includeHTML("div");includeHTML("header");includeHTML("footer");});
    //document.addEventListener('load', () => {includeHTML("div");includeHTML("header");includeHTML("footer");});


function popupKM(url,title,left=0,top=0,width=0,height=0) 
{
 // tinh default

 if(width==0) width  = 800;
 if(height==0) height = 500;
 if(left==0) left   = (screen.width  - width)/2;
 if(top==0) top    = (screen.height - height)/2;


 var params = 'width='+width+', height='+height;
 params += ', top='+top+', left='+left;
 params += ', directories=no';
 //params += ', location=no';
 params += ', location=0';
 params += ', menubar=no';
 params += ', resizable=no';
 //params += ', scrollbars=no';
 params += ', scrollbars=no';
 params += ', status=no';
 params += ', toolbar=no';
 // "width=420,height=230,resizable,scrollbars=yes,status=1"
 frm=window.open(url,title, params);
 if (window.focus) {frm.focus()}
 return false;
}
function popupAdd(url, title=null) 
{
    if(title == null)    title = "Thêm";
    
    popupKM(url,title) ;
}
function popupEdit(url,title=null) 
{
    if(title == null)    title = "Sửa";
    
    popupKM(url,title) ;
}

    /*
    document.addEventListener('readystatechange', () => console.log("!!!"+ document.readyState));
    
    //console.log(document.readyState);
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOMContentLoaded"); 
        console.log(document.readyState);
        //alert("2222");
        //includeHTML();
    });
    window.document.onload = function(e){ 
       }
    window.onload = function(e){ 
        console.log("window.onload"); 
        console.log(document.readyState);
        //includeHTML();
    }
    //includeHTML();

    */