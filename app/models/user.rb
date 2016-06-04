class User < ActiveRecord::Base
  include BCrypt
  has_secure_password

  
end
