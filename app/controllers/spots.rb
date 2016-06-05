get '/spots/new' do 
  erb :'/spots/new'
end

get '/spots' do
  erb :'/spots/index'
end

post '/spots/results' do
  erb :'/spots/index'
end

post '/spots' do
  p params
  p "*" * 1000
  user = User.find(session[:id])
  @spot = ParkingSpot.new(params)
  @spot.user_id = user.id
  if @spot.save!
  	redirect "/spots/#{@spot.id}"
  else
  	redirect "/spots/new"
  end
end

get "/spots/:id" do
  @spot = ParkingSpot.find(params[:id])
  erb :"/spots/show"
end