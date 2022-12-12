const laureatesServices = require('../services/laureates.services');
const prizesServices = require('../services/prizes.services');
const validator = require('validator');

exports.getAllLaureates = (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    laureatesServices.getAllLaureates((err, data) => {
        if (!page || page == "{page}" || page == "undefined" || validator.isEmpty(page)) {
            laureatesServices.getAllLaureates((error, results) => {
                if (error) {
                    res.status(500).send({
                        message: error.message || "Some error occurred while retrieving laureates."
                    });
                } else {
                    res.status(200).send(results);
                }
            });
        } else if (validator.isInt(page)) {
            if (endIndex < data.length) {
                results.next = {
                    page: page,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.results = data.slice(startIndex, endIndex);
            res.send(results);
        }
    });
};

exports.getLaureatesById = (req, res) => {
    const laureateId = req.params.laureateId;
    // laureateId = typeof laureateId === "undefined" ? "" : laureateId
    if (!laureateId || laureateId == "{laureateId}" || laureateId == "undefined" || validator.isEmpty(laureateId)) {
        laureatesServices.getAllLaureates((error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: results,
            });
        })
    } else if (validator.isInt(laureateId)) {
        laureatesServices.getLaureatesById(laureateId, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: results,
            });
        });
    } else {
        return res.status(400).send({ success: 0, data: "Invalid laureate id" });
    }
};

exports.getNbLaureatesByPrize = (req, res) => {
    laureatesServices.nbLaureatesByPrize((error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};

exports.getNbLaureatesManyPrizes = (req, res) => {
    laureatesServices.nbLaureatesManyPrizes((error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};

exports.getLaureatesByYear = (req, res) => {
    laureatesServices.nbLaureatesByYear((error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};

exports.filterLaureats = (req, res) => {
    const firstname = req.query.firstname;
    const surname = req.query.surname;
    const category = req.query.category;

    if (!firstname && !surname && !category) {
        laureatesServices.getAllLaureates((error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: results,
            });
        })
    } else {
        laureatesServices.filterLaureats(firstname, surname, category, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: results,
            });
        });
    }
};



exports.laureatesByCategoryAndYear = (req, res) => {
    laureatesServices.laureatesByCategoryAndYear((error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};

exports.deleteLaureate = (req,res) => {
    let id = req.params.id;
    let year = req.params.year;
    let category = req.params.category;
    laureatesServices.deleteLaureate(id, year, category, (error, results)=>{
        if (error){
            return res.status(400).send({success : 0, data:error});
        }
        return res.status(200).send(results);
    })
}

exports.updateMotivation = (req,res) => {
    console.log(req.body)
    let id = req.params.id;
    let year = req.params.year;
    let category = req.params.category;
    let motivation = req.body.motivation;
    laureatesServices.updateMotivation(id, year, category, motivation, (error, results)=>{
        if (error){
            return res.status(400)
                .send({success : 0, data:error});
        }
        return res.status(200).send(results);
    })
}

exports.addLaureate = (req,res) => {
    let year = req.params.year;
    let category = req.params.category;
    let data = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        motivation: req.body.motivation,
        share: req.body.share
    }
    laureatesServices.addLaureate(year, category, data, (error, results)=>{
        if (error){
            return res.status(400).send({success : 0, data:error});
        }
        return res.status(200).send(results);
    })
}