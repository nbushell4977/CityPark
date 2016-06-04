# aka "Login"
get '/sessions/new' do
  erb :'sessions/new'
end

post '/sessions/new' do
  @user = User.find_by(username: params[:username])
  password = params[:password]

  if @user && @user.authenticate(password)
    session[:id] = @user.id
    redirect '/'
  else
    #error handling goes here, via if logic on homepage
    redirect '/sessions/new'
  end
end

get '/sessions/delete' do
  session.clear
  redirect '/'
end
