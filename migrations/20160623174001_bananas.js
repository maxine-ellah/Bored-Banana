
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('bananas', function(table){
       table.increments('id')
       table.integer('quantity')
       table.string('dateBought')
       table.integer('cost')
       table.string('timeEntered')
       console.log('bananas table was created!!')
     })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bananas').then(function(){
     console.log('bananas table was dropped!!')
   })
};
