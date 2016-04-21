<?php

   session_start();

   if(!isset($_SESSION["cart"]))
      $_SESSION["cart"] = "";

   $product_ids = array( "1000", "1001", "1002", "1003", "1004", "1005",
                         "1006", "1007", "1008", "1009", "1010", "1011",
                         "1012", "1013", "1014" );
?>

<!DOCTYPE html>

<html>

   <head>

      <script
         src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js">
      </script>

      <script src="javascript.js" type="text/javascript"></script>

      <link rel="stylesheet" href="stylesheet.css" />

      <title>CAMZ COMIX | Home</title>

   </head>
 
   <body>

      <modal>

         <div class="cart">

            <span class="close">x</span>

            <h1>

               <img src="resources/icons/cart.png" alt="Cart" />
               CART

            </h1>

            <?php

               foreach($product_ids as $id){

                  if(isset($_POST[$id.'del'])){

                     $cart = explode(",", $_SESSION["cart"]);
                     array_shift($cart);

                     if(in_array($id, $cart)){

                        $_SESSION["cart"] = "";

                        foreach($cart as $product){

                           if($product != $id){

                              $_SESSION["cart"] = $_SESSION["cart"].','.$product;
                           }
                        }
                     }
                  }
               }
            ?>

            <form method="post">

               <?php

                  $xml = simplexml_load_file("resources/xml/products.xml")
                         or die("Error: CANNOT LOAD PRODUCTS!");

                  $subtotal = 0;

                  $cart = explode(",", $_SESSION["cart"]);
                  array_shift($cart);

                  foreach($cart as $id){

	             for($i = 0; $i < count($xml); $i++){

                        if($xml->product[$i]->id == $id){

                           echo '<div class="product">';

                           $title = $xml->product[$i]->title;

                           if(strlen($title) > 25){

                              $title = substr($title, 0, 25).'...';
                           }

                           echo '<div class="title">'.$title;

                           echo '</div>';

                           $price = $xml->product[$i]->price;

                           echo '<div class="price">$'.$price;

                           $subtotal += $price;

                           echo '</div>';

                           echo '<input type="submit" name='.$id.'del'.' value=""/>';

                           echo '</div>';
                        }
                     }
                  }

                  if(count($cart) == 0){

                     echo '<p>Your cart is empty!</p>';
                  }
               ?>

            </form>

            <div class="subtotal">

               <span>Subtotal</span>

               <?php

                  echo '$'.$subtotal;

               ?>

            </div>

            <input type=button value="Place Order">

            </input>

         </div>

      </modal>

      <img id="logo" src="resources/logo.png" alt="CAMZ COMIX" />

      <footer>

         <navbar>

            <span><a href="index.php">HOME</a></span>

            <span id="products" class="selected">PRODUCTS</span>

            <span><a href="index.php">ABOUT US</a></span>

            <span id="cart">

               <img src="resources/icons/cart.png" alt="Cart" />

               <?php
 
                  $cart = explode(",", $_SESSION["cart"]);
                  array_shift($cart);

                  echo count($cart);

               ?>

            </span>

         </navbar>

         <ul>

            <li>

               <img src="resources/icons/star.png" alt="Star" />
               <a href="products.php?category=comic">Comics & Trades</a>

            </li>

            <li>

               <img src="resources/icons/star.png" alt="Star" />
               <a href="products.php?category=anime">Anime</a>

            </li>

            <li>

               <img src="resources/icons/star.png" alt="Star" />
               <a href="products.php?category=manga">Manga</a>

            </li>

         </ul>

      </footer>

   </body>

</html>
