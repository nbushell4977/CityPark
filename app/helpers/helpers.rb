# require 'net/smtp'
require 'pony'
helpers do
  def current_user
    @current_user ||= User.find_by(id: session[:id])
  end

   def logged_in
    current_user.nil? == false
  end

  def allow_edit(post)
    if session[:id] == post.user_id
      return true
    else
      return false
    end
  end
  

def send_email(opts={})
  # Pony.mail(:to => 'aberger019@gmail.com', :from => 'me@example.com', :subject => 'hi', :body => 'Hello there.')
  p opts
  Pony.mail(:to => opts[:to],
            :from => opts[:from],
            :subject => opts[:subject], 
            :body => opts[:body])
  end
end

