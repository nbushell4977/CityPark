#new user form
get '/users/new' do
  erb :"/users/new"
end

def create
  @user = User.new(params[:user])
  @user.password = params[:password]
  @user.save!
end

# authenticates a user for login
def login
  @user = User.find_by_username(params[:username])
  if !@user.nil? && @user.password == params[:password] 
    session[:id] = @user.id
    redirect "users/#{@user.id}"
  else
    redirect '/sessions/login'
  end
end


post '/users/login' do
  login
end

post '/users' do
  if create
    session[:id] = @user.id
    session[:visit] = 0
    redirect "users/#{@user.id}"
  else
    @errors = @user.errors.full_messages
    erb :'users/new'
  end
end

#aka Profile page
get '/users/:id' do
  @user = User.find(params[:id])
  erb :'users/show'
end


