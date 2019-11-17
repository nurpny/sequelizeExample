const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/sequelizeExample", {
  logging: false
});

db.authenticate()
         .then(() => {
           console.log("Connection made");
         })
         .catch(err => {
           console.error("Connection error")
         })

const User = db.define("User", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Company = db.define("Company", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING
  }
})

Company.hasMany(User, {as: "employees"});
User.belongsTo(Company, {as: 'Employee', foreignKey: 'employerID'});

Company.create({name: 'nom', country: 'JP'});
Company.create({name: 'FS', country: 'US'});

User.create({first_name: "nur", last_name: "p", employerID: 1});
User.create({first_name: "marv", last_name: "w", employerID: 2});
User.create({first_name: 'rara', last_name: 'desi', employerID: 1});
User.create({first_name: 'nelly', last_name: 'hot', employerID: 2});


const init = async() => {
  await db.sync({force: true});
  const users = await User.findAll()
  console.log(users);
//  const jpEmployees = await User.findAll({
//  })
}

init();


// const marv = new User({
//
//
// })
// const rara = new User({
//
//
// })
// const nelly = new User({
//
//
// })

// Company.hasMany(User, {as: "employees"});
// User.belongsTo(Company, {as: 'Employee', foreignKey: 'employerID'});


// const init = async () => {
//   await User.sync();
//   await Company.sync();
// }



// const
