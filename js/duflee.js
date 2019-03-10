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
    $.ajax({
        url : "data/duflee.json",
        method : "GET",
        dataType : "json",
        success : function(articals){
            prikazArtikalaIndex(articals);
        },
        error : function(error){
            console.log("doslo je do greske" + error);
        }
    });
   

    $(".popUp").hide();
    ispisFutera();
    
   $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').stop();
        localStorage.setItem("brojac","Show");
        $lok = "index.html";
        window.open("http://localhost/Sajt/index.html", "_self");
    });
   ispisLiKorpa();
   $(".korpa").hide();
   document.getElementById("korpaIkonica").addEventListener("click", klikIkonica);

   document.getElementById("sort").addEventListener("change",sortiraj);
   document.getElementById("filter").addEventListener("change",filtriraj);
   document.getElementById("search").addEventListener("keyup",pretraga);
  
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

var torbe = sviJson();
function prikazArtikalaIndex(articals){
    var ispis = "";

    for(let artical of articals){
        ispis +=`<div class="bag1" id="bag" href = "#">
        <a>
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
    document.querySelector(".artikli").innerHTML = ispis;
    
    
    $(".bag1  .bag-show").hide();
    proba();
    $("#bag a .bag-show").click(function(e){
        e.preventDefault();
        popF($(this).attr("data-idp"))
        
    });
}
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
function popF(idp){
   
    $.ajax({
        url : "data/duflee.json",
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
           // alert(status);
        }
    });
}
var trenutno = "";
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
//korpaaaa
var ispisP = "";
function ispisLiKorpa(){
    var li = document.getElementById("liKorpa");
    var ispis = "";
    ispis += `<a><i class="fa fa-shopping-basket" id="korpaIkonica" aria-hidden="true">&nbsp;`; ispis+=`</i></a>`;
    li.innerHTML = ispis;
}
function klikIkonica(){
    let proizvodi = proizvodiUkorpi();
    console.log(proizvodi);
    if(!proizvodi.length)
    {
        var html = `<div class="praznaKorpa"><p>Cart is empty</p></div>`;
        document.querySelector(".korpaSadrzaj-center").innerHTML = html;
        document.querySelector(".cena").innerHTML = "<h3>Subtotal: <h3>" + 0 + " €</h3>";
    }
    else{
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
        ispisP +=
    `<div class="torba">
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
    document.querySelector(".cena").innerHTML = "<h3>Subtotal: <h3>" + cena + " €</h3>";
    
}
function brisanje(id) {
    let proizvodi = proizvodiUkorpi();
    let filtered = proizvodi.filter(p => p.id != id);
    
    localStorage.setItem("proizvodi", JSON.stringify(filtered));
    let noviP = proizvodiUkorpi();
    klikIkonica();
}
//korpa Funkcionalnosti


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



$(".ix").click(function(){
    $(".korpa").fadeOut("fast");
    document.getElementById("background").style.display = "none";
})
////////////////////////////////////////////////////////

function sortiraj(){
    let klik = this.value;
    if(klik == "priceUp"){
        torbe.sort((a,b) => b.cena.nova - a.cena.nova);      
    }
    prikazArtikalaIndex(torbe);
   
    if(klik == "priceDown"){
        torbe.sort((a,b) => a.cena.nova - b.cena.nova);      
    }
    prikazArtikalaIndex(torbe);

    if(klik == "a-z"){
        torbe.sort(function(a,b){
            if (a.naziv < b.naziv) 
            return -1 
        if (a.naziv > b.naziv)
            return 1
        return 0
        });
    }
    prikazArtikalaIndex(torbe);

    if(klik == "z-a"){
        torbe.sort(function(a,b){
            if (a.naziv > b.naziv) 
            return -1 
        if (a.naziv < b.naziv)
            return 1
        return 0
        });
    }
    prikazArtikalaIndex(torbe);
    
}
function filtriraj(){
    let klik = this.value;
    const filtriraniTorbe1 = torbe.filter(function(x){
        if(x.idVrsta == klik){
            return x;
        }
    });
    prikazArtikalaIndex(filtriraniTorbe1);
    const filtriraniTorbe2 = torbe.filter(function(x){
        if(x.idVrsta == klik){
            return x;
        }
    });
    prikazArtikalaIndex(filtriraniTorbe2);
    if("0" == klik){
        prikazArtikalaIndex(torbe);
    }
}
function pretraga(){
    const unos = this.value;
    var tbxSearch = document.getElementById("search");

    var regSrc = /^[A-z]{1,}(\s[A-z]{1,})*/;
    if(!regSrc.test(tbxSearch.value.trim())&&(tbxSearch.value.trim() != "")){
        tbxSearch.style.borderBottom = "2px solid red";
    }
    else{
        tbxSearch.style.borderBottom = "2px solid white";
    }
    const filtriraniNiz = torbe.filter( function(x) {
    if(x.naziv.toLowerCase().indexOf(unos.trim().toLowerCase()) != -1){
            return x;
        }
    });
  prikazArtikalaIndex(filtriraniNiz);
}
function sviJson(){
    return [
        {
            "id" : 7,
            "naziv" : "DUFLEE BAG ARMY GREEN",
            "slika" : {
                "src" : "images/Bags/torbe/zelenoVojnicka.jpg",
                "alt" : "CANVAS BACKPACK" 
            },
            "cena" : {
                "stara" : "95.00",
                "nova" : "85.50"
            },
            "idVrsta" : 4,
            "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
        },
        {
            "id" : 8,
            "naziv" : "DUFLEE BAG ARMY GREY",
            "slika" : {
                "src" : "images/Bags/torbe/sivoVojnicka.jpg",
                "alt" : "CANVAS BACKPACK" 
            },
            "cena" : {
                "stara" : "95.00",
                "nova" : "85.50"
            },
            "idVrsta" : 4,
            "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
        },
        {
            "id" : 9,
            "naziv" : "DUFLEE BAG GREY",
            "slika" : {
                "src" : "images/Bags/torbe/siva.jpg",
                "alt" : "CANVAS BACKPACK" 
            },
            "cena" : {
                "stara" : "95.00",
                "nova" : "85.50"
            },
            "idVrsta" : 4,
            "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
        }, {
            "id" : 10,
            "naziv" : "DUFLEE BAG RED",
            "slika" : {
                "src" : "images/Bags/torbe/crvena.jpg",
                "alt" : "CANVAS BACKPACK" 
            },
            "cena" : {
                "stara" : "95.00",
                "nova" : "85.50"
            },
            "idVrsta" : 4,
            "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
        }, {
            "id" : 11,
            "naziv" : "DUFLEE BAG YELLOW",
            "slika" : {
                "src" : "images/Bags/torbe/krem.jpg",
                "alt" : "CANVAS BACKPACK" 
            },
            "cena" : {
                "stara" : "95.00",
                "nova" : "85.50"
            },
            "idVrsta" : 4,
            "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
        },
        {
            "id" : 12,
            "naziv" : "DUFLEE BAG BLUE",
            "slika" : {
                "src" : "images/Bags/torbe/plava.jpg",
                "alt" : "CANVAS BACKPACK" 
            },
            "cena" : {
                "stara" : "95.00",
                "nova" : "85.50"
            },
            "idVrsta" : 4,
            "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
        }
    ]
}