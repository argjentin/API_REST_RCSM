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

// F1
const getAllLaureates = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const laureates = prize.map(prize => prize.laureates);
            const laureatesArray = [];
            laureates.forEach(laureate => {
                for (let i in laureate){
                    laureatesArray.push({
                        id: laureate[i].id,
                        firstname: laureate[i].firstname,
                        surname: laureate[i].surname
                    })
                }
            })
            const laureatesUnique = [...new Set(laureatesArray)];
            callback(null, laureatesUnique);
        }
    })
}


// F2
const getLaureatesById = (id, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const laureates = prize.map(prize => prize.laureates);
            laureates.forEach(laureate => {
                for ( let i in laureate){
                    laureate[i];
                }
            })
            let laureateId = "User not found";
            laureates.forEach(laureate => {
                for (let i in laureate){
                    if (laureate[i].id == id){
                        laureateId = {
                            firstname: laureate[i].firstname,
                            surname: laureate[i].surname
                        }
                    }
                }
            })
            callback(null, laureateId);
        }
    })
}

// F4
const nbLaureatesByPrize = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const laureates = prize.map(prize => prize.laureates);
            let laureatesByPrize = [];
            laureates.forEach(laureate => {
                for (let i in laureate){
                    laureatesByPrize.push(laureate[i].id);
                }
            })
            callback(null, laureatesByPrize.length);
        }
    })
}

// F5
const nbLaureatesManyPrizes = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const laureates = prize.map(prize => prize.laureates);
            const category = prize.map(prize => prize.category);
            const year = prize.map(prize => prize.year);
        
            let laureatesCategoryYear = [];
            for (let i in laureates){
                laureatesCategoryYear.push({
                    laureates: laureates[i],
                    category: category[i],
                    year: year[i]
                })
            }

            let nbPrizes = [];
            laureatesCategoryYear.forEach(laureate => {
                for (let i in laureate.laureates){
                    nbPrizes.push({
                        id: laureate.laureates[i].id,
                        firstname: laureate.laureates[i].firstname,
                        surname: laureate.laureates[i].surname,
                    })
                }
            })
            let nbPrizesPerLaureate = [];
            for (let i in nbPrizes){
                let laureate = nbPrizes[i];
                let laureateId = laureate.id;
                let laureateFirstname = laureate.firstname;
                let laureateSurname = laureate.surname;
                let laureateNbPrizes = 0;
                for (let j in nbPrizes){
                    if (nbPrizes[j].id == laureateId){
                        laureateNbPrizes++;
                    }
                }
                if (laureateNbPrizes > 1){
                    nbPrizesPerLaureate.push({
                        firstname: laureateFirstname,
                        surname: laureateSurname,
                        nbPrizes: laureateNbPrizes
                    })
                }
            }
            for (let i in nbPrizesPerLaureate){
                for (let j in nbPrizesPerLaureate){
                    if (i != j && nbPrizesPerLaureate[i].firstname == nbPrizesPerLaureate[j].firstname){
                        nbPrizesPerLaureate.splice(j, 1);
                        j--;
                    }
                }
            }
            callback(null, nbPrizesPerLaureate);
        }
    })
}

// F8
const nbLaureatesByYear = (callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const year = prize.map(prize => prize.year);
            const laureates = prize.map(prize => prize.laureates);

            const nbLaureatesByYear = [];
            for (let i in year){
                let yearNbLaureates = 0;
                for (let j in laureates[i]){
                    yearNbLaureates++;
                }
                nbLaureatesByYear.push({
                    year: year[i],
                    nbLaureates: yearNbLaureates
                })
            }

            const nbLaureatesByYearGrouped = nbLaureatesByYear.reduce((r, a) => {
                r[a.year] = [...r[a.year] || [], a];
                return r;
            }, {});

            const nbLaureatesByYearSum = [];
            for (let i in nbLaureatesByYearGrouped){
                let yearNbLaureates = 0;
                for (let j in nbLaureatesByYearGrouped[i]){
                    yearNbLaureates += nbLaureatesByYearGrouped[i][j].nbLaureates;
                }
                nbLaureatesByYearSum.push({
                    year: i,
                    nbLaureates: yearNbLaureates
                })
            }
            callback(null, nbLaureatesByYearSum);
        }
    })
} 
// F13
const filterLaureats = (firstname, surname, category, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            const prize = data.prizes;
            const categories = prize.map(prize => prize.category);
            const year = prize.map(prize => prize.year);
            const laureates = prize.map(prize => prize.laureates);
            let prizes = [];
            for (let i in laureates){
                for (let j in laureates[i]){
                    if ((laureates[i][j].firstname != null && laureates[i][j].firstname === firstname)
                    || (laureates[i][j].surname != null && laureates[i][j].surname === surname)
                    || (categories[i] != null && categories[i] === category)){
                    {
                        prizes.push({
                            firstname: laureates[i][j].firstname,
                            surname: laureates[i][j].surname,
                            motivation: laureates[i][j].motivation,
                            category: categories[i],
                        })
                    }
                }
            }}
            callback(null, prizes);
        }
    })
}

// F13
const deleteLaureate = (id, year, category, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            let newJSON = {prizes: []}
            const prize = data.prizes;
            newJSON.prizes = prize.map(prize => {
                if (prize.laureates && prize.year == year && prize.category == category){
                    prize.laureates = prize.laureates.filter(laureate => laureate.id != id);
                }
                return prize;
            })
            newJSON = JSON.stringify(newJSON);
            fs.writeFileSync("prize.json", newJSON);
            return callback(null, "Laureate deleted: " + id + " " + category + " " + year);
        }

    })
}

// F14
const updateMotivation = (id, year, category, motivation, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            let newJSON = {prizes: []}
            const prize = data.prizes;
            newJSON.prizes = prize.map(prize => {
                if (prize.laureates && prize.year == year && prize.category == category){
                    prize.laureates = prize.laureates.map(laureate => {
                        if (laureate.id == id){
                            laureate.motivation = motivation;
                        }
                        return laureate;
                    })
                }
                return prize;
            })
            newJSON = JSON.stringify(newJSON);
            fs.writeFileSync("prize.json", newJSON);
            return callback(null, "Laureate updated: " + id + " " + category + " " + year);
        }
    })
}

// F15

const addLaureate = (year, category, body, callback) => {
    parseData((error, data) => {
        if (error) {
            callback(error, null);
        } else {
            let newId = data.prizes.filter(prize => prize.laureates).find(prize => prize.laureates.find(laureate => laureate.firstname == body.firstname && laureate.surname == body.surname));
            if(newId === undefined){
                newId = Math.max(...data.prizes.filter(prize => prize.laureates).map(prize => prize.laureates.map(laureate => laureate.id)).flat(Infinity)) + 1;
            } else {
                newId = newId.laureates.find(laureate => laureate.firstname == body.firstname && laureate.surname == body.surname).id;
            }
            let newJSON = {prizes: []}
            const prize = data.prizes;
            const laureates = prize.map(prize => prize.laureates);
            for (let i in laureates){
                for (let j in laureates[i]){
                    if (laureates[i][j].firstname == body.firstname && laureates[i][j].surname == body.surname){
                        newId = laureates[i][j].id;
                    }
                    if (laureates[i][j].id > newId){
                        newId = laureates[i][j].id;
                    }
                }
            }
            newId++;
            newJSON.prizes = prize.map(prize => {
                if (prize.laureates && prize.year == year && prize.category == category){
                    prize.laureates.push({
                        id: newId,
                        firstname: body.firstname,
                        surname: body.surname,
                        motivation: body.motivation,
                        share: data.share
                    })
                } else if (prize.year == year && prize.category == category){
                    prize = {
                        year: year,
                        category: prize.category,
                        laureates: [{
                            id: newId,
                            firstname: body.firstname,
                            surname: body.surname,
                            motivation: body.motivation,
                            share: data.share
                        }]
                    }
                }
                return prize;
            })
            newJSON = JSON.stringify(newJSON);
            fs.writeFileSync("prize.json", newJSON);
            return callback(null, body);
        }
    })
}


module.exports = {
    getAllLaureates,
    getLaureatesById,
    nbLaureatesByPrize,
    nbLaureatesManyPrizes,
    nbLaureatesByYear,
    filterLaureats,
    deleteLaureate,
    updateMotivation,
    addLaureate
}