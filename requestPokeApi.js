$(document).ready(function() {

    $("#divPokeBall").show();

    for (var i = 1; i <= 10; i++) {
        getPokemons(i, false);
     }

     $("#divPokeBall").hide();

     $(".stats").hide();

     $(".btnStats").on("click", function(){
        
        if($(this).next().is(':visible'))
            $(this).next().hide();
        else
            $(this).next().show();
    });

    $("#btnSearch").on("click", function(){
        $(".pokeCardDiv").html('');

        var inptValue = $("#inptSearch").val();
        if(inptValue > 0 && inptValue < 150)
            getPokemons(inptValue);
        else if(inptValue == ""){
                for (var i = 1; i <= 100; i++) {
                    getPokemons(i);
                 }
            }
        else
            alert("insira um numero de 1 ate 150");
    });
    
    $(".btnDetails").on("click", function(){
        getPokemons($(this).attr('data-pokemon-id'), true);

    });

});

function getPokemons(id, isDetail){

        $.ajax({
        url : "https://pokeapi.co/api/v2/pokemon/" + id,
        type : 'get',
        async: false,
        success: function (data){

             if(!isDetail){
                 setListContent(data);
             }else{
              
                setModelContent(data);
             }
        }
    })
    .fail(function(jqXHR, textStatus, data){
    });

   }

function setListContent(data){
    var htmlDiv  = `
    <div class="col-md-3 pokeCardDiv">
        <div class="card mb-3 pokeCard">
            <img data-toggle="modal" data-target="#exampleModal" class="card-img-top" src="${data.sprites.front_default}" >
            <div class="card-body">
            <div class="card text-center">
            <div class="card-header">
            <h4>${data.species.name}</h4>
            </div>
            <div class="card-body">
             <div class="row">
                <div class="col-md-12">
                <button class="btn btn-info btnDetails" data-pokemon-id="${data.id}">Detalhes</button>
                </div>
             </div>
            </div>
            <div class="card-footer text-muted">
            <p>Nº: ${data.id}</p>
              <button class="btn btn-primary btnStats" type="button" data-target="modalDetails">Stats</button>
              <div class="stats">
               
             </div>
            </div>
        </div>
    </div>`;

    $("#pokedexBody").append(htmlDiv);

}

function setModelContent(data){

    var btnType = "";
    var btnAbilities = "";
    data.types.map(e => e.type).map(x => x.name).forEach(function(o,i)
    { 
        btnType += "<button class='btn btn-info' type='button'>" + o + '</button>' 
    });

    data.abilities.map(e => e.ability).map(x => x.name).forEach(function(o,i)
    { 
        btnAbilities += "<button class='btn btn-info' type='button'>" + o + '</button>' 
    });

    var htmlDiv  = `
        <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLabel"></h5>

         <div class="contaniner">

            <div class="row text-center">
                <div class="col-md-10 col-lg-12 col-sm-6">
                    <h5 class="text-center">${data.species.name}</h5>
                </div>
            </div>
            <div class="row">
                 <div class="col-md-10 col-lg-12 col-sm-6">
                    <img id="backgroundPokemon" src="${data.sprites.other['official-artwork'].front_default}"  class="rounded" alt="...">
                </div>
            </div>
        </div>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>

        </div>
        <div class="modal-body">

    <!--<div class="container-fluid">
           <div id="divServidores" class="row">
           
              <div class="col-lg-2 col-md-3 col-sm-2 p-1">
                <div class="m-0">
                    <p>
                       Tipo
                    </p>
                    ${btnType}
                </div>
              </div>
           </div>
     </div>-->
        
        <div class="container">
            <div class="row">

                <div class="col-md-6">
                 
                    <p>Tipo</p>
                    ${btnType}
                    <p>Habilidade</p>
                    ${btnAbilities}

                </div>

                <div class="col-md-6" style="border: 5px; border-color:blue;">
                    <label>Status</label>
                    <p>HP</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-animated" role="progressbar" style="transition-duration:300ms; width: ${data.stats[0].base_stat}%;" aria-valuemin="0" aria-valuemax="100">${data.stats[0].base_stat}</div>
                    </div>
                    <p>ATTACK</p>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${data.stats[1].base_stat}%;" aria-valuemin="0" aria-valuemax="100">${data.stats[1].base_stat}</div>
                    </div>
                    <p>DEFENSE</p>
                    <div class="progress">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: ${data.stats[2].base_stat}%;" aria-valuemin="0" aria-valuemax="100">${data.stats[2].base_stat}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="closemodal();">fechar</button>
    </div>
    `;

    $("#detailContent").append(htmlDiv);

    $('#modalDetails').modal('show');
   
}

function closemodal(){
    $('#detailContent').empty()
    $('#modalDetails').modal('hide')
}






