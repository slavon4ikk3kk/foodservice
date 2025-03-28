import images from "../assets/index.js";

const Dishes = [
  {
    id: "hekCutlet",
    name: "Котлети з риби (хек)",
    ingredients:
      "філе риби (хек), цибуля ріпчаста, морква, хліб білий, молоко, яйця курячі, сіль, перець чорний мелений, панірувальні сухарі.",
    methodCooking:
      "не розморожуючи, обсмажити на рослинній олії з обох сторін до рум’яної скоринки, накрити кришкою та довести до готовності.",
    image: images.hekCutlets,
    price: 260,
  },
  {
    id: "cutletThreeMeats",
    name: "Котлети з 3-х видів м’яса",
    ingredients:
      "яловичина, свинина, курятина, хліб білий, молоко, ріпчаста цибуля, яйця курячі, сіль, перець чорний мелений, панірувальні сухарі.",
    methodCooking:
      "не розморожуючи, обсмажити на рослинній олії з обох сторін до рум’яної скоринки, накрити кришкою та довести до готовності.",
    price: 310,
    image: images.cutlets,
  },
  {
    id: "cutletPoKyivski",
    name: "Котлети по-київські",
    ingredients:
      "куряче філе, ріпчаста цибуля, масло вершкове, кріп свіжий, сіль, перець чорний мелений, панірувальні сухарі.",
    methodCooking:
      " не розморожуючи, обсмажити в сотейнику у великій кількості рослинної олії.",
    price: 370,
    image: images.kyivski,
  },
  {
    id: "cabbageRollsMeat",
    name: "Голубці з м’ясом",
    ingredients:
      "капуста білокачанна, цибуля ріпчаста, морква свіжа, рис круглий, свинина, яловичина, сіль, перець чорний мелений.",
    methodCooking:
      "обсмажити на пательні цибулю з морквою на олії до золотистого кольору, додаємо томатну пасту та цукор з сіллю за смаком, тушкувати 5 хв. Густоту підливи регулюємо водою. Заливаємо підливою та тушкуємо на маленькому вогні або запікаємо у духовці до готовності. Додаємо сметану за смаком. ",
    price: 260,
    image: images.holubsi,
  },
  {
    id: "pepper",
    name: "Перець фарширований з м’ясом",
    ingredients:
      "крупа рисова відварена, свинина знежилована напівжирна, перець болгарський, цибуля ріпчаста смажена, морква смажена, олія соняшникова рафінована, сіль кухонна, перець чорний мелений.",
    methodCooking:
      "обсмажити на пательні цибулю з морквою на олії до золотистого кольору, додаємо томатну пасту та цукор з сіллю за смаком, тушкувати 5 хв. Густоту підливи регулюємо водою. Заливаємо підливою та тушкуємо на маленькому вогні або запікаємо у духовці до готовності. Додаємо сметану за смаком. ",
    price: 300,
    image: images.paper,
  },
  {
    id: "pancakesMeat",
    name: "Млинці з м’ясом",
    ingredients:
      "борошно пшеничне в/г, молоко, олія соняшникова, яйця курячі, вода, свинина, цибуля ріпчаста, цукор, сіль, перець чорний мелений.",
    methodCooking:
      "не розморожуючи, обсмажити на пательні під кришкою з обох боків до рум’яної скоринки.",
    price: 240,
    image: images.pancakes,
  },
  {
    id: "pancakesChickenMushrooms",
    name: "Млинці з куркою та грибами",
    ingredients:
      "борошно пшеничне в/г, молоко, олія соняшникова, яйця курячі, вода, куряче філе, гриби печериці, вершки, цибуля ріпчаста, цукор, сіль, перець чорний мелений.",
    methodCooking:
      "не розморожуючи, обсмажити на пательні під кришкою з обох боків до рум’яної скоринки.",
    price: 260,
    image: images.pancakesMushroom,
  },
  {
    id: "pancakesCheese",
    name: "Млинці з сиром",
    ingredients:
      "борошно пшеничне в/г, молоко, олія соняшникова, яйця курячі, вода, сир домашній, цукор білий, цукор ванільний, сіль.",
    methodCooking:
      "не розморожуючи, обсмажити на пательні під кришкою з обох боків до рум’яної скоринки.",
    price: 190,
    image: images.pancakesCheese,
  },
  {
    id: "potatoSlicesMeat",
    name: "Картопляні зрази з м`ясом",
    ingredients:
      "картопля, борошно пшеничне в/г,  олія соняшникова, яйця курячі, м`ясо свинини, цибуля ріпчаста, морква, сіль, перець.",
    methodCooking:
      "не розморожуючи, обсмажити на пательні під кришкою з обох боків до рум’яної скоринки.",
    price: 210,
    image: images.zraziMeat,
  },
  {
    id: "potatoSlicesMushrooms",
    name: "Картопляні зрази з грибами",
    ingredients:
      "картопля, борошно пшеничне в/г,  олія соняшникова, яйця курячі, гриби печериці, цибуля ріпчаста, сіль, перець, мускатний горіх.",
    methodCooking:
      "не розморожуючи, обсмажити на пательні під кришкою з обох боків до рум’яної скоринки.",
    price: 180,
    image: images.zraziMushrooms,
  },
  {
    id: "dumplings",
    name: "Пельмені зі свинини і курятини",
    ingredients:
      "борошно пшеничне вищого сорту, філе куряче, свинина знежилована напівжирна, вода питна, цибуля ріпчаста, олія соняшникова рафінована, сіль кухонна, перець чорний мелений",
    methodCooking: "-",
    price: 230,
    image:  images.dublings,
  },
];
export default Dishes;
