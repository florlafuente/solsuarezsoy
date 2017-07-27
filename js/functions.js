    $( document ).ready(function() { 
        errores = [];
        $('.img-modal').css('opacity','1');
        $('.roll').css('opacity','0');
        $('.fotoperfil').animateCss('fadeIn');
        $('.img-modal').animateCss('fadeIn');
        $('.link').on('click', function(event){
        event.preventDefault();
        id=$(this).data('id');
        $('html, body').animate({scrollTop : $(id).offset().top},800);
         });

        $('.navimagen').mouseover(function(){
            var url = $(this).data('img');
            var source = 'img/'+url+'_hover.png'
            $(this).attr('src', source);
        });
        $('.navimagen').mouseout(function(){
            var url = $(this).data('img');
            var source = 'img/'+url+'.png'
            $(this).attr('src',source);
        });

        $('.navimagen1').mouseover(function(){
            var url = $(this).data('img');
            var source = '../img/'+url+'_hover.png'
            $(this).attr('src', source);
        });
        $('.navimagen1').mouseout(function(){
            var url = $(this).data('img');
            var source = '../img/'+url+'.png'
            $(this).attr('src',source);
        });

        
     
        var $grid = $('.grid').packery({
            columnWidth: 200,
             
                itemSelector: '.grid-item',
                gutter: 10

                
            });
        $grid.imagesLoaded().progress( function() {
            $grid.packery('layout');
        }); 
            
        $('.link-modal').hover(function () {
                $(this).find(':nth-child(2)').stop().animate({
                    opacity: .5
                    }, "fast");
                $(this).find(':first-child').stop().animate({
                        opacity: .7
                     }, 'fast');
        });
        //Fin mouse hover
        $('.link-modal').mouseout(function () {
            $('.img-modal').stop().animate({
            opacity: 1
            }, 'slow');
            $('.roll').stop().animate({
                opacity: 0
                }, 'slow');
            });
        //Fin mouseout 

        

        $('.link-modal').on('click', function() {
        var imagen = $(this).data('img');
        var url = '../img/' + imagen+'.jpg';
        $('#imgdentromodal').attr('src', url);
    });

        $('#enviar').on('click',function() {
            console.log('Hola');
        $('.mensaje').css('display', 'none');
        errores = [];
        var nombre = $('#nombre').val();
         if (!soloLetras(nombre) || nombre == '') {
            errores ++;
            console.log('Error nombre');
         } else {
            console.log('Nombre ok');
         }

        var mail = $('#email').val();
        if (!mailCorrecto(mail) || mail == '') {
            errores ++;
            console.log('Error mail');
        } else {
            console.log('mail ok');
        }
         var comment = $('#comment').val();
        if (comment == '') {
            errores ++;
            console.log('Error com');
        }else {
         console.log('comment ok');
        }
        if (errores.length == 0) {
            var datos = $('#formulario').serialize();
            console.log(datos);
            $('#formulario')[0].reset();

            
             $.ajax({
                url: 'http://localhost/sol/php/contact_me.php ',
                type: "post",
                data: datos,
                success: function (response) {
                    // you will get response from your php page (what you echo or print)   
                  if(response){
                    console.log(response);   
                      console.log("todo ok"); 
                      alert("Formulario enviado correctamente");
                    }else{  
                      alert("Error");
                      location.reload();
                    }
                  }           
            }); 
            $('#error').css('display', 'none');
            $('#exito').css('display', 'block');
            errores = [];
        } else {
            $('#error').css('display', 'block');
            errores = [];
        }
    });
        $('#cerrar').on('click',function() {
            $('#error').css('display', 'none');
            $('#exito').css('display', 'none');
    });
}); //End Document Ready

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

function soloLetras(x) { //Valido apellido y nombre con expresion regular//

    expr = /^([a-zA-Z\s]{3,50})*$/ ; //expresion regular de intervalos de letras min 4 caracteres max 50//
    if(expr.test(x)) {
        return true;
    }
    return false;
} //Fin soloLetras //

function mailCorrecto(x) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(expr.test(x)) {
        return true;
    }
    return false;
} // Fin mailCorrecto //