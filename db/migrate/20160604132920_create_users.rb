class CreateUsers < ActiveRecord::Migration
  def change
  	create_table :users do |t|
      t.string :email
      t.string :username 
      t.string :password_hash
      t.string :phone
      t.string :description
      t.timestamps null: false
  	end
  end
end
