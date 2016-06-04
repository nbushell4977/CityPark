#create new session page
get '/sessions/login' do 
  erb :'/sessions/new'
end

post '/login' do
  login
end
#delete session
get '/sessions/:id' do
  current_user = nil
  session[:id] = nil
  redirect '/sessions/login'
end