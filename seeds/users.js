
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({userId: 1, name: 'max', email: 'max@max.com', hashedPassword: 'max'}),
        knex('users').insert({userId: 2, name: 'dom', email: 'dom@dom.com', hashedPassword: 'dom'}),
        knex('users').insert({userId: 3, name: 'me', email: 'me@me.com', hashedPassword: 'me'})
      ]);
    });
};
