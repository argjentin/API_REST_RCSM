const prizesServices = require('../services/prizes.services');
const validator = require('validator');



exports.getNbPrizes = (req, res) => {
    prizesServices.nbPrizes((error, results) => {
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

exports.getCategories = (req, res) => {
    prizesServices.listPrizesCategorys((error, results) => {
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

exports.getMostLaureatesCategory = (req, res) => {
    prizesServices.categoryWithMostLaureates((error, results) => {
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

exports.getPrizesByLaureateId = (req, res) => {
    const laureateId = req.params.laureateId;
    if (!laureateId || laureateId == "{laureateId}" || laureateId == "undefined" || validator.isEmpty(laureateId)) {
            return res.status(400).send({ success: 0, data: error });
    } else if (validator.isInt(laureateId)) {
        prizesServices.prizesByLaureateId(laureateId, (error, results) => {
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

exports.getNoPrizes = (req, res) => {
    prizesServices.noPrize((error, results) => {
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

exports.getLaureatesByYearAscDesc = (req, res) => {
    const sort = req.query.sort;
    prizesServices.prizeLaureatesByYearAscDesc(sort,(error, results) => {
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

exports.getLaureatesFromListe = (req, res) => {
    const category = req.params.category;
    prizesServices.categoryListe(category,(error, results) => {
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