require 'faker'

user1 = User.create(email: "sarah@gmail.com", username: "sarah", password: "1234", phone: "123-456-7890", description: "I am renting my parking spot in SF")
user2 = User.create(email: "bob@gmail.com", username: "Bob", password: "1234", phone: "123-456-7890", description: "Renting my parking spot in the Marina")

ParkingSpot.create(address: "1626 17th Avenue", unit: nil, city: "San Francisco", state: "CA", zip: "94122", price: 100, description: "Parking spot for 100 dollars a month", user: user1)
ParkingSpot.create(address: "852 Clayton Street", unit: "2", city: "San Francisco", state: "CA", zip: "94117", price: 300, description: "Awesome parking spot in the marina", user: user2)
ParkingSpot.create(address: "6230 Stoneridge Mall Drive", unit: "6", city: "Pleasanton", state: "CA", zip: "94588", price: 500, description: "Awesome parking spot in the financial district", user: user1)