
# Failure to remove existing data will result in duplicate data and/or errors
Person.destroy_all

# We can pass an array of hashes to the create method!
Person.create([
  {
    first_name: "Benjamin",
    last_name: "Kim",
    age: 16
  }, {
    first_name: "Phyllis",
    last_name: "Turner",
    age: 29
  }, {
    first_name: "Julia",
    last_name: "Diaz",
    age: 64
  }, {
    first_name: "Barbara",
    last_name: "Woods",
    age: 59
  }, {
    first_name: "Sean",
    last_name: "Henry",
    age: 50
  }, {
    first_name: "Ronald",
    last_name: "Dunn",
    age: 65
  }, {
    first_name: "Sharon",
    last_name: "Fuller",
    age: 50
  }, {
    first_name: "Michelle",
    last_name: "Fields",
    age: 69
  }, {
    first_name: "Paul",
    last_name: "Simpson",
    age: 32
  }, {
    first_name: "Lawrence",
    last_name: "Stevens",
    age: 52
  }
])