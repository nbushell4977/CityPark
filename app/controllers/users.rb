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

# get edit page
get '/users/:id/edit' do
  @user = User.find(params[:id])
  redirect "/users/#{params[:id]}" if current_user != @user
  erb :'/users/edit'
end

#submit user edit
put '/users/:id' do
  user = User.find(params[:id])
  user.username = params[:username]
  user.email = params[:email]
  user.phone = params[:phone]
  user.description = params[:description]
  if user.save
    redirect "/users/#{params[:id]}"
  else
    # flash[:errors] = user.errors.full_messages
    redirect "/users/#{current_user.id}/edit"
  end
end

get '/users/:id/contact' do
  erb :"/users/contact", layout: false
end

#delete user
delete '/users/:id' do
  User.find(params[:id]).destroy
  session[:id] = nil
  session.clear
  current_user = nil
  redirect '/'
end


