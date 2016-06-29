exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table){
       table.increments('userId')
       table.string('email')
       table.string('hashedPassword')
       console.log('users table was created!!')
     })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').then(function(){
     console.log('users table was dropped!!')
   })
};
