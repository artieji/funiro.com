window.onload = function() {


  
  //! header
    let header = document.querySelector('.header');
    document.addEventListener('scroll', function() {
      if (window.pageYOffset >= 40) {
        header.classList.add('active');
      }  else if (window.pageYOffset <= 40) {
        header.classList.remove('active');
      }
    });

    //! header-search

    let headerSearchMd = document.querySelector('.header__actions-search-md');
    let headerFormMd = document.querySelector('.header__form-wrapper-md');

    headerSearchMd.addEventListener('click', function() {
      headerFormMd.classList.toggle('active');
    });

   //! sub-menu
   let headerMenuArrow = document.querySelectorAll('.header__arrow');
   let headerSubMenuProducts = document.querySelector('.header__sub-menu-products');
   let headerSubMenuRooms = document.querySelector('.header__sub-menu-rooms');

   for (let i = 0; i < headerMenuArrow.length; i++) {
      headerMenuArrow[i].addEventListener('click', function(){
         headerMenuArrow[i].classList.toggle('rotated');
         if (headerMenuArrow[i].dataset.theme == 'products') {
            headerSubMenuProducts.classList.toggle('active');
         }
         if (headerMenuArrow[i].dataset.theme == 'rooms') {
            headerSubMenuRooms.classList.toggle('active');
         }
      });
   }

   //! burger-menu

   let headerMenu = document.querySelector('.header__menu');
   let headerBurger = document.querySelector('.header__burger');

   headerBurger.addEventListener('click', function(){
      headerMenu.classList.toggle('active');
      headerBurger.classList.toggle('active');
   });

   //! first-screen-swiper

   const firstScreenSwiper = new Swiper('.first-screen__swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      spaceBetween: 32,
      speed: 600,
      
    
      // If we need pagination
      pagination: {
        el: '.first-screen__swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.first-screen__swiper-button-next',
        prevEl: '.first-screen__swiper-button-prev',
      },
    });

      //! rooms-swiper

   const roomsSwiper = new Swiper('.rooms__swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      speed: 600,
      // centeredSlide: true,
      
    
      // If we need pagination
      pagination: {
        el: '.rooms__swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.rooms__swiper-button-next',
      },
    });

          //! tips-swiper

   const tipsSwiper = new Swiper('.tips__swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      spaceBetween: 19,
      slidesPerGroup: 1,
      slidesPerView: 3,
      centeredSlides: true,
      speed: 600,
      
       breakpoints: {
        320: {
          centeredSlides: true,
          slidesPerView: 1,
        },
        668.98: {
          centeredSlides: false,
          slidesPerView: 2,
        },
        991.98: {
          centeredSlides: true,
          slidesPerView: 3,
        }
       },
      // If we need pagination
      pagination: {
        el: '.tips__swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        prevEl: '.tips__swiper-button-prev',
        nextEl: '.tips__swiper-button-next',
      },
    });

    //! products

    let productsBtn = document.querySelector('.products__show-more');

    productsBtn.addEventListener('click', function(e) {
      getProducts(productsBtn);
      e.preventDefault();
    });

    async function getProducts(button) {
      if (!button.classList.contains('hold')) {
        button.classList.add('hold');
        const file = 'json/products.json';
        let response = await fetch(file, {
          method: "GET"
        });
        if (response.ok) {
          let result = await response.json();
          loadProducts(result);
          button.classList.remove('hold');
          button.remove();
        } else {
          alert("error");
        }
      }
    }

    function loadProducts(data) {
       let productsItems = document.querySelector('.products__items');

       data.products.forEach(item => {
        let productId = item.id;
        let productUrl = item.url;
        let productImage = item.image;
        let productTitle = item.title;
        let productText = item.text;
        let productPrice = item.price;
        let productOldPrice = item.priceOld;
        let productShareUrl = item.shareUrl;
        let productLikeUrl = item.likeUrl;
        let productLabels = item.labels;

        let productTemplateStart = `<article data-pid="${productId}" class="products__item">`;
        let productTemplateEnd = `</article>`;

        let productTemplateLabels = '';
        if (productLabels) {
          let productTemplateLabelsStart = `<div class="products__item-labels">`;
          let productTemplateLabelsEnd = `</div>`;
          let productTemplateLabelsContent = '';

          productLabels.forEach(labelItem => {
            productTemplateLabelsContent += `<div class="products__item-label products__item-label_${labelItem.type}">${labelItem.value}</div>`;
          });

          productTemplateLabels += productTemplateLabelsStart;
          productTemplateLabels += productTemplateLabelsContent;
          productTemplateLabels += productTemplateLabelsEnd;
        }

        let productTemplateImage = `
        <a href="${productUrl}" class="products__item-img">
          <img src="img/${productImage}" alt="${productTitle}">
        </a>
        `;

        let productTemplateBodyStart = `<div class="products__item-inner">`;
        let productTemplateBodyEnd = `</div>`;

        let productTemplateBodyContent = `
          <div class="products__item-content">
            <div class="products__item-title products-title">${productTitle}</div>
            <div class="products__item-text products-text">${productText}</div>
          </div>
        `;

        let productTemplateBodyPrices = '';
        let productTemplatePricesStart = `<div class="products__item-prices">`;
        let productTemplatePricesCurrent = `<div class="products__item-price products-price">Rp ${productPrice}</div>`;
        let productTemplatePricesOld = `<div class="products__item-price_old products-price_old">Rp ${productOldPrice}</div>`;
        let productTemplatePricesEnd = '</div>';
      
        productTemplateBodyPrices += productTemplatePricesStart;
        productTemplateBodyPrices += productTemplatePricesCurrent;
        if (productOldPrice) {
          productTemplateBodyPrices += productTemplatePricesOld;
        }
        productTemplateBodyPrices += productTemplatePricesEnd;

        let productTemplateBodyActions = `
          <div class="products__item-actions">
            <div class="products__item-actions-inner">
              <a href="#" onclick="return false" class="products__item-actions-btn">Add to cart</a>
              <a href="#" class="products__item-actions-share">Share</a>
              <a href="#" class="products__item-actions-like">Like</a>
            </div>
          </div>
        `;
      
        let productTemplateBody = '';
        productTemplateBody += productTemplateBodyStart;
        productTemplateBody += productTemplateBodyContent;
        productTemplateBody += productTemplateBodyPrices;
        productTemplateBody += productTemplateBodyActions;
        productTemplateBody += productTemplateBodyEnd;
      
        let productTemplate = '';
        productTemplate += productTemplateStart;
        productTemplate += productTemplateLabels;
        productTemplate += productTemplateImage;
        productTemplate += productTemplateBody;
        productTemplate += productTemplateEnd;

        productsItems.insertAdjacentHTML('beforeend', productTemplate);
      });
    }

    //! add to cart
    let main = document.querySelector('.main');
    main.addEventListener('click', mainActions);

    function mainActions(e) {
      
      const targetEl = e.target;

      if (targetEl.classList.contains('products__item-actions-btn')) {
        const productId = targetEl.closest('.products__item').dataset.pid;
        addToCart(targetEl, productId);
      }
      

    }

    function addToCart(productButton, productId) {
      if (!productButton.classList.contains('hold')) {
        productButton.classList.add('hold');
        productButton.classList.add('fly');

        const cart = document.querySelector('.cart-header__logo');
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const productImage = product.querySelector('.products__item-img');

        const productImageFly = productImage.cloneNode(true);

        const productImageFlyWidth = productImage.offsetWidth;
        const productImageFlyHeight = productImage.offsetHeight;
        const productImageFlyTop = productImage.getBoundingClientRect().top;
        const productImageFlyLeft = productImage.getBoundingClientRect().left;

        productImageFly.setAttribute('class', 'flyimage');
        productImageFly.style.cssText = 
        `
          left: ${productImageFlyLeft}px;
          top: ${productImageFlyTop}px;
          width: ${productImageFlyWidth}px;
          height: ${productImageFlyHeight}px;
        `;

        document.body.append(productImageFly);

        const cartflyLeft = cart.getBoundingClientRect().left;
        const cartflyTop = cart.getBoundingClientRect().top;

        productImageFly.style.cssText = 
        `
          left: ${cartflyLeft}px;
          top: ${cartflyTop}px;
          width: 0px;
          height: 0px;
          opacity: 0;
        `;

        productImageFly.addEventListener('transitionend', function() {
          if (productButton.classList.contains('fly')) {
            productImageFly.remove();
            updateCart(productButton, productId);
            productButton.classList.remove('fly');
          }
        });


      }
    }

    function updateCart(productButton, productId, productAdd = true) {
      const cart = document.querySelector('.cart-header');
      const cartIcon = cart.querySelector('.cart-header__logo');
      const cartQuantity = cartIcon.querySelector('span');
      const cartProduct = document.querySelector(`[data-cartpid="${productId}"]`);
      const cartList = document.querySelector('.cart-header__list');


      //adding product
      if (productAdd) {
        if (cartQuantity) {
          cartQuantity.innerHTML = ++cartQuantity.innerHTML;
        } else {
          cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
        }
        if (!cartProduct) {
          const product = document.querySelector(`[data-pid="${productId}"]`);
          const cartProductImage = product.querySelector('.products__item-img').innerHTML;
          const cartProductTitle = product.querySelector('.products__item-title').innerHTML;
          const cartProductContent = 
          `
            <a href="" class="cart-list__image">${cartProductImage}</a>
            <div class="cart-list__body">
              <a href="" class="cart-list__title">${cartProductTitle}</a>
              <div class="cart-list__quantity">Quantity: <span>1</span></div>
              <a href="" onclick="return false" class="cart-list__delete">Delete</a>
            </div>
          `;
          cartList.insertAdjacentHTML('beforeend', `<li data-cartpid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
        } else {
          let cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
          cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
        }

        productButton.classList.remove('hold');
      } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
        if (!parseInt(cartProductQuantity.innerHTML)) {
          cartProduct.remove();
        }

        const cartQuantityValue = --cartQuantity.innerHTML;
        console.log(cartQuantityValue);

        if (cartQuantityValue) {
          cartQuantity.innerHTML = cartQuantityValue;
        } else {
          cartQuantity.remove();
          document.querySelector('.cart-header__inner').classList.remove('active');
        }
      }
    }

    let cartHeader = document.querySelector('.cart-header');
    cartHeader.addEventListener('click', function(e) {
      const targetEl = e.target;

      if (targetEl.classList.contains('cart-list__delete')) {
        const productId = targetEl.closest('.cart-list__item').dataset.cartpid;
        updateCart(targetEl, productId, false);
      }

    });

    let cartIcon = document.querySelector('.cart-header__logo');
    cartIcon.addEventListener('click', function(e) {
        document.querySelector('.cart-header__inner').classList.toggle('active');
        e.preventDefault();
    });

  

};

