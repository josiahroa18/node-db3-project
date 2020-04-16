const knex = require('knex');
const knexFile = require('../knexfile');
const db = knex(knexFile.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db('schemes');
}

function findById(id){
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(id){
    return db('steps')
        .where('scheme_id', id);
}

function add(scheme){
    return db('schemes')
        .insert(scheme)
        .then(id => {
            return findById(id[0])
        })
}

function update(updateScheme, id){
    return db('schemes')
        .where('id', id)
        .update(updateScheme)
        .then(() => {
            return findById(id);
        })
}

function remove(id){
    return db('schemes')
        .where('id', id)
        .del();
}