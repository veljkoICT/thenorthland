window.onload = function(){
    ispisFutera();
    $("#ok .hide ul").hide();
    $("#ok .hide").hover(
        function() {
            $("#ok .hide").find('ul').stop(true, true).slideDown();
        },
        function() {
            $("#ok .hide").find('ul').stop(true, true).slideUp();
        }
    );
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').stop();
        localStorage.setItem("brojac","Show");
        $lok = "index.html";
        window.open("http://localhost/Sajt/index.html", "_self");
    });
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
        
        "<a href='sitemap.xml'>Sitemap</a>",
        "<a href='robots.txt'>Robots</a>",
        "<a href='dokumentacija.pdf'>Doc</a>"
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