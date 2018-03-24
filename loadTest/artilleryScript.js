

const getOneHundredIDs = function() {
  for (var i = 0; i <= 100; i++) {
    console.log('- ' + Math.floor(Math.random() * 10000000 + 1))
  }
}

function getTopRestaurnats(userContext, events, done) {
  // generate data with Faker:
  const name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  const email = Faker.internet.exampleEmail();
  const password = Faker.internet.password();
  // add variables to virtual user's context:
  userContext.vars.name = name;
  userContext.vars.email = email;
  userContext.vars.password = password;
  // continue with executing the scenario:
  return done();
}

getOneHundredIDs();