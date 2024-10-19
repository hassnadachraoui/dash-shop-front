export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

// Validate email

//export const validateEmail = (email) => {
//return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ /);
//}

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Calculate average Product rating
export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0; // Return 0 if the ratings array is empty or not an array
  }

  var totalStars = 0;
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }

  return totalStars / ratings.length;
}

export function getCartQuantityById(products, id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id) {
      return products[i].cartQuantity;
    }
  }
  return 0; // If the _id is not found, return 0 or any default value
}

//Extract id and cart quantity from cartItems
export function extractIdAndCartQuantity(products) {
  return products.map(function (product) {
    return {
      _id: product._id,
      cartQuantity: product.cartQuantity,
    };
  });
}
