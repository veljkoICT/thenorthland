window.onload = function(){
    $("#ok .hide ul").hide();
    $("#ok .hide").hover(
        function() {
            $("#ok .hide").find('ul').stop(true, true).slideDown();
        },
        function() {
            $("#ok .hide").find('ul').stop(true, true).slideUp();
        }
    );

    let modul = Articals();
    modul.getArticles();

    ispisrow3();
    $(".popUp").hide();
    ispisFutera();
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').stop();
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
         }, 1000);
    });
    $('.nav-logo').click(function(){ 
        $('html').animate({
            scrollTop: 0
        }, 1000);
    });
    var getData = localStorage.getItem("brojac");
    if(getData == "Show"){
        $('html, body').stop();
        $('html, body').animate({
        scrollTop: $("#row5").offset().top- $(window).height() + 1200
        }, 1000);
        localStorage.setItem("brojac","dontShow");
        console.log(getData);
    }
    
    document.getElementById("dugmeF").addEventListener("click" , proveraForme);
    ispisLiKorpa();
    $(".korpa").hide();
    document.getElementById("korpaIkonica").addEventListener("click", klikIkonica);
    document.querySelector(".ix").addEventListener("click",zatvoriKorpu);

   
}
$(".bulet").click(function(){
    $(".navigacijaResponsive").slideToggle("fast");
    
    $(".navigacijaResponsive ul .line .hide ul").hide();
    $(".navigacijaResponsive ul .line span").click(
        function() {
            $(".navigacijaResponsive ul .line .hide").find('ul').stop(true, true).slideToggle();
        }
    );
    document.getElementById("korpaIkonica2").addEventListener("click", klikIkonica2);
    
    function klikIkonica2(){
        let proizvodi = proizvodiUkorpi();
        if(!proizvodi.length)
        {
            var html = `<div class="praznaKorpa"><p>Cart is empty</p></div>`;
            document.querySelector(".korpaSadrzaj-center").innerHTML = html;
            document.querySelector(".cena").innerHTML = "<h3>Subtotal: <h3>" + 0 + " €</h3>";
        }
        else{
            // alert("bice proizvoda!");
            prikaziProizvode();
        }
        document.getElementById("background").style.display = "block";
        $(".korpa").fadeIn("fast"); 
       
    }
    $(this).css("display","none");
    $(".close").css("display","block");
});
$(".close").click(function(){   $(".navigacijaResponsive").slideToggle("fast"); $(".bulet").css("display","block");  $(this).css("display","none");})

$(".navigacijaResponsive ul li").click(function(){ $(".navigacijaResponsive").fadeOut("fast");})
var trenutno = "";
function proba(){
    $(".bag1").hover(
        function() {
            $(this).find('.bag-txt').stop(true, true).hide();
            $(this).find('.bag-show').stop(true, true).fadeIn();
        },
        function() {
            $(this).find('.bag-txt').stop(true, true).fadeIn();
            $(this).find('.bag-show').stop(true, true).hide();
        }
    );
}
function ispisrow3(){
    var nizP = [
        'BACKPACKS',
        'DUFLEE BAGS',
        'TRAVEL PACKS'
    ];
    var nizHref = [
        "backpack.html","torba.html","ruksak.html"
    ];
    var x = 0;
    var ispis = "";
    for(let i = 0; i < 3; i++){
        ispis += `<div class="row3-img${++x}"><a href = "${nizHref[i]}"><div class="back"><p>${nizP[i]}</p></div></a></div>`;
    }
    document.getElementById("row3").innerHTML = ispis;
}
//poiuy
function popF(idp){  
    $.ajax({
        url : "data/indexBags.json",
        method : "GET",
        dataType : "json",
        success : function(data) {
            //alert("radi")
            var proizvod;
            for(p of data){
                if(p.id == idp){
                    proizvod = p;
                    break;
                }
            }
            //alert(proizvod.naziv)
            prikaziPop(proizvod); 
        },
        error : function(xhr, error, status) {
            //alert(status);
        }
    });
}
function prikaziPop(d){
    var ispis = "";   
    ispis += `
    <div class="img-pop">
        <img src="${d.slika.src}" alt="ranac"/>
    </div>
     <div class="txt-pop">
                <p class="txt-nas">${d.naziv}</p>
                <p class="txt-nova">${d.cena.nova}</p>
                <p class="txt-stara">${d.cena.stara}</p>
                <p class="txt-opis">${d.opis}</p>
                <input type="button" value="ADD TO CART" class="dugmePop" data-id="${d.id}">          
    </div>  
    <div class="popX" >
                <i class="fa fa-close"></i>
     </div>
    `;   
    document.querySelector(".popUp").innerHTML = ispis;
    document.getElementById("background").style.display = "block";
    $(".popUp").fadeIn("fast");
    $(".popUp .popX").click(function(){
        document.getElementById("background").style.display = "none";
        $(".popUp").fadeOut("fast");
    });   
    dogadjajDugme();
}
//dogadjaj na dugme
function proizvodiUkorpi() {
    return JSON.parse(localStorage.getItem("proizvodi"));
}
function dogadjajDugme(){
    $(".dugmePop").click(dodajUkorpu);
    
}
function dodajUkorpu(){
    let id = $(this).data("id");//dohvata +
    var proizvodi = proizvodiUkorpi(); 
    if(proizvodi){
        if(proizvodPostojiUkorpi()) {
            povecajKolicinu();
        }else {
            dodajUlocal()
        }
    }else {
        dodajPrviObjekatUkorpu();
    } 
    function proizvodPostojiUkorpi() {
        return proizvodi.filter(p => p.id == id).length;
    }
    function dodajUlocal() {
        let proizvodi = proizvodiUkorpi();
        proizvodi.push({
            id : id,
            kolicina : 1
        });
        localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }
    function povecajKolicinu() {
        let proizvodi = proizvodiUkorpi();// dohvata local storidz
        for(let i in proizvodi)
        {
            if(proizvodi[i].id == id) {
                proizvodi[i].kolicina++;
                break;
            }      
        }
        localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }
    function dodajPrviObjekatUkorpu() {
        let proizvodi = [];
        proizvodi[0] = {
            id : id,
            kolicina : 1
        };
        localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }
    document.getElementById("background").style.display = "none";
    $(".popUp").fadeOut("fast");
    klikIkonica();
}

function ispisFutera(){
    ispisAbout();
    topNav();
    topProducts();
}
function ispisAbout(){
    var niz = [
        "SRB:+381 25551444",
        "UK:­+44 (20) 7712 1502",
        "thenorthpole@gmail.com",
        "Moše Pijade 8a",
        "Abot THENORTHPOLE"
    ];
    var ispis = " <ul class='about'>";
    for(let i of niz){
        ispis +=`
           <li>${i}</li>
        `;
    }
    ispis +=`</ul>`;
    document.querySelector(".abou-list").innerHTML = ispis;
}
function topNav(){
    var niz = [
        "<a href='index.html'>HOME</a>",
        "<a href='shop.html.html'>SHOP</a>",
        "<a href='#'>ABOUT</a>",
        "<a href='#'>AUTOR</a>",
        "<a href='#'>CONTACT</a>"
    ];
    var ispis = " <ul class='topNav'>";
    for(let i of niz){
        ispis +=`
           <li>${i}</li>
        `;
    }
    ispis +=`</ul>`;
    document.querySelector(".top-nav").innerHTML = ispis;
}
function topProducts(){
    var niz = [
        "<a href='backpack.html'>BACKPACKS</a>",
        "<a href='torba.html'>DUFLE BAGS</a>",
        "<a href='ruksak.html'>TRAVEL PACKS</a>"
    ];
    var ispis = " <ul class='topProducts'>";
    for(let i of niz){
        ispis +=`
           <li>${i}</li>
        `;
    }
    ispis +=`</ul>`;

    var niz2 = [
        
        "Sitemap",
        "Robots",
        "Doc"
    ];
    ispis += " <ul class='topProductsUl2'>";
    for(let i of niz2){
        ispis +=`
           <li>${i}</li>
        `;
    }
    ispis +=`</ul>`;
    document.querySelector(".top-products").innerHTML = ispis;
}
var nizGreske = [];
function proveraForme(){
    
    proveraIme();
    proveraMail();
    proveraSub();
    proveraTxt();
    if(nizGreske.length == 0){
        $(".popT").fadeIn("fast");
        setTimeout(function(){
            $(".popT").fadeOut("fast");
        },1000);
       
    }
    nizGreske = []
    console.log(nizGreske);
}

function proveraIme(){
    var tbxIme = document.getElementById("tbxName");
    var regIme = /^[A-Z][a-z]{3,}(\s[A-Z][a-z]{3,})$/; 
    if(!regIme.test(tbxIme.value)){
        document.querySelector("#tbxName").value = "";
        document.querySelector("#tbxName").style.backgroundColor = "white";
        document.querySelector("#tbxName").placeholder = "Wrong format for name...";
        document.querySelector("#tbxName").classList.add("placeholderred");
        nizGreske.push("1");
    }
    else{
        document.querySelector("#tbxName").style.backgroundColor = "rgba(56, 56, 56, 0.55)";
        document.querySelector("#tbxName").classList.remove("placeholderred");
    }
}
function proveraMail(){
    var tbxMail = document.getElementById("tbxMail");
    var regMejl =  /^(\w|\d)\S*@\S+\.(\w|\d){2,}$/;
    if(!regMejl.test(tbxMail.value)){
       
        document.querySelector("#tbxMail").value = "";
        document.querySelector("#tbxMail").style.backgroundColor = "white";
        document.querySelector("#tbxMail").placeholder = "Wrong format for mail...";
        document.querySelector("#tbxMail").classList.add("placeholderred");
        nizGreske.push("1");
    }
    else{
        document.querySelector("#tbxMail").style.backgroundColor = "rgba(56, 56, 56, 0.55)";
        document.querySelector("#tbxMail").classList.remove("placeholderred");
    }
}
function proveraSub(){
    var tbxsub = document.getElementById("tbxSub");
    var regSub =  /^[A-Z][a-z]{3,}(\s[A-z]{3,})*$/;
    if(!regSub.test(tbxsub.value)){
        document.querySelector("#tbxSub").value = "";
        document.querySelector("#tbxSub").style.backgroundColor = "white";
        document.querySelector("#tbxSub").placeholder = "Wrong format for subject...";
        document.querySelector("#tbxSub").classList.add("placeholderred");
        nizGreske.push("1");
    }
    else{
        document.querySelector("#tbxSub").style.backgroundColor = "rgba(56, 56, 56, 0.55)";
        document.querySelector("#tbxSub").classList.remove("placeholderred");
    }
}
function proveraTxt(){
    var txt = document.getElementById("message");
    var reg =  /^\w+\d*\W*\s*/;
    if(!reg.test(txt.value)){
        document.querySelector("#message").value = "";
        document.querySelector("#message").style.backgroundColor = "white";
        document.querySelector("#message").placeholder = "Wrong format for message...";
        document.querySelector("#message").classList.add("placeholderred");
    }
    else{
        document.querySelector("#message").style.backgroundColor = "rgba(56, 56, 56, 0.55)";
        document.querySelector("#message").classList.remove("placeholderred");
    }
}
//korpaaaa
var ispisP = "";
function ispisLiKorpa(){
    var li = document.getElementById("liKorpa");
    var ispis = "";
   
    ispis += `<a><i class="fa fa-shopping-basket" id="korpaIkonica" aria-hidden="true">&nbsp;`;  ispis+=`</i></a>`;
    li.innerHTML = ispis;
}
function klikIkonica(){
    let proizvodi = proizvodiUkorpi();
    if(!proizvodi.length)
    {
        var html = `<div class="praznaKorpa"><p>Cart is empty</p></div>`;
        document.querySelector(".korpaSadrzaj-center").innerHTML = html;
        document.querySelector(".cena").innerHTML = "<h3>Subtotal: <h3>" + 0 + " €</h3>";
    }
    else{
        // alert("bice proizvoda!");
        prikaziProizvode();
    }
    document.getElementById("background").style.display = "block";
    $(".korpa").fadeIn("fast"); 
   
} 
function prikaziProizvode(){
    let proizvodi = proizvodiUkorpi();

    $.ajax({
        url : "data/korpaJSON.json",
        success : function(data) {
            data = data.filter(p => {
                for(let prod of proizvodi)
                {
                    if(p.id == prod.id) {
                        p.kolicina = prod.kolicina;
                        return true;
                    }
                        
                }
                return false;
            });
            popuniKorpu(data);//funkcija za ispis u korpi
        }
    });
}
function zatvoriKorpu(){
    $(".korpa").fadeOut("fast");
    document.getElementById("background").style.display = "none";
}
function popuniKorpu(data){
    let cena = 0;
    for(let p of data){
        ispisP +=`<div class="torba">
    <div class="slika">
        <img src="${p.slika.src}"/>
    </div>
    <div class="tekst">
        <span class="naslov"><p class="torbaNasl">${p.naziv}</p> <i class="fa fa-close" class="izbrisiKorpa" data-idx="${p.id}" onClick="brisanje(${p.id})"></i></span>
        <p class="kolicina">QT: ${p.kolicina}</p>
        <span class="cenaN">${p.cena.nova * p.kolicina} &euro;</span>
    </div>
    </div>`;
    cena += (p.cena.nova) * (p.kolicina);

    }
    document.querySelector(".korpaSadrzaj-center").innerHTML = ispisP;
    ispisP="";
    document.querySelector(".cena").innerHTML = "<h3>Subtotal: <h3>" + cena + " €</h3>";; 
    
    
}
function brisanje(id) {
    let proizvodi = proizvodiUkorpi();
    let filtered = proizvodi.filter(p => p.id != id);
    
    localStorage.setItem("proizvodi", JSON.stringify(filtered));
    let noviP = proizvodiUkorpi();
    klikIkonica();
}
//korpa Funkcionalnosti

function Articals(){
    // let niz = [];
    function getArticles() {
        $.ajax({
            url : "data/indexBags.json",
            method : "GET",
            dataType : "json",
            success : function(articals){
                prikazArtikala(articals);
            },
            error : function(error){
                console.log("doslo je do greske" + error);
            }
        });
    }
    function prikazArtikala(articals){
        var ispis = "";
        for(let artical of articals){
            ispis +=`<div class="bag1" id="bag" href = "#">
            <a href = "#">
            <img src="${artical.slika.src}" alt="${artical.slika.alt}">
            <div class="bag-txt">
                <p>${artical.naziv}</p>
                <span class="bag-oldPrice">${artical.cena.stara} &euro;</span>
                <span class="bag-price">${artical.cena.nova} &euro;</span>
            </div>
            <div class="bag-show" data-idp = "${artical.id}">
                <p>VIEW DETAILS</p>
            </div>
            </a>
            </div>`;
        }
        document.querySelector(".row4-bags").innerHTML = ispis;
        $(".bag1 .bag-show").hide();
        proba();
        $("#bag a .bag-show").click(function(e){
            e.preventDefault();
            popF($(this).attr("data-idp"))
        });
    }
    return {getArticles};
}