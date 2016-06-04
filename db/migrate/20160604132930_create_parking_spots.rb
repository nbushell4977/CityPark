class CreateParkingSpots < ActiveRecord::Migration
  def change
  	create_table :parking_spots do |t|
  	  t.string :address
  	  t.string :unit
  	  t.string :city
  	  t.string :state
  	  t.string :zip
  	  t.integer :price
  	  t.string :description
  	  t.integer :user_id
  	  t.timestamps null: false
  	end
  end
end