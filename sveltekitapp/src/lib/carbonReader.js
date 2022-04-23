//import { createRequire } from "module"; // Bring in the ability to create the 'require' method
//const require = createRequire(import.meta.url); // construct the require method
//const data = require("../../static/data/carbon_footprint.json") // use the require method
//const data = require("../../static/data/stemmed_carbon_footprint.json") // use the require method

//import data from "../../static/data/stemmed_carbon_footprint.json";

import {getFoodData}  from './nutritionAPI.js'
//import natural from 'natural'

//const data = fetch("../../static/data/stemmed_carbon_footprint.json")


//stemmed data
let data = {"pork":4.621484423,"chicken":3.262298031,"egg":2.526441574,"beef":23.80216746,"milk":1.36935455,"butter":12.66705193,"yogurt":1.538219779,"cream":6.469371749,"hard chees":12.56486777,"dessert chees":8.363223794,"creme fraich":5.710089322,"sour cream":5.710089322,"milk powd":11.7851491,"salmon":6.065231518,"cod":7.29340867,"roe":2.005864863,"her":1.137124466,"mackerel":1.035272146,"saith":4.900359303,"prawn":14.44294447,"alaska pollock":3.376893088,"rainbow trout":6.10321773,"pangasiu":13.86612846,"european plaic":23.28046736,"hoki":7.148932597,"wheat":1.176855587,"rye":1.062139839,"barlei":1.149947423,"oat":1.184860243,"rice":3.579564355,"rapeseed oil":2.373003323,"peanut":1.6,"olive oil":4.044846694,"sugar":1.523165461,"brown sugar":1.523165461,"tomato":1.493989349,"cucumb":0.734100042,"bell pepp":2.333728229,"capsicum":2.333728229,"iceberg lettuc":0.322647658,"potato":0.375638513,"carrot":0.298370864,"onion":0.381612481,"leek":0.395561437,"broccoli":0.627874827,"white cabbag":0.359012096,"cauliflow":0.531403532,"pea":0.617573225,"bean":1.159890391,"appl":0.36967267,"pear":0.399295468,"melon":2.141240029,"banana":0.67261454,"orang":0.728614353,"lemon":0.45637194,"avocado":1.093448343,"kiwifruit":0.632535203,"strawberri":0.73858763,"raspberri":0.759482,"cocoa powd":4.437154929,"cocoa butt":8.786018448,"coffe":6.406229764,"pasta":1.76571932,"bun":1.447764517,"biscuit":1.104275024,"pastri":1.409857661,"rusk":1.433832349,"wheat bread":1.02194756,"wheat-rye bread":1.043072702,"crisp bread":1.114347356,"follow-up formula":3.658963493,"margarin":2.417283753,"low fat margarin":1.272289192,"cocoa drink powd":2.303386124,"soda":0.40582548,"cider (non-alcoholic)":0.477932217,"beer":0.461326355,"mineral wat":0.277240578,"juic":1.239805883,"orange juic":1.687789075,"apple juic":0.791822691,"squash drink":1.27361569,"strawberry squash drink":1.244180357,"raspberry squash drink":1.303051023,"chocol":6.856879104,"potato crisp":2.89291368,"ice cream":4.281456556,"soy sauc":1.2,"lamb":28,"duck":1.1,"salt":0.22,"honei":1.5,"vinegar":1.7,"flour":0.85,"ginger":0.45,"garlic":0.5,"bacon":9,"ham":5.9}

//const query = ["3 bananas", "2 tomatoes, 5 strawberries", "apple juice", "150ml soy sauce"];

export const getCarbonFootprint = async (ingredients, n_servings) => {
    
    console.log(ingredients)
    
    let total = 0;
    if (ingredients) {
        for (const ing of ingredients) {
            //find ingredient in dictionary
            //console.log(ing.name)
            const stemmedName = ing.name//natural.PorterStemmer.stem(ing.name.toLowerCase())
            //console.log(stemmedName)
    
            if (stemmedName in data) {
                const value = data[stemmedName]
                //console.log(`${stemmedName}: ${value}/kg`)
                total += value * (ing.serving_size_g / 1000)
                continue;
            }
    
            //search through individual words in data to see if there's a match or close similarity
            for (const key in data) {
                if (key.includes(stemmedName) ){//|| (natural.JaroWinklerDistance(stemmedName, key) >= 0.8)) {
                    const value = data[key]
                    //console.log(`${stemmedName}: ${value}/kg`)
                    total += value * (ing.serving_size_g / 1000)
                    break;
                }
            }
    
        }
    }
    
    //convert grams to kg

    return Math.round((total / n_servings) * 100) / 100
}



//console.log(await getCarbonFootprint(query))

// console.log(natural.PorterStemmer.stem('strawberry'))
// console.log(natural.PorterStemmer.stem('strawberry squash drink'))

//stemming old json file
// const newData = {}

// for (const item in data) {
//     console.log(item)
//     //console.log(data[item])

//     const newString = natural.PorterStemmer.stem(item.toLowerCase())
//     console.log(newString)

//     newData[newString] = data[item]
// }

// console.log(newData)

// fs.writeFile("../../static/data/stemmed_carbon_footprint.json", JSON.stringify(newData), function(err) {
//     if (err) {
//         console.log(err);
//     }
// });


