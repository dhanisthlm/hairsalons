import Salon from '../models/salon';

const getSalons = (request, reply) => {
    Salon.find({}, (error, items) => {
        if (error) return reply(error).code(500);
        return reply(items).code(200)
    })
};

const getSalonsByRange = (request, reply) => {
    const range = JSON.parse(request.params.range);
    Salon.find({ price: { $gte: range.lowest, $lte: range.highest } }, (error, items) => {
        if (error) return reply(error).code(500);
        return reply(items).code(200)
    })
};

const getSalon = (request, reply) => {
    const ObjectID = require('mongodb').ObjectID;

    Salon.find({ "_id": ObjectID(request.params.id) }, (error, items) => {
        if (error) return reply(error).code(500);
        return reply(items).code(200)
    })
};


exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/api/salons',
            config: {
                handler: getSalons
            }
        },
        {
            method: 'GET',
            path: '/api/salon/{id}',
            config: {
                handler: getSalon
            }
        },
        {
            method: 'GET',
            path: '/api/salons/range/{range}',
            config: {
                handler: getSalonsByRange
            }
        },
    ]);

    next()
};

exports.register.attributes = {
    name: 'salon'
};
