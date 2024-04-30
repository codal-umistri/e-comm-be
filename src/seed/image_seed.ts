import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const products = [
    {
      product_id: 1,
      image_data: [
        'https://cdn.dummyjson.com/product-images/1/1.jpg',
        'https://cdn.dummyjson.com/product-images/1/2.jpg',
        'https://cdn.dummyjson.com/product-images/1/3.jpg',
        'https://cdn.dummyjson.com/product-images/1/4.jpg',
        'https://cdn.dummyjson.com/product-images/1/// thumbnail.jpg',
      ],
    },
    {
      product_id: 2,
      image_data: [
        'https://cdn.dummyjson.com/product-images/2/1.jpg',
        'https://cdn.dummyjson.com/product-images/2/2.jpg',
        'https://cdn.dummyjson.com/product-images/2/3.jpg',
        'https://cdn.dummyjson.com/product-images/2/// thumbnail.jpg',
      ],
    },
    {
      product_id: 3,
      image_data: ['https://cdn.dummyjson.com/product-images/3/1.jpg'],
    },
    {
      product_id: 4,
      image_data: [
        'https://cdn.dummyjson.com/product-images/4/1.jpg',
        'https://cdn.dummyjson.com/product-images/4/2.jpg',
        'https://cdn.dummyjson.com/product-images/4/3.jpg',
        'https://cdn.dummyjson.com/product-images/4/4.jpg',
        'https://cdn.dummyjson.com/product-images/4/// thumbnail.jpg',
      ],
    },
    {
      product_id: 5,
      image_data: [
        'https://cdn.dummyjson.com/product-images/5/1.jpg',
        'https://cdn.dummyjson.com/product-images/5/2.jpg',
        'https://cdn.dummyjson.com/product-images/5/3.jpg',
      ],
    },
    {
      product_id: 6,
      image_data: [
        'https://cdn.dummyjson.com/product-images/6/1.png',
        'https://cdn.dummyjson.com/product-images/6/2.jpg',
        'https://cdn.dummyjson.com/product-images/6/3.png',
        'https://cdn.dummyjson.com/product-images/6/4.jpg',
      ],
    },
    {
      product_id: 7,
      image_data: [
        'https://cdn.dummyjson.com/product-images/7/1.jpg',
        'https://cdn.dummyjson.com/product-images/7/2.jpg',
        'https://cdn.dummyjson.com/product-images/7/3.jpg',
        'https://cdn.dummyjson.com/product-images/7/// thumbnail.jpg',
      ],
    },
    {
      product_id: 8,
      image_data: [
        'https://cdn.dummyjson.com/product-images/8/1.jpg',
        'https://cdn.dummyjson.com/product-images/8/2.jpg',
        'https://cdn.dummyjson.com/product-images/8/3.jpg',
        'https://cdn.dummyjson.com/product-images/8/4.jpg',
        'https://cdn.dummyjson.com/product-images/8/// thumbnail.jpg',
      ],
    },
    {
      product_id: 9,
      image_data: [
        'https://cdn.dummyjson.com/product-images/9/1.jpg',
        'https://cdn.dummyjson.com/product-images/9/2.png',
        'https://cdn.dummyjson.com/product-images/9/3.png',
        'https://cdn.dummyjson.com/product-images/9/4.jpg',
        'https://cdn.dummyjson.com/product-images/9/// thumbnail.jpg',
      ],
    },
    {
      product_id: 10,
      image_data: [
        'https://cdn.dummyjson.com/product-images/10/1.jpg',
        'https://cdn.dummyjson.com/product-images/10/2.jpg',
        'https://cdn.dummyjson.com/product-images/10/3.jpg',
        'https://cdn.dummyjson.com/product-images/10/// thumbnail.jpeg',
      ],
    },
    {
      product_id: 11,
      image_data: [
        'https://cdn.dummyjson.com/product-images/11/1.jpg',
        'https://cdn.dummyjson.com/product-images/11/2.jpg',
        'https://cdn.dummyjson.com/product-images/11/3.jpg',
        'https://cdn.dummyjson.com/product-images/11/// thumbnail.jpg',
      ],
    },
    {
      product_id: 12,
      image_data: [
        'https://cdn.dummyjson.com/product-images/12/1.jpg',
        'https://cdn.dummyjson.com/product-images/12/2.jpg',
        'https://cdn.dummyjson.com/product-images/12/3.png',
        'https://cdn.dummyjson.com/product-images/12/4.jpg',
        'https://cdn.dummyjson.com/product-images/12/// thumbnail.jpg',
      ],
    },
    {
      product_id: 13,
      image_data: [
        'https://cdn.dummyjson.com/product-images/13/1.jpg',
        'https://cdn.dummyjson.com/product-images/13/2.png',
        'https://cdn.dummyjson.com/product-images/13/3.jpg',
        'https://cdn.dummyjson.com/product-images/13/4.jpg',
        'https://cdn.dummyjson.com/product-images/13/// thumbnail.webp',
      ],
    },
    {
      product_id: 14,
      image_data: [
        'https://cdn.dummyjson.com/product-images/14/1.jpg',
        'https://cdn.dummyjson.com/product-images/14/2.jpg',
        'https://cdn.dummyjson.com/product-images/14/3.jpg',
        'https://cdn.dummyjson.com/product-images/14/// thumbnail.jpg',
      ],
    },
    {
      product_id: 15,
      image_data: [
        'https://cdn.dummyjson.com/product-images/15/1.jpg',
        'https://cdn.dummyjson.com/product-images/15/2.jpg',
        'https://cdn.dummyjson.com/product-images/15/3.jpg',
        'https://cdn.dummyjson.com/product-images/15/4.jpg',
        'https://cdn.dummyjson.com/product-images/15/// thumbnail.jpg',
      ],
    },
    {
      product_id: 16,
      image_data: [
        'https://cdn.dummyjson.com/product-images/16/1.png',
        'https://cdn.dummyjson.com/product-images/16/2.webp',
        'https://cdn.dummyjson.com/product-images/16/3.jpg',
        'https://cdn.dummyjson.com/product-images/16/4.jpg',
        'https://cdn.dummyjson.com/product-images/16/// thumbnail.jpg',
      ],
    },
    {
      product_id: 17,
      image_data: [
        'https://cdn.dummyjson.com/product-images/17/1.jpg',
        'https://cdn.dummyjson.com/product-images/17/2.jpg',
        'https://cdn.dummyjson.com/product-images/17/3.jpg',
        'https://cdn.dummyjson.com/product-images/17/// thumbnail.jpg',
      ],
    },
    {
      product_id: 18,
      image_data: [
        'https://cdn.dummyjson.com/product-images/18/1.jpg',
        'https://cdn.dummyjson.com/product-images/18/2.jpg',
        'https://cdn.dummyjson.com/product-images/18/3.jpg',
        'https://cdn.dummyjson.com/product-images/18/4.jpg',
        'https://cdn.dummyjson.com/product-images/18/// thumbnail.jpg',
      ],
    },
    {
      product_id: 19,
      image_data: [
        'https://cdn.dummyjson.com/product-images/19/1.jpg',
        'https://cdn.dummyjson.com/product-images/19/2.jpg',
        'https://cdn.dummyjson.com/product-images/19/3.png',
        'https://cdn.dummyjson.com/product-images/19/// thumbnail.jpg',
      ],
    },
    {
      product_id: 20,
      image_data: [
        'https://cdn.dummyjson.com/product-images/20/1.jpg',
        'https://cdn.dummyjson.com/product-images/20/2.jpg',
        'https://cdn.dummyjson.com/product-images/20/3.jpg',
        'https://cdn.dummyjson.com/product-images/20/4.jpg',
        'https://cdn.dummyjson.com/product-images/20/// thumbnail.jpg',
      ],
    },
    {
      product_id: 21,
      image_data: [
        'https://cdn.dummyjson.com/product-images/21/1.png',
        'https://cdn.dummyjson.com/product-images/21/2.jpg',
        'https://cdn.dummyjson.com/product-images/21/3.jpg',
      ],
    },
    {
      product_id: 22,
      image_data: [
        'https://cdn.dummyjson.com/product-images/22/1.jpg',
        'https://cdn.dummyjson.com/product-images/22/2.jpg',
        'https://cdn.dummyjson.com/product-images/22/3.jpg',
      ],
    },
    {
      product_id: 23,
      image_data: [
        'https://cdn.dummyjson.com/product-images/23/1.jpg',
        'https://cdn.dummyjson.com/product-images/23/2.jpg',
        'https://cdn.dummyjson.com/product-images/23/3.jpg',
        'https://cdn.dummyjson.com/product-images/23/4.jpg',
        'https://cdn.dummyjson.com/product-images/23/// thumbnail.jpg',
      ],
    },
    {
      product_id: 24,
      image_data: [
        'https://cdn.dummyjson.com/product-images/24/1.jpg',
        'https://cdn.dummyjson.com/product-images/24/2.jpg',
        'https://cdn.dummyjson.com/product-images/24/3.jpg',
        'https://cdn.dummyjson.com/product-images/24/4.jpg',
        'https://cdn.dummyjson.com/product-images/24/// thumbnail.jpg',
      ],
    },
    {
      product_id: 25,
      image_data: [
        'https://cdn.dummyjson.com/product-images/25/1.png',
        'https://cdn.dummyjson.com/product-images/25/2.jpg',
        'https://cdn.dummyjson.com/product-images/25/3.png',
        'https://cdn.dummyjson.com/product-images/25/4.jpg',
        'https://cdn.dummyjson.com/product-images/25/// thumbnail.jpg',
      ],
    },
    {
      product_id: 26,
      image_data: [
        'https://cdn.dummyjson.com/product-images/26/1.jpg',
        'https://cdn.dummyjson.com/product-images/26/2.jpg',
        'https://cdn.dummyjson.com/product-images/26/3.jpg',
        'https://cdn.dummyjson.com/product-images/26/4.jpg',
        'https://cdn.dummyjson.com/product-images/26/5.jpg',
        'https://cdn.dummyjson.com/product-images/26/// thumbnail.jpg',
      ],
    },
    {
      product_id: 27,
      image_data: [
        'https://cdn.dummyjson.com/product-images/27/1.jpg',
        'https://cdn.dummyjson.com/product-images/27/2.jpg',
        'https://cdn.dummyjson.com/product-images/27/3.jpg',
        'https://cdn.dummyjson.com/product-images/27/4.jpg',
        'https://cdn.dummyjson.com/product-images/27/// thumbnail.webp',
      ],
    },
    {
      product_id: 28,
      image_data: [
        'https://cdn.dummyjson.com/product-images/28/1.jpg',
        'https://cdn.dummyjson.com/product-images/28/2.jpg',
        'https://cdn.dummyjson.com/product-images/28/3.png',
        'https://cdn.dummyjson.com/product-images/28/4.jpg',
        'https://cdn.dummyjson.com/product-images/28/// thumbnail.jpg',
      ],
    },
    {
      product_id: 29,
      image_data: [
        'https://cdn.dummyjson.com/product-images/29/1.jpg',
        'https://cdn.dummyjson.com/product-images/29/2.jpg',
        'https://cdn.dummyjson.com/product-images/29/3.webp',
        'https://cdn.dummyjson.com/product-images/29/4.webp',
        'https://cdn.dummyjson.com/product-images/29/// thumbnail.webp',
      ],
    },
    {
      product_id: 30,
      image_data: [
        'https://cdn.dummyjson.com/product-images/30/1.jpg',
        'https://cdn.dummyjson.com/product-images/30/2.jpg',
        'https://cdn.dummyjson.com/product-images/30/3.jpg',
        'https://cdn.dummyjson.com/product-images/30/// thumbnail.jpg',
      ],
    },
    {
      product_id: 31,
      image_data: [
        'https://cdn.dummyjson.com/product-images/31/1.jpg',
        'https://cdn.dummyjson.com/product-images/31/2.jpg',
        'https://cdn.dummyjson.com/product-images/31/3.jpg',
        'https://cdn.dummyjson.com/product-images/31/4.jpg',
        'https://cdn.dummyjson.com/product-images/31/// thumbnail.jpg',
      ],
    },
    {
      product_id: 32,
      image_data: [
        'https://cdn.dummyjson.com/product-images/32/1.jpg',
        'https://cdn.dummyjson.com/product-images/32/2.jpg',
        'https://cdn.dummyjson.com/product-images/32/3.jpg',
        'https://cdn.dummyjson.com/product-images/32/// thumbnail.jpg',
      ],
    },
    {
      product_id: 33,
      image_data: [
        'https://cdn.dummyjson.com/product-images/33/1.jpg',
        'https://cdn.dummyjson.com/product-images/33/2.jpg',
        'https://cdn.dummyjson.com/product-images/33/3.jpg',
        'https://cdn.dummyjson.com/product-images/33/4.jpg',
        'https://cdn.dummyjson.com/product-images/33/// thumbnail.jpg',
      ],
    },
    {
      product_id: 34,
      image_data: [
        'https://cdn.dummyjson.com/product-images/34/1.jpg',
        'https://cdn.dummyjson.com/product-images/34/2.jpg',
        'https://cdn.dummyjson.com/product-images/34/3.jpg',
        'https://cdn.dummyjson.com/product-images/34/4.jpg',
        'https://cdn.dummyjson.com/product-images/34/// thumbnail.jpg',
      ],
    },
    {
      product_id: 35,
      image_data: [
        'https://cdn.dummyjson.com/product-images/35/1.jpg',
        'https://cdn.dummyjson.com/product-images/35/2.jpg',
        'https://cdn.dummyjson.com/product-images/35/3.jpg',
        'https://cdn.dummyjson.com/product-images/35/4.jpg',
        'https://cdn.dummyjson.com/product-images/35/// thumbnail.jpg',
      ],
    },
    {
      product_id: 36,
      image_data: [
        'https://cdn.dummyjson.com/product-images/36/1.jpg',
        'https://cdn.dummyjson.com/product-images/36/2.webp',
        'https://cdn.dummyjson.com/product-images/36/3.webp',
        'https://cdn.dummyjson.com/product-images/36/4.jpg',
        'https://cdn.dummyjson.com/product-images/36/// thumbnail.jpg',
      ],
    },
    {
      product_id: 37,
      image_data: [
        'https://cdn.dummyjson.com/product-images/37/1.jpg',
        'https://cdn.dummyjson.com/product-images/37/2.jpg',
        'https://cdn.dummyjson.com/product-images/37/3.jpg',
        'https://cdn.dummyjson.com/product-images/37/4.jpg',
        'https://cdn.dummyjson.com/product-images/37/// thumbnail.jpg',
      ],
    },
    {
      product_id: 38,
      image_data: [
        'https://cdn.dummyjson.com/product-images/38/1.png',
        'https://cdn.dummyjson.com/product-images/38/2.jpg',
        'https://cdn.dummyjson.com/product-images/38/3.jpg',
        'https://cdn.dummyjson.com/product-images/38/4.jpg',
      ],
    },
    {
      product_id: 39,
      image_data: [
        'https://cdn.dummyjson.com/product-images/39/1.jpg',
        'https://cdn.dummyjson.com/product-images/39/2.jpg',
        'https://cdn.dummyjson.com/product-images/39/3.jpg',
        'https://cdn.dummyjson.com/product-images/39/4.jpg',
        'https://cdn.dummyjson.com/product-images/39/// thumbnail.jpg',
      ],
    },
    {
      product_id: 40,
      image_data: [
        'https://cdn.dummyjson.com/product-images/40/1.jpg',
        'https://cdn.dummyjson.com/product-images/40/2.jpg',
      ],
    },
    {
      product_id: 41,
      image_data: [
        'https://cdn.dummyjson.com/product-images/41/1.jpg',
        'https://cdn.dummyjson.com/product-images/41/2.webp',
        'https://cdn.dummyjson.com/product-images/41/3.jpg',
        'https://cdn.dummyjson.com/product-images/41/4.jpg',
        'https://cdn.dummyjson.com/product-images/41/// thumbnail.webp',
      ],
    },
    {
      product_id: 42,
      image_data: [
        'https://cdn.dummyjson.com/product-images/42/1.png',
        'https://cdn.dummyjson.com/product-images/42/2.png',
        'https://cdn.dummyjson.com/product-images/42/3.png',
        'https://cdn.dummyjson.com/product-images/42/4.jpg',
        'https://cdn.dummyjson.com/product-images/42/// thumbnail.jpg',
      ],
    },
    {
      product_id: 43,
      image_data: [
        'https://cdn.dummyjson.com/product-images/43/1.jpg',
        'https://cdn.dummyjson.com/product-images/43/2.jpg',
        'https://cdn.dummyjson.com/product-images/43/3.jpg',
        'https://cdn.dummyjson.com/product-images/43/4.jpg',
        'https://cdn.dummyjson.com/product-images/43/// thumbnail.jpg',
      ],
    },
    {
      product_id: 44,
      image_data: [
        'https://cdn.dummyjson.com/product-images/44/1.jpg',
        'https://cdn.dummyjson.com/product-images/44/2.jpg',
        'https://cdn.dummyjson.com/product-images/44/3.jpg',
        'https://cdn.dummyjson.com/product-images/44/4.jpg',
        'https://cdn.dummyjson.com/product-images/44/// thumbnail.jpg',
      ],
    },
    {
      product_id: 45,
      image_data: [
        'https://cdn.dummyjson.com/product-images/45/1.jpg',
        'https://cdn.dummyjson.com/product-images/45/2.webp',
        'https://cdn.dummyjson.com/product-images/45/3.jpg',
        'https://cdn.dummyjson.com/product-images/45/4.jpg',
        'https://cdn.dummyjson.com/product-images/45/// thumbnail.jpg',
      ],
    },
    {
      product_id: 46,
      image_data: [
        'https://cdn.dummyjson.com/product-images/46/1.webp',
        'https://cdn.dummyjson.com/product-images/46/2.jpg',
        'https://cdn.dummyjson.com/product-images/46/3.jpg',
        'https://cdn.dummyjson.com/product-images/46/4.jpg',
        'https://cdn.dummyjson.com/product-images/46/// thumbnail.jpg',
      ],
    },
    {
      product_id: 47,
      image_data: [
        'https://cdn.dummyjson.com/product-images/47/1.jpg',
        'https://cdn.dummyjson.com/product-images/47/2.jpg',
        'https://cdn.dummyjson.com/product-images/47/3.jpg',
        'https://cdn.dummyjson.com/product-images/47/// thumbnail.jpeg',
      ],
    },
    {
      product_id: 48,
      image_data: [
        'https://cdn.dummyjson.com/product-images/48/1.jpg',
        'https://cdn.dummyjson.com/product-images/48/2.jpg',
        'https://cdn.dummyjson.com/product-images/48/3.jpg',
        'https://cdn.dummyjson.com/product-images/48/4.jpg',
        'https://cdn.dummyjson.com/product-images/48/// thumbnail.jpg',
      ],
    },
    {
      product_id: 49,
      image_data: [
        'https://cdn.dummyjson.com/product-images/49/1.jpg',
        'https://cdn.dummyjson.com/product-images/49/2.jpg',
        'https://cdn.dummyjson.com/product-images/49/3.webp',
        'https://cdn.dummyjson.com/product-images/49/// thumbnail.jpg',
      ],
    },
    {
      product_id: 50,
      image_data: [
        'https://cdn.dummyjson.com/product-images/50/1.jpeg',
        'https://cdn.dummyjson.com/product-images/50/2.jpg',
        'https://cdn.dummyjson.com/product-images/50/3.jpg',
      ],
    },
    {
      product_id: 51,
      image_data: [
        'https://cdn.dummyjson.com/product-images/51/1.png',
        'https://cdn.dummyjson.com/product-images/51/2.jpg',
        'https://cdn.dummyjson.com/product-images/51/3.jpg',
        'https://cdn.dummyjson.com/product-images/51/// thumbnail.jpg',
      ],
    },
    {
      product_id: 52,
      image_data: [
        'https://cdn.dummyjson.com/product-images/52/1.png',
        'https://cdn.dummyjson.com/product-images/52/2.png',
        'https://cdn.dummyjson.com/product-images/52/3.jpg',
        'https://cdn.dummyjson.com/product-images/52/4.jpg',
        'https://cdn.dummyjson.com/product-images/52/// thumbnail.jpg',
      ],
    },
    {
      product_id: 53,
      image_data: [
        'https://cdn.dummyjson.com/product-images/53/1.webp',
        'https://cdn.dummyjson.com/product-images/53/2.jpg',
        'https://cdn.dummyjson.com/product-images/53/3.jpg',
        'https://cdn.dummyjson.com/product-images/53/4.jpg',
        'https://cdn.dummyjson.com/product-images/53/// thumbnail.jpg',
      ],
    },
    {
      product_id: 54,
      image_data: [
        'https://cdn.dummyjson.com/product-images/54/1.jpg',
        'https://cdn.dummyjson.com/product-images/54/2.jpg',
        'https://cdn.dummyjson.com/product-images/54/3.jpg',
        'https://cdn.dummyjson.com/product-images/54/4.jpg',
        'https://cdn.dummyjson.com/product-images/54/// thumbnail.jpg',
      ],
    },
    {
      product_id: 55,
      image_data: [
        'https://cdn.dummyjson.com/product-images/55/1.jpg',
        'https://cdn.dummyjson.com/product-images/55/2.webp',
        'https://cdn.dummyjson.com/product-images/55/3.jpg',
        'https://cdn.dummyjson.com/product-images/55/4.jpg',
        'https://cdn.dummyjson.com/product-images/55/// thumbnail.jpg',
      ],
    },
    {
      product_id: 56,
      image_data: [
        'https://cdn.dummyjson.com/product-images/56/1.jpg',
        'https://cdn.dummyjson.com/product-images/56/2.jpg',
        'https://cdn.dummyjson.com/product-images/56/3.jpg',
        'https://cdn.dummyjson.com/product-images/56/4.jpg',
        'https://cdn.dummyjson.com/product-images/56/5.jpg',
        'https://cdn.dummyjson.com/product-images/56/// thumbnail.jpg',
      ],
    },
    {
      product_id: 57,
      image_data: [
        'https://cdn.dummyjson.com/product-images/57/1.jpg',
        'https://cdn.dummyjson.com/product-images/57/2.jpg',
        'https://cdn.dummyjson.com/product-images/57/3.jpg',
        'https://cdn.dummyjson.com/product-images/57/4.jpg',
        'https://cdn.dummyjson.com/product-images/57/// thumbnail.jpg',
      ],
    },
    {
      product_id: 58,
      image_data: [
        'https://cdn.dummyjson.com/product-images/58/1.jpg',
        'https://cdn.dummyjson.com/product-images/58/2.jpg',
        'https://cdn.dummyjson.com/product-images/58/3.jpg',
        'https://cdn.dummyjson.com/product-images/58/4.jpg',
        'https://cdn.dummyjson.com/product-images/58/// thumbnail.jpg',
      ],
    },
    {
      product_id: 59,
      image_data: [
        'https://cdn.dummyjson.com/product-images/59/1.jpg',
        'https://cdn.dummyjson.com/product-images/59/2.jpg',
        'https://cdn.dummyjson.com/product-images/59/3.jpg',
        'https://cdn.dummyjson.com/product-images/59/4.jpg',
        'https://cdn.dummyjson.com/product-images/59/// thumbnail.jpg',
      ],
    },
    {
      product_id: 60,
      image_data: [
        'https://cdn.dummyjson.com/product-images/60/1.jpg',
        'https://cdn.dummyjson.com/product-images/60/2.jpg',
        'https://cdn.dummyjson.com/product-images/60/3.jpg',
        'https://cdn.dummyjson.com/product-images/60/// thumbnail.jpg',
      ],
    },
    {
      product_id: 61,
      image_data: [
        'https://cdn.dummyjson.com/product-images/61/1.jpg',
        'https://cdn.dummyjson.com/product-images/61/2.png',
        'https://cdn.dummyjson.com/product-images/61/3.jpg',
      ],
    },
    {
      product_id: 62,
      image_data: [
        'https://cdn.dummyjson.com/product-images/62/1.jpg',
        'https://cdn.dummyjson.com/product-images/62/2.jpg',
      ],
    },
    {
      product_id: 63,
      image_data: [
        'https://cdn.dummyjson.com/product-images/63/1.jpg',
        'https://cdn.dummyjson.com/product-images/63/2.jpg',
        'https://cdn.dummyjson.com/product-images/63/3.png',
        'https://cdn.dummyjson.com/product-images/63/4.jpeg',
      ],
    },
    {
      product_id: 64,
      image_data: [
        'https://cdn.dummyjson.com/product-images/64/1.jpg',
        'https://cdn.dummyjson.com/product-images/64/2.webp',
        'https://cdn.dummyjson.com/product-images/64/3.jpg',
        'https://cdn.dummyjson.com/product-images/64/// thumbnail.jpg',
      ],
    },
    {
      product_id: 65,
      image_data: [
        'https://cdn.dummyjson.com/product-images/65/1.jpg',
        'https://cdn.dummyjson.com/product-images/65/2.webp',
        'https://cdn.dummyjson.com/product-images/65/3.jpg',
        'https://cdn.dummyjson.com/product-images/65/4.webp',
        'https://cdn.dummyjson.com/product-images/65/// thumbnail.webp',
      ],
    },
    {
      product_id: 71,
      image_data: [
        'https://cdn.dummyjson.com/product-images/71/1.jpg',
        'https://cdn.dummyjson.com/product-images/71/2.jpg',
        'https://cdn.dummyjson.com/product-images/71/3.webp',
        'https://cdn.dummyjson.com/product-images/71/// thumbnail.jpg',
      ],
    },
    {
      product_id: 72,
      image_data: [
        'https://cdn.dummyjson.com/product-images/72/1.jpg',
        'https://cdn.dummyjson.com/product-images/72/2.png',
        'https://cdn.dummyjson.com/product-images/72/3.webp',
        'https://cdn.dummyjson.com/product-images/72/4.jpg',
        'https://cdn.dummyjson.com/product-images/72/// thumbnail.webp',
      ],
    },
    {
      product_id: 73,
      image_data: [
        'https://cdn.dummyjson.com/product-images/73/1.jpg',
        'https://cdn.dummyjson.com/product-images/73/2.webp',
        'https://cdn.dummyjson.com/product-images/73/3.jpg',
        'https://cdn.dummyjson.com/product-images/73/// thumbnail.jpg',
      ],
    },
    {
      product_id: 74,
      image_data: [
        'https://cdn.dummyjson.com/product-images/74/1.jpg',
        'https://cdn.dummyjson.com/product-images/74/2.jpg',
        'https://cdn.dummyjson.com/product-images/74/3.jpg',
        'https://cdn.dummyjson.com/product-images/74/4.jpg',
        'https://cdn.dummyjson.com/product-images/74/// thumbnail.jpg',
      ],
    },
    {
      product_id: 75,
      image_data: [
        'https://cdn.dummyjson.com/product-images/75/1.jpg',
        'https://cdn.dummyjson.com/product-images/75/2.jpg',
        'https://cdn.dummyjson.com/product-images/75/3.jpg',
        'https://cdn.dummyjson.com/product-images/75/// thumbnail.jpg',
      ],
    },
    {
      product_id: 76,
      image_data: [
        'https://cdn.dummyjson.com/product-images/76/1.jpg',
        'https://cdn.dummyjson.com/product-images/76/2.jpg',
        'https://cdn.dummyjson.com/product-images/76/// thumbnail.jpg',
      ],
    },
    {
      product_id: 77,
      image_data: [
        'https://cdn.dummyjson.com/product-images/77/1.jpg',
        'https://cdn.dummyjson.com/product-images/77/2.jpg',
        'https://cdn.dummyjson.com/product-images/77/3.jpg',
        'https://cdn.dummyjson.com/product-images/77/// thumbnail.jpg',
      ],
    },
    {
      product_id: 78,
      image_data: [
        'https://cdn.dummyjson.com/product-images/78/// thumbnail.jpg',
      ],
    },
    {
      product_id: 79,
      image_data: ['https://cdn.dummyjson.com/product-images/79/1.jpg'],
    },
    {
      product_id: 80,
      image_data: [
        'https://cdn.dummyjson.com/product-images/80/1.jpg',
        'https://cdn.dummyjson.com/product-images/80/2.jpg',
        'https://cdn.dummyjson.com/product-images/80/3.png',
        'https://cdn.dummyjson.com/product-images/80/4.jpg',
        'https://cdn.dummyjson.com/product-images/80/// thumbnail.jpg',
      ],
    },
    {
      product_id: 81,
      image_data: [
        'https://cdn.dummyjson.com/product-images/81/1.jpg',
        'https://cdn.dummyjson.com/product-images/81/2.jpg',
        'https://cdn.dummyjson.com/product-images/81/3.jpg',
        'https://cdn.dummyjson.com/product-images/81/4.webp',
        'https://cdn.dummyjson.com/product-images/81/// thumbnail.jpg',
      ],
    },
    {
      product_id: 82,
      image_data: [
        'https://cdn.dummyjson.com/product-images/82/1.jpg',
        'https://cdn.dummyjson.com/product-images/82/2.webp',
        'https://cdn.dummyjson.com/product-images/82/3.jpg',
        'https://cdn.dummyjson.com/product-images/82/4.jpg',
        'https://cdn.dummyjson.com/product-images/82/// thumbnail.jpg',
      ],
    },
    {
      product_id: 83,
      image_data: [
        'https://cdn.dummyjson.com/product-images/83/1.jpg',
        'https://cdn.dummyjson.com/product-images/83/2.jpg',
        'https://cdn.dummyjson.com/product-images/83/3.jpg',
        'https://cdn.dummyjson.com/product-images/83/4.jpg',
        'https://cdn.dummyjson.com/product-images/83/// thumbnail.jpg',
      ],
    },
    {
      product_id: 84,
      image_data: [
        'https://cdn.dummyjson.com/product-images/84/1.jpg',
        'https://cdn.dummyjson.com/product-images/84/2.jpg',
        'https://cdn.dummyjson.com/product-images/84/// thumbnail.jpg',
      ],
    },
    {
      product_id: 85,
      image_data: [
        'https://cdn.dummyjson.com/product-images/85/1.jpg',
        'https://cdn.dummyjson.com/product-images/85/2.jpg',
        'https://cdn.dummyjson.com/product-images/85/// thumbnail.jpg',
      ],
    },
    {
      product_id: 86,
      image_data: [
        'https://cdn.dummyjson.com/product-images/86/1.jpg',
        'https://cdn.dummyjson.com/product-images/86/2.webp',
        'https://cdn.dummyjson.com/product-images/86/3.jpg',
        'https://cdn.dummyjson.com/product-images/86/4.jpg',
        'https://cdn.dummyjson.com/product-images/86/// thumbnail.jpg',
      ],
    },
    {
      product_id: 87,
      image_data: [
        'https://cdn.dummyjson.com/product-images/87/1.jpg',
        'https://cdn.dummyjson.com/product-images/87/2.jpg',
        'https://cdn.dummyjson.com/product-images/87/3.jpg',
        'https://cdn.dummyjson.com/product-images/87/4.jpg',
        'https://cdn.dummyjson.com/product-images/87/// thumbnail.jpg',
      ],
    },
    {
      product_id: 88,
      image_data: [
        'https://cdn.dummyjson.com/product-images/88/1.jpg',
        'https://cdn.dummyjson.com/product-images/88/2.jpg',
        'https://cdn.dummyjson.com/product-images/88/3.jpg',
        'https://cdn.dummyjson.com/product-images/88/4.webp',
        'https://cdn.dummyjson.com/product-images/88/// thumbnail.jpg',
      ],
    },
    {
      product_id: 89,
      image_data: [
        'https://cdn.dummyjson.com/product-images/89/1.jpg',
        'https://cdn.dummyjson.com/product-images/89/2.jpg',
        'https://cdn.dummyjson.com/product-images/89/3.jpg',
        'https://cdn.dummyjson.com/product-images/89/4.jpg',
        'https://cdn.dummyjson.com/product-images/89/// thumbnail.jpg',
      ],
    },
    {
      product_id: 90,
      image_data: [
        'https://cdn.dummyjson.com/product-images/90/1.jpg',
        'https://cdn.dummyjson.com/product-images/90/2.jpg',
        'https://cdn.dummyjson.com/product-images/90/3.jpg',
        'https://cdn.dummyjson.com/product-images/90/4.jpg',
        'https://cdn.dummyjson.com/product-images/90/// thumbnail.jpg',
      ],
    },
    {
      product_id: 91,
      image_data: [
        'https://cdn.dummyjson.com/product-images/91/1.jpg',
        'https://cdn.dummyjson.com/product-images/91/2.jpg',
        'https://cdn.dummyjson.com/product-images/91/3.jpg',
        'https://cdn.dummyjson.com/product-images/91/4.jpg',
        'https://cdn.dummyjson.com/product-images/91/// thumbnail.jpg',
      ],
    },
    {
      product_id: 92,
      image_data: [
        'https://cdn.dummyjson.com/product-images/92/1.jpg',
        'https://cdn.dummyjson.com/product-images/92/2.jpg',
        'https://cdn.dummyjson.com/product-images/92/3.jpg',
        'https://cdn.dummyjson.com/product-images/92/4.jpg',
      ],
    },
    {
      product_id: 93,
      image_data: [
        'https://cdn.dummyjson.com/product-images/93/1.jpg',
        'https://cdn.dummyjson.com/product-images/93/2.jpg',
        'https://cdn.dummyjson.com/product-images/93/3.jpg',
        'https://cdn.dummyjson.com/product-images/93/4.jpg',
        'https://cdn.dummyjson.com/product-images/93/// thumbnail.jpg',
      ],
    },
    {
      product_id: 94,
      image_data: [
        'https://cdn.dummyjson.com/product-images/94/1.webp',
        'https://cdn.dummyjson.com/product-images/94/2.jpg',
        'https://cdn.dummyjson.com/product-images/94/3.jpg',
        'https://cdn.dummyjson.com/product-images/94/// thumbnail.webp',
      ],
    },
    {
      product_id: 95,
      image_data: [
        'https://cdn.dummyjson.com/product-images/95/1.jpg',
        'https://cdn.dummyjson.com/product-images/95/2.jpg',
        'https://cdn.dummyjson.com/product-images/95/3.jpg',
        'https://cdn.dummyjson.com/product-images/95/4.jpg',
        'https://cdn.dummyjson.com/product-images/95/// thumbnail.jpg',
      ],
    },
    {
      product_id: 96,
      image_data: [
        'https://cdn.dummyjson.com/product-images/96/1.jpg',
        'https://cdn.dummyjson.com/product-images/96/2.jpg',
        'https://cdn.dummyjson.com/product-images/96/3.jpg',
        'https://cdn.dummyjson.com/product-images/96/4.jpg',
        'https://cdn.dummyjson.com/product-images/96/// thumbnail.jpg',
      ],
    },
    {
      product_id: 97,
      image_data: [
        'https://cdn.dummyjson.com/product-images/97/1.jpg',
        'https://cdn.dummyjson.com/product-images/97/2.jpg',
        'https://cdn.dummyjson.com/product-images/97/3.jpg',
        'https://cdn.dummyjson.com/product-images/97/4.webp',
        'https://cdn.dummyjson.com/product-images/97/// thumbnail.jpg',
      ],
    },
    {
      product_id: 98,
      image_data: [
        'https://cdn.dummyjson.com/product-images/98/1.jpg',
        'https://cdn.dummyjson.com/product-images/98/2.jpg',
        'https://cdn.dummyjson.com/product-images/98/3.jpg',
        'https://cdn.dummyjson.com/product-images/98/4.jpg',
        'https://cdn.dummyjson.com/product-images/98/// thumbnail.jpg',
      ],
    },
    {
      product_id: 99,
      image_data: [
        'https://cdn.dummyjson.com/product-images/99/1.jpg',
        'https://cdn.dummyjson.com/product-images/99/2.jpg',
        'https://cdn.dummyjson.com/product-images/99/3.jpg',
        'https://cdn.dummyjson.com/product-images/99/4.jpg',
        'https://cdn.dummyjson.com/product-images/99/// thumbnail.jpg',
      ],
    },
    {
      product_id: 100,
      image_data: [
        'https://cdn.dummyjson.com/product-images/100/1.jpg',
        'https://cdn.dummyjson.com/product-images/100/2.jpg',
        'https://cdn.dummyjson.com/product-images/100/3.jpg',
        'https://cdn.dummyjson.com/product-images/100/// thumbnail.jpg',
      ],
    },
  ];

  products.forEach((product) => {
    const productId = product.product_id;

    product.image_data.forEach(async (imagurl) => {
      await knex('image').insert({
        product_id: productId,
        image_data: imagurl,
      });
    });
  });
}
