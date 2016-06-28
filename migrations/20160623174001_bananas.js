
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('bananas', function(table){
       table.increments('id')
       table.integer('userId')
       table.integer('quantity')
       table.string('dateBought')
       table.integer('cost')
       table.timestamp('timeEntered')
       console.log('bananas table was created!!')
     })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bananas').then(function(){
     console.log('bananas table was dropped!!')
   })
};
