require 'geocoder'

class ParkingSpot < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  
  belongs_to :user

  geocoded_by :full_street_address
  after_validation :geocode

  def full_street_address
  	self.address + " "+ self.city + " " + self.state+" "+self.zip
  end

  def distance_from(location)
    "%0.2f" % Geocoder::Calculations.distance_between(
      [latitude,longitude], 
      [location[0],location[1]])
  end

  def to_json
  	{address: full_street_address, 
  		latitude: latitute, 
  		longitude: longitude,
  		price: price,
  		user: user.to_json,
  		desciption: desciption}.to_json
  end
end
