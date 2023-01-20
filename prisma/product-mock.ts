const getRandomPrice = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const PRODUCT = {
  SNEAKERS: [
    {
      name: 'Sneakers 01',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/314105364104?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 02',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/315241726702?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 03',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/314103646304?wid=267&hei=267&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 04',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/315214490302?wid=267&hei=267&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 05',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/315241726702?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 06',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/315214486102?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 07',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/314205109904?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 08',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/314100358804?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 09',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/315347167702?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Sneakers 10',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 신발 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 1,
      image_url:
        'https://images.footlocker.com/is/image/FLEU/314100405704?wid=500&hei=500&fmt=png-alpha',
      price: getRandomPrice(300000, 100000),
    },
  ],
  'T-SHIRT': [
    {
      name: 'T-Shirt 01',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v000908/LO/19/80/15/92/73/_1/98/01/59/27/4/LO1980159273_1980159274_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 02',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v172554/LO/18/22/37/47/46/_1/82/23/74/74/7/LO1822374746_1822374747_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 03',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v142749/LO/19/71/07/97/47/_1/97/10/79/75/1/LO1971079747_1971079751_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 04',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v130602/LI/20/72/93/16/13/_6/LI2072931613_6_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 05',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v013615/LI/12/74/60/85/_1/LI12746085_1_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 06',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/LO/20/25/63/89/37/_2/02/56/38/93/8/LO2025638937_2025638938_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 07',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v110839/LE/12/02/36/24/45/_1/21/20/87/06/1/LE1202362445_1212087061_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 08',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v170838/LE/12/08/99/83/76/_1/24/87/14/26/1/LE1208998376_1248714261_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 09',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v173836/LE/12/08/33/55/48/_1/24/53/80/69/5/LE1208335548_1245380695_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'T-Shirt 10',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 티셔츠 입니다. 아무나 신을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 2,
      image_url:
        'https://contents.lotteon.com/itemimage/_v000937/LE/12/12/28/28/06/_1/26/97/28/07/8/LE1212282806_1269728078_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
  ],
  PANTS: [
    {
      name: 'Pants 01',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/LO/20/50/33/02/36/_2/05/03/30/23/7/LO2050330236_2050330237_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 02',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v003555/LO/17/71/80/83/19/_1/77/18/08/32/0/LO1771808319_1771808320_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 03',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v181839/LE/12/06/24/66/00/_1/23/41/82/04/0/LE1206246600_1234182040_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 04',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v194837/LE/12/12/56/18/96/_1/27/13/82/32/8/LE1212561896_1271382328_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 05',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v011016/LE/12/12/87/56/92/_1/27/31/63/35/8/LE1212875692_1273163358_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 06',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v232033/LE/12/02/47/85/87/_1/21/27/55/03/3/LE1202478587_1212755033_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 07',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v141831/LE/12/12/84/05/95/_1/27/29/74/27/9/LE1212840595_1272974279_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 08',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v232035/LE/12/02/47/72/75/_1/21/27/49/45/5/LE1202477275_1212749455_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 09',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/LO/19/41/91/71/30/_1/94/19/17/13/1/LO1941917130_1941917131_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Pants 10',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 바지 입니다. 아무나 입을 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 3,
      image_url:
        'https://contents.lotteon.com/itemimage/_v114645/LI/19/98/60/72/09/_4/LI1998607209_4_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
  ],
  CAP: [
    {
      name: 'Cap 01',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v161708/LI/19/30/81/06/52/_2/LI1930810652_2_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 02',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v174046/LI/20/45/38/06/99/_1/LI2045380699_1_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 03',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v145740/LO/20/15/73/02/66/_2/01/57/30/26/7/LO2015730266_2015730267_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 04',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v143052/LO/20/15/71/35/95/_2/01/57/13/59/6/LO2015713595_2015713596_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 05',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v211941/LO/20/14/45/50/24/_2/01/44/55/02/5/LO2014455024_2014455025_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 06',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v215853/LO/20/11/19/58/74/_2/01/11/95/87/5/LO2011195874_2011195875_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 07',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v091506/LO/19/58/24/64/28/_1/95/82/46/42/9/LO1958246428_1958246429_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 08',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v170101/LO/15/98/46/10/24/_1/59/84/61/02/5/LO1598461024_1598461025_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 09',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v105734/LO/19/30/91/53/67/_1/93/09/15/36/8/LO1930915367_1930915368_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Cap 10',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 4,
      image_url:
        'https://contents.lotteon.com/itemimage/_v141107/LE/12/12/16/44/85/_1/26/90/36/19/4/LE1212164485_1269036194_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
  ],
  HOODIE: [
    {
      name: 'Hoodie 01',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v154347/LE/12/08/71/72/82/_1/24/72/84/27/9/LE1208717282_1247284279_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 02',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v221824/LO/20/13/30/81/93/_2/01/33/08/19/4/LO2013308193_2013308194_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 03',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v162843/LE/12/11/61/15/87/_1/26/57/24/36/6/LE1211611587_1265724366_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 04',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v210838/LE/12/12/11/58/87/_1/26/87/58/44/9/LE1212115887_1268758449_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 05',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v151814/LE/12/05/61/91/63/_1/23/07/90/60/5/LE1205619163_1230790605_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 06',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v172928/LO/14/40/12/34/89/_1/44/01/23/49/0/LO1440123489_1440123490_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 07',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v171632/LE/12/12/55/13/33/_1/27/13/76/36/3/LE1212551333_1271376363_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 08',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v095145/LO/19/62/02/43/24/_1/96/20/24/32/5/LO1962024324_1962024325_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 09',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v162010/LE/12/11/92/52/39/_1/26/76/69/01/2/LE1211925239_1267669012_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
    {
      name: 'Hoodie 10',
      contents: `{"blocks":[{"key":"csl9v","text":"명품 모자 입니다. 아무나 쓸 수 없어요.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      category_id: 5,
      image_url:
        'https://contents.lotteon.com/itemimage/_v174449/LO/19/73/58/58/25/_1/97/35/85/82/6/LO1973585825_1973585826_1.jpg/dims/optimize/dims/resizemc/500x500',
      price: getRandomPrice(300000, 100000),
    },
  ],
};
