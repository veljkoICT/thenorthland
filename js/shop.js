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
        url : "data/shop.json",
        method : "GET",
        dataType : "json",
        success : function(articals){
           
            prikazArtikalaIndex(articals);
            
        },
        error : function(error){
            console.log("doslo je do greske" + error);
        }
    });
    $.ajax({
        url : "data/shop.json",
        method : "GET",
        dataType : "json",
        success : function(articals){
           
           newArtcals(articals);
            
        },
        error : function(error){
            console.log("doslo je do greske" + error);
        }
    });

    $(".popUp").hide();
    ispisFutera();
   // $(".cbx1").clic(function())
   $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').stop();
        localStorage.setItem("brojac","Show");

        //var getitem = window.localStorage.getItem("brojac");
        //alert(getitem);
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
var torbe2 = JSONpretraga();
function prikazArtikalaIndex(articals){
    var ispis = "";

   
        for(let artical of articals.canvas){
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
        for(let artical of articals.rancevi){
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
        for(let artical of articals.ruksak){
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
        for(let artical of articals.torbe){
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
function showWiews(){
    $(".block").hover(
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
        url : "data/shop.json",
        method : "GET",
        dataType : "json",
        success : function(data) {
            //alert("radi")
            var proizvod;


            for(p of data.canvas){
                    if(p.id == idp){
                        proizvod = p;
                        break;
                    }
            }
            for(p of data.rancevi){
                if(p.id == idp){
                    proizvod = p;
                    break;
                }
            }
            for(p of data.ruksak){
                if(p.id == idp){
                    proizvod = p;
                    break;
                }
            }
            for(p of data.torbe){
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

    //////////
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
function newArtcals(articals){
    var ispis = "";

    for(let artical of articals.canvas){
        if(artical.new == "yes"){
            ispis +=`<div class="block" id="bag" href = "#">
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
    }
    for(let artical of articals.rancevi){
        if(artical.new == "yes"){
            ispis +=`<div class="block" id="bag" href = "#">
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
    }
    for(let artical of articals.ruksak){
        if(artical.new == "yes"){
            ispis +=`<div class="block" id="bag" href = "#">
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
    }
    for(let artical of articals.torbe){
        if(artical.new == "yes"){
            ispis +=`<div class="block" id="bag" href = "#">
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
    }
    document.querySelector(".gallery-center").innerHTML = ispis;

    $(".block  .bag-show").hide();
    showWiews();
    $("#bag a .bag-show").click(function(e){
        e.preventDefault();
        
        popF($(this).attr("data-idp"))
        
    });

    /*slick*/
$('.gallery-center').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000
  });  
}

function ispisLiKorpa(){
    var li = document.getElementById("liKorpa");
    var ispis = "";
    ispis += `<a><i class="fa fa-shopping-basket" id="korpaIkonica" aria-hidden="true">&nbsp;`; ispis+=`</i></a>`;
    li.innerHTML = ispis;
}
function klikIkonica(){
    let proizvodi = proizvodiUkorpi();
    if(!proizvodi.length)
    {
        var html = `<div class="praznaKorpa"><p>Cart is empty</p></div>`;
        document.querySelector(".korpaSadrzaj-center").innerHTML = html;
    }
    else{
        // alert("bice proizvoda!");
        prikaziProizvode();
    }
    document.getElementById("background").style.display = "block";
    $(".korpa").fadeIn("fast");
} 

var ispisP = "";
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
//////korpa
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

/////korpa
$(".ix").click(function(){
    $(".korpa").fadeOut("fast");
    document.getElementById("background").style.display = "none";
})
////////////////////////////////////////////////////////

function sortiraj(){
    let klik = this.value;
    if(klik == "priceUp"){
        torbe2.sort((a,b) => b.cena.nova - a.cena.nova);    
       
    }
    
    ispisivanjeFilter(torbe2);
    //cenadole
    
    if(klik == "priceDown"){
        torbe2.sort((a,b) => a.cena.nova - b.cena.nova);      
    }
    
    ispisivanjeFilter(torbe2);
    ///

    if(klik == "a-z"){
        torbe2.sort(function(a,b){
            if (a.naziv < b.naziv) 
            return -1 
        if (a.naziv > b.naziv)
            return 1
        return 0
        });
    }
   
    
    ispisivanjeFilter(torbe2);
    //////

    if(klik == "z-a"){
        torbe2.sort(function(a,b){
            if (a.naziv > b.naziv) 
            return -1 
        if (a.naziv < b.naziv)
            return 1
        return 0
        });
    }
   
    ispisivanjeFilter(torbe2);
    
}
function filtriraj(){
    let klik = this.value;
    if(klik == 1){
        const filtriraniTorbe1 = torbe.canvas.filter(function(x){
            if(x.idVrsta == klik){
                return x;
            }
        });
        ispisivanjeFilter(filtriraniTorbe1);
    }
    if(klik == 2){
        const filtriraniTorbe2 = torbe.rancevi.filter(function(x){
            if(x.idVrsta == klik){
                return x;
            }
        });
        ispisivanjeFilter(filtriraniTorbe2);
    }
    if(klik == 3){
        const filtriraniTorbe3 = torbe.ruksak.filter(function(x){
            if(x.idVrsta == klik){
                return x;
            }
        });
        ispisivanjeFilter(filtriraniTorbe3);
    }
    if(klik == 4){
        const filtriraniTorbe4 = torbe.torbe.filter(function(x){
            if(x.idVrsta == klik){
                return x;
            }
        });
        ispisivanjeFilter(filtriraniTorbe4);
    }
    // if("0" == klik){
    //     ispisivanjeFilter(torbe);
    // }
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
    const filtriraniNiz = torbe2.filter( function(x) {
    if(x.naziv.toLowerCase().indexOf(unos.trim().toLowerCase()) != -1){
            return x;
        }
    });
  prikazArtikalaIndex2(filtriraniNiz);
}
function prikazArtikalaIndex2(articals){
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
function sviJson(){
    return{
        "canvas" : 
        [
            {
                "new" : "no",
                "id" : 1,
                "naziv" : "CANVAS BACKPACK BLUE",
                "slika" : {
                    "src" : "images/Bags/Sbags/plava.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "75.00",
                    "nova" : "67.50"
                },
                "idVrsta" : 1,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 2,
                "naziv" : "CANVAS BACKPACK GREY",
                "slika" : {
                    "src" : "images/Bags/Sbags/siva.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "75.00",
                    "nova" : "67.50"
                },
                "idVrsta" : 1
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 3,
                "naziv" : "CANVAS BACKPACK BROWN",
                "slika" : {
                    "src" : "images/Bags/Sbags/braon.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "75.00",
                    "nova" : "67.50"
                },
                "idVrsta" : 1
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }
        ],
        "rancevi" : 
        [
            {
                "new" : "yes",
                "id" : 4,
                "naziv" : "CAMO BACKPACK",
                "slika" : {
                    "src" : "images/Bags/ranac/crni.jpg",
                    "alt" : "CAMO BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "76.50"
                },
                "idVrsta" : 2
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "yes",
                "id" : 5,
                "naziv" : "CAMO BACKPACK BLACK",
                "slika" : {
                    "src" : "images/Bags/ranac/sivoVojnicki.jpg",
                    "alt" : "CAMO BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "76.50"
                },
                "idVrsta" : 2
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 6,
                "naziv" : "CAMO BACKPACK",
                "slika" : {
                    "src" : "images/Bags/ranac/zeleni.jpg",
                    "alt" : "CAMO BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "76.50"
                },
                "idVrsta" : 2
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }
        ],
        "ruksak" : 
        [
            {
                "new" : "yes",
                "id" : 13,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak1.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 14,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak2.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 15,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak3.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }, 
            {
                "new" : "no",
                "id" : 16,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak4.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }, 
            {   
                "new" : "no",
                "id" : 17,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak5.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            { 
                "new" : "no",
                "id" : 18,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak6.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }
        ],
        "torbe" : 
        [
            {
                "new" : "yes",
                "id" : 7,
                "naziv" : "DUFLEE BAG ARMY GREEN",
                "slika" : {
                    "src" : "images/Bags/torbe/zelenoVojnicka.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "5.50"
                },
                "idVrsta" : 4,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
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
                "new" : "yes",
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
            }, 
            {
                "new" : "no",
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
            },
             {
                "new" : "yes",
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
                "new" : "no",
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
}
function JSONpretraga(){
    return [
            {
                "new" : "no",
                "id" : 1,
                "naziv" : "CANVAS BACKPACK BLUE",
                "slika" : {
                    "src" : "images/Bags/Sbags/plava.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "75.00",
                    "nova" : "67.50"
                },
                "idVrsta" : 1,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 2,
                "naziv" : "CANVAS BACKPACK GREY",
                "slika" : {
                    "src" : "images/Bags/Sbags/siva.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "75.00",
                    "nova" : "67.50"
                },
                "idVrsta" : 1
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 3,
                "naziv" : "CANVAS BACKPACK BROWN",
                "slika" : {
                    "src" : "images/Bags/Sbags/braon.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "75.00",
                    "nova" : "67.50"
                },
                "idVrsta" : 1
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "yes",
                "id" : 4,
                "naziv" : "CAMO BACKPACK",
                "slika" : {
                    "src" : "images/Bags/ranac/crni.jpg",
                    "alt" : "CAMO BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "76.50"
                },
                "idVrsta" : 2
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "yes",
                "id" : 5,
                "naziv" : "CAMO BACKPACK BLACK",
                "slika" : {
                    "src" : "images/Bags/ranac/sivoVojnicki.jpg",
                    "alt" : "CAMO BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "76.50"
                },
                "idVrsta" : 2
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 6,
                "naziv" : "CAMO BACKPACK",
                "slika" : {
                    "src" : "images/Bags/ranac/zeleni.jpg",
                    "alt" : "CAMO BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "76.50"
                },
                "idVrsta" : 2
                ,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "yes",
                "id" : 13,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak1.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 14,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak2.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
                "id" : 15,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak3.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }, 
            {
                "new" : "no",
                "id" : 16,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak4.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            }, 
            {   
                "new" : "no",
                "id" : 17,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak5.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            { 
                "new" : "no",
                "id" : 18,
                "naziv" : "TEHNICAL PACKS",
                "slika" : {
                    "src" : "images/Bags/ruksak/ruksak6.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "85.50"
                },
                "idVrsta" : 3,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "yes",
                "id" : 7,
                "naziv" : "DUFLEE BAG ARMY GREEN",
                "slika" : {
                    "src" : "images/Bags/torbe/zelenoVojnicka.jpg",
                    "alt" : "CANVAS BACKPACK" 
                },
                "cena" : {
                    "stara" : "95.00",
                    "nova" : "5.50"
                },
                "idVrsta" : 4,
                "opis" : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty."
            },
            {
                "new" : "no",
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
                "new" : "yes",
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
            }, 
            {
                "new" : "no",
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
            },
             {
                "new" : "yes",
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
                "new" : "no",
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
function ispisivanjeFilter(articals){
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
