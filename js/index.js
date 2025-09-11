$(function() {
	$(document).tooltip();
});

//variables globales
var identificado = 0;
var idUser = "";
var departamentos = new Array();
var colorNormal = "#69BBF5";
var colorHover = "#0C69EA"
var idDepartamento = "";
var idFamilia = "";
var idSubFamilia = "";
var idSubFamilia1 = "";
var idSubFamilia2 = "";
var fila = 0;
var guardar = new Array();

//jquery
$(document).ready(function() {
	//pedimos identificacion del usuario
	login();
});

function login(){
	if (identificado != 1) {
		$("#sombra").show();
		console.log("pongo sombra");
		$("#divLogin").show();		
	}
}

function doLogin(){
	$.ajax({
		data:  $("#formLogin").serialize(),
		url:   'php/valida_user.php',
		type:  'post',
		success:  function (response) {
			// if (response.length == 0) { //cambiar por 0
			// 	identificado = 0;
			// 	location.reload();
			// }else{
				identificado = 1;
				$("#sombra").hide();
				$("#divLogin").hide();	
				idUser = response[0];
				$("#nombreUser").html("Bienvenido: "+ response[1]);
				cargarDepartamentos();
			// }
		},dataType: 'JSON'
	});
}

function cargarDepartamentos(){
	$.ajax({
		url:   'php/cargar_departamentos.php',
		type:  'post',
		success:  function (response) {
			departamentos = response;
			if (departamentos.length == 0) {

			}else{
				var html = "<p style='font-family: cuerpo; font-weight: 900;margin-left: 42px;'>Departamento</p><ul style='list-style: none;'>";
				for (var i = 0; i < departamentos.length; i++) {
					html += "<li onmouseenter='$(this).css(\"background-color\", colorHover);' onmouseleave='$(this).css(\"background-color\", colorNormal);' categoria='1' tipo='seleccionable' style='padding: 15px;background: #69BBF5;cursor: pointer' seleccionado='0'  name='dep" + departamentos[i][0] + "' id='dep" + departamentos[i][0] + "'>" + departamentos[i][1] + "</li>"
				}
				html += "</ul>";
				$("#departamentos").html(html);
				$("li[categoria='1']").each(function(index, el) {
					$(this).bind({
						click: function() {
							cargarFamilia($(el).attr("id"));
							idDepartamento = $(el).attr("id");
							activa($(this),1);
							$("#familias").html("");
							$("#subfamilias").html("");
							$("#subfamilias1").html("");
							$("#subfamilias2").html("");
						}
					});	
				});
			}
		},dataType: 'JSON'
	});
}

function activa (id, categoria){
	$("li[categoria='"+categoria+"']").each(function(index, el) {
		$(el).css("background-color", "#69BBF5")
		.attr("onmouseenter", "$(this).css(\"background-color\", colorHover);")
		.attr("onmouseleave", "$(this).css(\"background-color\", colorNormal);")
		.attr("seleccionado", "0");	
	});
	if (id == 'todo') {

	}else{
		$(id).css('background-color', colorHover)
		.attr("seleccionado", "1")
		.attr("onmouseenter", "")
		.attr("onmouseleave", "");	
	}
	
}

function cargarFamilia(id){
	var data = {"id":id.split("dep")[1]};
	$.ajax({
		data : data,
		url:   'php/cargar_familias.php',
		type:  'post',
		success:  function (response) {
			departamentos = response;
			if (departamentos.length == 0) {

			}else{
				var html = "<p style='font-family: cuerpo; font-weight: 900;margin-left: 42px;'>Nivel 1</p><ul style='list-style: none;'>";
				for (var i = 0; i < departamentos.length; i++) {
					html += "<li onmouseenter='$(this).css(\"background-color\", colorHover);' onmouseleave='$(this).css(\"background-color\", colorNormal);' tipo='seleccionable' style='padding: 15px;background: #69BBF5;cursor: pointer' seleccionado='0' categoria='2' id='fam" + departamentos[i][0] + "'>" + departamentos[i][1] + "</li>"
				}
				html += "</ul>";
				$("#familias").html(html);
				$("li[categoria='2']").each(function(index, el) {
					$(el).bind({
						click: function() {
							cargarSubFamilia($(el).attr("id"));
							idFamilia = $(el).attr("id");
							activa($(this),2);
							$("#subfamilias").html("");
							$("#subfamilias1").html("");
							$("#subfamilias2").html("");

						}
					});
				});
			}
		},dataType: 'JSON'
	});
}

function cargarSubFamilia(id){
	var data = {"id":id.split("fam")[1]};
	$.ajax({
		data : data,
		url:   'php/cargar_subfamilias.php',
		type:  'post',
		success:  function (response) {
			departamentos = response;
			if (departamentos.length == 0) {

			}else{
				var html = "<p style='font-family: cuerpo; font-weight: 900;margin-left: 42px;'>Nivel 2</p><ul style='list-style: none;'>";
				for (var i = 0; i < departamentos.length; i++) {
					html += "<li onmouseenter='$(this).css(\"background-color\", colorHover);' onmouseleave='$(this).css(\"background-color\", colorNormal);' tipo='seleccionable' style='padding: 15px;background: #69BBF5;cursor: pointer' seleccionado='0' categoria='3' id='subfam" + departamentos[i][0] + "'>" + departamentos[i][1] + "</li>"
				}
				html += "</ul>";
				$("#subfamilias").html(html);
				$("li[categoria='3']").each(function(index, el) {
					$(el).bind({
						click: function() {
							cargarSubFamilia1($(el).attr("id"));
							idSubFamilia = $(el).attr("id");
							activa($(this),3);
							$("#subfamilias1").html("");
							$("#subfamilias2").html("");
						}
					});
				});
			}
		},dataType: 'JSON'
	});
}


function cargarSubFamilia1(id){
	var data = {"id":id.split("subfam")[1]};
	$.ajax({
		data : data,
		url:   'php/cargar_subfamilias1.php',
		type:  'post',
		success:  function (response) {
			departamentos = response;
			if (departamentos.length == 0) {

			}else{
				var html = "<p style='font-family: cuerpo; font-weight: 900;margin-left: 42px;'>Nivel 3</p><ul style='list-style: none;'>";
				for (var i = 0; i < departamentos.length; i++) {
					html += "<li onmouseenter='$(this).css(\"background-color\", colorHover);' onmouseleave='$(this).css(\"background-color\", colorNormal);' tipo='seleccionable' style='padding: 15px;background: #69BBF5;cursor: pointer' seleccionado='0' categoria='4' id='subfam1" + departamentos[i][0] + "'>" + departamentos[i][1] + "</li>"
				}
				html += "</ul>";
				$("#subfamilias1").html(html);
				$("li[categoria='4']").each(function(index, el) {
					$(el).bind({
						click: function() {
							cargarSubFamilia2($(el).attr("id"));
							idSubFamilia1 = $(el).attr("id");
							activa($(this),4);
							$("#subfamilias2").html("");
						}
					});
				});
			}
		},dataType: 'JSON'
	});
}

function cargarSubFamilia2(id){
	var data = {"id":id.split("subfam1")[1]};
	$.ajax({
		data : data,
		url:   'php/cargar_subfamilias2.php',
		type:  'post',
		success:  function (response) {
			departamentos = response;
			if (departamentos.length == 0) {

			}else{
				var html = "<p style='font-family: cuerpo; font-weight: 900;margin-left: 42px;'>Nivel 4</p><ul style='list-style: none;'>";
				for (var i = 0; i < departamentos.length; i++) {
					html += "<li onmouseenter='$(this).css(\"background-color\", colorHover);' onmouseleave='$(this).css(\"background-color\", colorNormal);' tipo='seleccionable' style='padding: 15px;background: #69BBF5;cursor: pointer' seleccionado='0' categoria='5' id='subfam2" + departamentos[i][0] + "'>" + departamentos[i][1] + "</li>"
				}
				html += "</ul>";
				$("#subfamilias2").html(html);
				$("li[categoria='5']").each(function(index, el) {
					$(el).bind({
						click: function() {
							//cargarSubFamilia3($(el).attr("id"));
							idSubFamilia2 = $(el).attr("id");
							activa($(this),5);
						}
					});
				});
			}
		},dataType: 'JSON'
	});
}

function previsualizacion (){
	if ($("#selectHorasProduccion0 option:selected").attr("id") != 0 || $("#selectMinutosProduccion0 option:selected").attr("id") != 0) {
		if (idDepartamento != '') {
			try {
				idDepartamento = idDepartamento.split("dep")[1];
				console.log(idDepartamento);
				idFamilia = idFamilia.split("fam")[1];
				idSubFamilia = idSubFamilia.split("subfam")[1];
				idSubFamilia1 = idSubFamilia1.split("subfam1")[1];
				idSubFamilia2 = idSubFamilia2.split("subfam2")[1];
			}
			catch(err) {
				console.log(err.message);
			}

			var html = "";

			html += "<div id='fila" + fila + "' style='margin-left: 51px'>";

			$("li[seleccionado='1']").each(function(index, el) {
				html += $(el).html();
				html += " &#8658 ";
			});

			html += $("#selectHorasProduccion0 option:selected").html() + ":" + $("#selectMinutosProduccion0 option:selected").html();  
			html += " <span style='color: red; font-size: 24px;cursor: pointer' onclick='borrarFila(" + fila + ")'><img height='25px;' style='position:relative; top: 6px;' src='media/img/images.png'/></span>";
			html += "</div>";
			
			$("#descripcion").append(html);
			
			$("li[tipo='seleccionable']").each(function(index, el) {
				$(el).attr("seleccionado", "0");
			});
			
			$("#departamentos").html("");
			$("#familias").html("");
			$("#subfamilias").html("");
			$("#subfamilias1").html("");
			$("#subfamilias2").html("");
			
			fila++;

			var temp = new Array();
			temp.push(idDepartamento);
			temp.push(idFamilia);
			temp.push(idSubFamilia);
			temp.push(idSubFamilia1);
			temp.push(idSubFamilia2);
			
			var hora = new Array();
			hora.push($("#selectHorasProduccion0 option:selected").html());
			hora.push($("#selectMinutosProduccion0 option:selected").html());

			temp.push(hora);

			guardar.push(temp);
			console.log(guardar);
			calculaHoras();
			cargarDepartamentos();
		}
		else
		{
			alert("Seleccione minimo un departamento.")
		}
		
	}
	else
	{
		alert("Indique un horario.");
	}
}

function borrarFila(id){
	guardar[id] = ["-1","","","","",[0,0]];
	$("#fila"+id).empty();
	calculaHoras();
}

function calculaHoras(){
	var totalH = 0;
	var totalM = 0;
	var media = 0;
	for (var i = 0; i < guardar.length; i++) {
		var minutos = guardar[i][5][1];
		var horas = guardar[i][5][0];
		totalH += parseInt(horas);
		totalM += parseInt(minutos);
		if (minutos == '30') {
			console.log("media");
			media++;
		}
	}
	totalH += parseInt(media/2);
	if (media%2 == 0) 
	{
		totalM = "00";
	}
	else
	{
		totalM = "30";
	}
	$("#horasTotal").html(totalH + ":" + totalM);
	if (totalH == 8 && totalM == 30) {
		$("#exclamacion").show();
	}else if(totalH > 8){
		$("#exclamacion").show();
	}else{
		$("#exclamacion").hide();
	}
}

function enviarDatos(){

	if (guardar.length == 0 || todoVacio()) 
	{
		alert("No hay datos para enviar!");
	}
	else
	{
		var res = confirm("Desea guardar los registros?");
		if (res == true) {
			var data = {"datos": JSON.stringify(guardar), "id": idUser};
			$.ajax({
				data : data,
				url:   'php/guardar_registro.php',
				type:  'post',
				success:  function (response) {
					if (response == 1) {
						$("#horasTotal").html("0:00");
						$("#descripcion").html("");
						activa("todo", 1);
						activa("todo", 2);
						activa("todo", 3);
						activa("todo", 4);
						activa("todo", 5);
						location.reload();
					}
				},dataType: 'JSON'
			});
		} 
	}
}

function miraTeclas(e){
	if (e.keyCode == 13) {
		doLogin();
	}
}

function todoVacio(){
	var found = 0;
	for (var i = 0; i < guardar.length; i++) {
		if (guardar[i][0] == "-1"){
			//nada;
		}else{
			found++;
		}
	}
	if (found == 0) 
	{
		return true;
	}else{
		return false;
	}
}