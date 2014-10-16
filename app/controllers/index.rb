get '/' do
  if session[:user_id]
      @user = User.find(session[:user_id])
      @users = User.all 
  end
  erb :home
end

get '/surveys' do
    @surveys = Survey.all
    erb :list
end

get '/surveys/new' do
    erb :new
end

get '/surveys/:survey_id/edit' do
    @survey = Survey.find(params[:survey_id])
    erb :edit
end

get '/surveys/:survey_id/delete' do
    @survey = Survey.find(params[:survey_id])
    erb :delete
end

get '/surveys/:survey_id' do
    @survey = Survey.find(params[:survey_id])  
    erb :show
end

post '/surveys' do
    @survey = Survey.new
    @survey.title = params[:title]
    @survey.save
    @survey.reload

    redirect "/surveys/#{@survey.id}"
end

put '/surveys/:survey_id' do
    @survey = Survey.find(params[:survey_id])
    @survey.title = params[:title]
    @survey.save

    redirect "/surveys/#{@survey.id}"
end

delete '/surveys/:survey_id' do
    Survey.find(params[:survey_id]).destroy
    redirect '/'
end


#----------- SESSIONS -----------

get '/sessions/new' do
  # render sign-in page 
  @error = "Username &amp; password mismatch" if params[:mismatch]
  erb :sign_in
end

post '/sessions' do
  # sign-in
  @user = User.find_by(email: params[:email])
  if @user.password == params[:password]
    session[:user_id] = @user.id
    redirect '/'
  else
    redirect '/sessions/new?mismatch=true'
  end
end

delete '/sessions/:id' do
  # sign-out -- invoked
  session[:user_id] = nil
  redirect '/' 
end

#----------- USERS -----------

get '/users/new' do
  # render sign-up page
  @error = "password too short" if params[:invalid]
  erb :sign_up
end

post '/users' do
  # sign-up a new user
  form = params[:user]
  @user = User.new
  @user.name = form[:name]
  @user.email = form[:email]
  if form[:password].length >= 6
    @user.password = form[:password]
  else
    redirect '/users/new?invalid=true'
  end
  @user.save
  @user.reload
  session[:user_id] = @user.id

  redirect '/'
end

