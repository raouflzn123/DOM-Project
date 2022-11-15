//card
let cardIcon = document.querySelector("#icon");
let card = document.querySelector(".crd");
let closeCard = document.querySelector("#close-card");

//Show card
cardIcon.onclick = () => {
  card.classList.add("active");
};

//close card
closeCard.onclick = () => {
  card.classList.remove("active");
};

//card working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Making Function
function ready() {
  //remove items from card
  var removeCardButton = document.getElementsByClassName("card-remove");
  console.log(removeCardButton);
  for (var i = 0; i < removeCardButton.length; i++) {
    var button = removeCardButton[i];
    button.addEventListener("click", removeCardItem);
  }
  //quantity changes
  var quantityInputs = document.getElementsByClassName("crd-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //Add to card
  var addCard = document.getElementsByClassName("add-card");
  for (var i = 0; i < addCard.length; i++) {
    var button = addCard[i];
    button.addEventListener("click", addCardClicked);
  }
  //Buy Button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

//buy button
function buyButtonClicked() {
  alert("Your Order is Placed");
  var cardContent = document.getElementsByClassName("crd-content")[0];
  while (cardContent.hasChildNodes()) {
    cardContent.removeChild(cardContent.firstChild);
  }
  updateTotal();
}

//Remove Items From Card
function removeCardItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Add to card
function addCardClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("productname")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("productimg")[0].src;
  addProductToCard(title, price, productImg);
  updateTotal();
}
function addProductToCard(title, price, productImg) {
  var cardShopBox = document.createElement("div");
  cardShopBox.classList.add("crdbox");
  var cardItems = document.getElementsByClassName("crd-content")[0];
  var cardItemsNames = cardItems.getElementsByClassName("crd-product-title");
  for (var i = 0; i < cardItemsNames.length; i++) {
    if (cardItemsNames[i].innerText == title) {
      alert("You have already add this item to card");
      return;
    }
  }

  var cardBoxContent = `<img src="${productImg}" alt="" class="crd-img" />
                      <div class="detail-box">
                          <div class="crd-product-title">${title}</div>
                          <div class="crdprice">${price}</div>
                          <input type="number" value="1" class="crd-quantity" />
                      </div>
                      <i class="bx bxs-trash card-remove"></i>`;
  cardShopBox.innerHTML = cardBoxContent;
  cardItems.append(cardShopBox);
  cardShopBox
    .getElementsByClassName("card-remove")[0]
    .addEventListener("click", removeCardItem);
  cardShopBox
    .getElementsByClassName("crd-quantity")[0]
    .addEventListener("change", quantityChanged);
}
//update total
function updateTotal() {
  var cardContent = document.getElementsByClassName("crd-content")[0];
  var cardBoxes = cardContent.getElementsByClassName("crdbox");
  var total = 0;
  for (var i = 0; i < cardBoxes.length; i++) {
    var cardBox = cardBoxes[i];
    var priceElement = cardBox.getElementsByClassName("crdprice")[0];
    var quantityElement = cardBox.getElementsByClassName("crd-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //If price contains some cents value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
