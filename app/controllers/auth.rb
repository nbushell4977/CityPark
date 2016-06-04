get '/login' do
  erb :login
end

post '/login' do
  #find user based on email address
  @user = User.find_by(username: params[:username])
  #validate user based on valid password
  #if it does
  #&& is checking if user is not nill !!
  if @user && @user.password == params[:password]
    #set the user-id to session
    session[:user_id] = @user.id
    redirect '/'
  else
    @error = "Your password or email was incorrect"
    erb :login
  end
end
