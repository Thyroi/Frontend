import styleDetail from "../components/Product_detail/Product_detail.module.scss";
import styleNotification from "../components/Notification/Notification.module.scss";

// Notification
export function Notifications(text) {
  let notification = document.querySelector("#notification");
  if (notification) {
    document.querySelector("#textNotification").innerHTML = text;

    if (notification.classList.contains(styleNotification.notification))
      notification.classList.remove(styleNotification.notification);

    if (notification.classList.contains(styleNotification.noNotification))
      notification.classList.remove(styleNotification.noNotification);

    if (notification.classList.contains(styleNotification.notification_hide))
      notification.classList.remove(styleNotification.notification_hide);

    notification.classList.add(styleNotification.notification);

    setTimeout(function () {
      notification.classList.remove(styleNotification.notification);

      if (notification.classList.contains(styleNotification.notification_hide))
        return;
      notification.classList.add(styleNotification.notification_hide);
    }, 5000);
  }
}

export function removeNotification() {
  let notification = document.querySelector("#notification");
  if (notification) {
    notification.classList.remove(styleNotification.notification);
    notification.classList.add(styleNotification.notification_hide);
  }
}

// Change default Image

export function selectImage(image) {
  let defaultImage = document.querySelector("#default_image");
  defaultImage.setAttribute("src", image);
}

// Showing colors

export function productColor(product) {
  if (product == undefined) return [];

  let colors = [];
  product.variants?.forEach((variant) => {
    if (!colors.includes(variant.ColorName)) colors.push(variant.ColorName);
  });

  return colors;
}

// Showing sizes

export function productSizes(product) {
  if (product == undefined) return [];

  let sizes = [];
  product.variants?.forEach((variant) => {
    const variantSizes = Object.keys(variant.Stocks);
    variantSizes.forEach((size) => {
      if (!sizes.includes(size)) sizes.push(size);
    });
  });

  return sizes;
}

// Select variant
// Dont judge me!
function formattingProduct(variantsTemplate, product, size, units, color) {
  if (color && size) {
    variantsTemplate.forEach((variant) => {
      if (variant.ColorName === color) {
        document.querySelector("#units").innerHTML = variant.Stocks[size];

        const auxiliar = Object.assign({}, variant);
        product.variants = [auxiliar];

        product.variants[0].Stocks = {};
        product.variants[0].Stocks[size] = 1;
      }
    });
    return product;
  }
}

export function selectVariant(templateProduct, product, color) {
  if (!color) {
    color = product.variants[0].ColorName;
    
    const auxiliarObject = Object.assign({}, templateProduct);
    const variantsTemplate = auxiliarObject.variants;
    console.log(variantsTemplate)
    const size = Object.keys(product.variants[0].Stocks)[0];
    const units = product.variants[0].Stocks[size];

    product = formattingProduct(variantsTemplate, product, size, units, color);
    focusSelectedSize(size);
    focusSelectedColor(color);

    return product;
  }

  if (product.variants[0].ColorName === color) {
    focusSelectedColor(color);
    return product;
  }

  templateProduct.variants.forEach((variant) => {
    if (variant.ColorName === color) {
      let sizes = document.querySelector("#sizes");
      let childSizes = sizes.childNodes;

      childSizes.forEach((childSize) => {
        if (childSize.classList.contains(styleDetail.selectedSize)) {
          const auxiliarObject = Object.assign({}, templateProduct);
          const variantsTemplate = auxiliarObject.variants;
          const size = childSize.innerHTML;

          let units = 0;
          variantsTemplate.find((variant) => {
            if (
              variant.ColorName === color &&
              Object.keys(variant.Stocks).includes(size)
            ) {
              units = variant.Stocks[size];
              return;
            }
          });

          product = formattingProduct(
            variantsTemplate,
            product,
            size,
            units,
            color
          );
          focusSelectedColor(color);
        }
      });
    }
  });

  return product;
}

export function selectSize(templateProduct, product, size) {
  let sizes = document.querySelector("#sizes");
  let childSizes = sizes.childNodes;

  childSizes.forEach((childSize) => {
    if (childSize.textContent === size) {
      let colors = document.querySelector("#colors");
      let childColors = colors.childNodes;

      childColors.forEach((childColor) => {
        if (childColor.classList.contains(styleDetail.selectedColor)) {
          const auxiliarObject = Object.assign({}, templateProduct);
          const variantsTemplate = auxiliarObject.variants;
          const color = childColor.innerHTML;

          let units = 0;
          variantsTemplate.find((variant) => {
            if (
              variant.ColorName === color &&
              Object.keys(variant.Stocks).includes(size)
            ) {
              units = variant.Stocks[size];
              return;
            }
          });

          product = formattingProduct(
            variantsTemplate,
            product,
            size,
            units,
            color
          );
          focusSelectedSize(size);
        }
      });
    }
  });

  return product;
}

function focusSelectedColor(color) {
  let colors = document.querySelector("#colors");
  let childColors = colors.childNodes;

  childColors.forEach((childColor) => {
    if (childColor.classList.contains(styleDetail.selectedColor)) {
      childColor.classList.remove(styleDetail.selectedColor);
      childColor.classList.add(styleDetail.color);
    }
  });

  childColors.forEach((childColor) => {
    if (childColor.innerHTML === color) {
      childColor.classList.remove(styleDetail.color);
      childColor.classList.add(styleDetail.selectedColor);
    }
  });
}

function focusSelectedSize(size) {
  let sizes = document.querySelector("#sizes");
  let childSizes = sizes.childNodes;

  childSizes.forEach((childSize) => {
    if (childSize.classList.contains(styleDetail.selectedSize)) {
      childSize.classList.remove(styleDetail.selectedSize);
      childSize.classList.add(styleDetail.size);
    }
  });

  childSizes.forEach((childSize) => {
    if (childSize.innerHTML === size) {
      childSize.classList.remove(styleDetail.size);
      childSize.classList.add(styleDetail.selectedSize);
    }
  });
}

export function increaseLocalStock(product) {
  let amount = document.querySelector("#quantity");
  let availableUnits = parseInt(document.querySelector("#units").textContent);
  let quantity = parseInt(amount.textContent);

  if (availableUnits > 0) {
    console.log("___+");
    document.querySelector("#quantity").textContent = quantity + 1;

    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] = quantity + 1;
    document.querySelector("#units").textContent = availableUnits - 1;
  }
  // document.querySelector("#total").innerHTML = totalDue();
  return product;
}

export function decreaseLocalStock(product) {
  let amount = document.querySelector("#quantity");
  let quantity = parseInt(amount.textContent);
  let availableUnits = parseInt(document.querySelector("#units").textContent);
  let unitsForBuy = product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]];
 
  if (quantity > 1) {
    console.log("___-");
    document.querySelector("#quantity").textContent = quantity - 1;

    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] = quantity - 1;
    document.querySelector("#units").textContent = availableUnits + 1;
  }
  // document.querySelector("#total").innerHTML = totalDue();
  return product;
}

export function totalDue(product, cartItems) {
  if (cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      item.totalPrice = parseFloat(item.totalPrice);
      total += item.totalPrice;
    });
    
    console.log(total)
    return total;
  }

  let total =
    product.price *
    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]];
  product.totalPrice = total;
  total = parseFloat(total).toFixed(2);
  return total;
}


export function changingAttributesCart(cartItems, product, quantity){
  console.log(cartItems, product);
  const cart = cartItems.map((item) => {
    if (item.id_product === product.id_product) {
      item.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] = quantity;
      item.totalPrice = totalDue(item);

      return item;
    }

    return item;
  });


  console.log(cart)
  return cart;
}