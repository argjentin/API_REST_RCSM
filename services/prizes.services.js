const fs = require('fs');
const { JSONPath } = require('jsonpath-plus');

const parseData = (callback) => {
    try {
        const dataBuffer = fs.readFileSync('prize.json');
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON);
        callback(null, data);
    } catch (error) {
        callback(error, null);
    }
}

// F3
const nbPrizes = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const category = prize.map(prize => prize.category);
            const year = prize.map(prize => prize.year);
            // count number of prizes with overallMotivation and contains the word "No"
            const noPrize = JSONPath({path: '$..prizes[?(@.overallMotivation && /No/.test(@.overallMotivation))]', json: data}); 
            let categoryYear = [];
            for (let i in category){
                categoryYear.push(category[i] + year[i]);
            }
            const uniqueCategoryYear = [...new Set(categoryYear)];

            callback(null, (uniqueCategoryYear.length - noPrize.length));
        }
    })
}

// F6
const listPrizesCategorys = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const category = prize.map(prize => prize.category);
            
            const uniqueCategory = [...new Set(category)];

            callback(null, uniqueCategory);
        }
    })
}

// F7
const categoryWithMostLaureates = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const category = prize.map(prize => prize.category);
            let categories = [];
            for (let i in category) {
                categories.push(category[i])
            }
            const categoriesUnique = [...new Set(categories)]
            const laureatesByCategory = [];
            categoriesUnique.forEach(category => {
                let laureates = prize.filter(prize => prize.category === category)
                                     .map(prize => prize.laureates);
                let laureatesTab = [];
                laureates.forEach(laureate => {
                    for (let i in laureate){
                        laureatesTab.push({
                            id: laureate[i].id,
                            firstname: laureate[i].firstname,
                            surname: laureate[i].surname
                        })
                    }  
                })
                const laureatesUniques = [...new Set(laureatesTab)]
                laureatesByCategory.push({
                    category: category,
                    laureates: laureatesUniques.length
                })
            })
            laureatesByCategory.sort((a, b) => b.laureates - a.laureates);
            callback(null, laureatesByCategory[0]);
        }
    })      
}

const categoryListe = (category, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            
            const prize = data.prizes;
            const laureateCategory = prize.filter(prize => prize.category === category)
                                      .map(prize => prize.laureates);
            const laureateYear = prize.filter(prize => prize.category === category)
                              .map(prize => prize.year);
            
            let laureates = [];
            for (let i in laureateCategory){
                for (let j in laureateCategory[i]){
                    laureates.push({
                        firstname: laureateCategory[i][j].firstname,
                        surname: laureateCategory[i][j].surname,
                        motivation: laureateCategory[i][j].motivation,
                        year: laureateYear[i]
                    })
                }
            }

            laureates.sort((a, b) => b.year - a.year);
            callback(null, laureates);
            
            
        }
    })
            
}

// F9
const prizesByLaureateId = (id, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const category = prize.map(prize => prize.category);
            const year = prize.map(prize => prize.year);
            const laureates = prize.map(prize => prize.laureates);
            let prizes = [];
            for (let i in laureates){
                for (let j in laureates[i]){
                    if (laureates[i][j].id === id){
                        prizes.push({
                            id: id,
                            firstname: laureates[i][j].firstname,
                            surname: laureates[i][j].surname,
                            motivation: laureates[i][j].motivation,
                            category: category[i],
                            year: year[i]
                        })
                    }
                }
            }
            callback(null, prizes);
        }
    })
}

// F10
const noPrize = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const noPrize = JSONPath({path: '$..prizes[?(@.overallMotivation && /No/.test(@.overallMotivation))]', json: data}); 
            const unique = [...new Set(noPrize)];
            callback(null, unique);
        }
    })
}

// F11
const prizeLaureatesByYearAscDesc = (sort, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const year = prize.map(prize => prize.year);
            const laureates = prize.map(prize => prize.laureates);
            const uniqueYear = [...new Set(year)];
            let laureatesByYear = [];
            uniqueYear.forEach(year => {
                let laureatesYear = prize.filter(prize => prize.year === year)
                                            .map(prize => prize.laureates);
                let laureatesTab = [];
                laureatesYear.forEach(laureate => {
                    for (let i in laureate){
                        laureatesTab.push({
                            id: laureate[i].id,
                            firstname: laureate[i].firstname,
                            surname: laureate[i].surname
                        })
                    }
                })
                const laureatesUniques = [...new Set(laureatesTab)]
                laureatesByYear.push({
                    year: year,
                    laureates: laureatesUniques.length
                })
            })
            if (sort === 'asc'){
                laureatesByYear.sort((a, b) => a.laureates - b.laureates);
            } else if (sort === 'desc'){
                laureatesByYear.sort((a, b) => b.laureates - a.laureates);
            }
            laureatesByYear = laureatesByYear.filter(laureate => laureate.laureates !== 0); // we don't count the years without laureates
            callback(null, laureatesByYear);
        }
    })
}


module.exports = {
    nbPrizes,
    listPrizesCategorys,
    categoryWithMostLaureates,
    prizesByLaureateId,
    noPrize,
    prizeLaureatesByYearAscDesc,
    categoryListe
}