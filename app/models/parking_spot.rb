 require 'geocoder'

class ParkingSpot < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  
  belongs_to :user

  geocoded_by :full_street_address
  after_validation :geocode

  def full_street_address
  	self.address + " "+ self.city + " " + self.state+" "+self.zip
  end
end
