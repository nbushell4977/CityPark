get '/spots/new' do 
  erb :'/spots/new'
end

get '/spots' do
  erb :'/spots/show'
end

post '/spots' do
  @spot = ParkingSpot.find_by_zip(params[:zip])
  redirect '/spots'
end