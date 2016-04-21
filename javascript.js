$(function(){


   function productInfo(){

	$("body").append($("<div></div>").addClass("modal"));
   }

   function getQueryVars(){

	var vars = [], hash;
	var hashes = window.location.href.slice(
	  window.location.href.indexOf('?') + 1).split('&');

	for(var i = 0; i < hashes.length; i++){

		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}

	return vars;
   }

   function getProducts(){

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function(){

		if(xhttp.readyState == 4 && xhttp.status == 200)
			loadProducts(xhttp);
  	};

	xhttp.open("GET", "resources/xml/products.xml", true);
	xhttp.send();
   }

   function loadProducts(xml){

	var x = xml.responseXML;

	x = x.getElementsByTagName("product");

	for(var i = 0; i < x.length; i++){

		if(x[i].getAttribute("category") == getQueryVars()["category"]){

			var title_val = x[i].getElementsByTagName("title")[0]
			                    .childNodes[0].nodeValue;

			var title = $("<div></div>").addClass("title")
			                            .text(title_val);


			var id_val = x[i].getElementsByTagName("id")[0]
			                 .childNodes[0].nodeValue;

			var id = $("<div></div>").addClass("id")
		                                 .text("Product ID: ")
			                         .append(id_val);

			var publisher_val = x[i].getElementsByTagName("publisher")[0]
			                        .childNodes[0].nodeValue;

			var publisher = $("<div></div>").addClass("publisher")
			                                .text(publisher_val);

			var format_val = x[i].getElementsByTagName("format")[0]
			                     .childNodes[0].nodeValue;

			var format = $("<div></div>").addClass("format")
			                             .text(format_val);


			var summary_val = x[i].getElementsByTagName("summary")[0]
			                      .childNodes[0].nodeValue;

			var summary = $("<div></div>").addClass("summary")
			                              .text(summary_val);


			var price_val = x[i].getElementsByTagName("price")[0]
			                    .childNodes[0].nodeValue;

			var price = $("<div></div>").addClass("price")
			                            .text("$").append(price_val)


			var img_path = "resources/img/" + id_val + ".jpg";

			var img = $("<img />").attr("src", img_path)
			                      .attr("alt", title_val);


			var addtocart = $("<input></input>").attr("type", "submit")
			                                    .attr("name", id_val)
			                                    .addClass("addtocart")
			                                    .val("Add to Cart")
			                                    .text("Add to Cart");


			var img_prevw = $("<div></div>").addClass("container")
			                                .attr("id", "img_prevw")
			                                .append(img);

			var info_prevw = $("<div></div>").addClass("container")
			                                 .attr("id", "info_prevw")
			                                 .append(title, id, format,
			                                         publisher,
			                                         summary,
		        	                                 price,
			                                         addtocart);

			var product = $("<div></div>").addClass("product")
			                              .append(img_prevw, info_prevw);

			var products = $("#products");

			products.append(product);
		}
	}
   }


   getProducts();


   var products_hover = false;

   $("footer").mouseleave(function(){

	if(products_hover){

		$(this).find("#products")
		       .css("background", "#000000")
		       .parent()
		       .parent()
		       .css("background", "#000000")
		       .animate({ height: "75px"}, 250);

		products_hover = false;
	}

   }).find("span").not("#products").mouseenter(function(){

	if(products_hover){

		$(this).parent()
		       .find("#products")
		       .css("background", "#000000")
		       .parent()
		       .parent()
		       .css("background", "#000000")
		       .animate({ height: "75px"}, 250);

		products_hover = false;
	}

   }).parent().find("#products").mouseenter(function(){

	if(!products_hover){

		$(this).css("background", "#EC6139")
		       .parent()
		       .parent()
		       .css("background", "#EC6139")
		       .animate({ height: "175px"}, 250);

		products_hover = true;
	}
   });

   var category_hover = false;

   $("footer").find("ul").children().hover(function(){

	if(!category_hover){

		$(this).find("img").css("visibility", "visible");

		category_hover = true;

	} else if(category_hover){

		$(this).find("img").css("visibility", "hidden");

		category_hover = false;
	}
   });

   $("navbar").find("#cart").click(function(){

      $(".cart").parent().css("display", "block");

   });

   $(".cart").parent().css("display", "none");

   $(".cart").children(".close").click(function(){

	$(this).parent().parent().css("display", "none");
   });


   $(".error").children(".close").click(function(){

	$(this).parent().parent().css("display", "none");
   });




   var guest = false;

   $("#guestyes").click(function(){

	guest = !guest;


   	if(guest){

		$("#passw").attr("disabled", "disabled")
		           .parent().children("span").css("opacity", "0.5");

		$("#passwrep").attr("disabled", "disabled")
		              .parent().children("span").css("opacity", "0.5");

   	} else{

		$("#passw").removeAttr("disabled")
		           .parent().children("span").css("opacity", "1.0");

		$("#passwrep").removeAttr("disabled")
		              .parent().children("span").css("opacity", "1.0");
	}
   });

   if($("#guestyes").attr("checked") == "checked"){

	guest = true;


	$("#passw").attr("disabled", "disabled")
		   .parent().children("span").css("opacity", "0.5");

	$("#passwrep").attr("disabled", "disabled")
		      .parent().children("span").css("opacity", "0.5");
   }


   var credit_radio = $("#visa, #mc, #amex");
   var paypal_radio = $("#paypal");

   credit_radio.click(function(){

	$("#ccnum").css("display", "inline-block");

	$("#ccname").css("display", "inline-block");

	$("#pp").css("display", "none");
   });

   paypal_radio.click(function(){

	$("#ccnum").css("display", "none");

	$("#ccname").css("display", "none");

	$("#pp").css("display", "inline-block");
   });

   if(paypal_radio.attr("checked") == "checked"){

	$("#ccnum").css("display", "none");

	$("#ccname").css("display", "none");

	$("#pp").css("display", "inline-block");
   }


   $("#receipt").children(".close").click(function(){

	window.scrollTo(0,0);

	$(".modal").css("display", "none");

   });

});
