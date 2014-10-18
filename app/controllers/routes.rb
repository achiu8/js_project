get '/' do
  erb :layout
end

get '/home' do
  if session[:user_id]
    redirect '/main'
  else
    erb :_login, layout: false
  end
end

get '/all' do
  @surveys = Survey.all

  erb :_all, layout: false
end

get '/main' do
  user = User.last
  @surveys = user.surveys

  erb :_main, layout: false
end

get '/logout' do
  session[:user_id] = nil
  erb :_login, layout: false
end

post '/login' do
  user = User.find_by(username: params[:username])

  if user
    if user.password == params[:password]
      session[:user_id] = user.id
      @surveys = user.surveys
      return erb :_main, layout: false
    end
  end

  @message = "Invalid login."
  erb :_login, layout: false
end

post '/survey' do
  @survey = Survey.find(params[:id])
  erb :_survey, layout: false
end

get '/survey/take' do
  @survey = Survey.find(params[:id])
  erb :_survey_take, layout: false
end

# TODO
post '/survey/submit' do
  # logic to record answers
end

delete '/survey' do
  Survey.find(params[:id]).destroy
  params[:id]
end

get '/survey/new' do
  erb :_survey_new, layout: false
end

post '/question/new' do
  @current_survey = params[:title]
  erb :_question_new, layout: false
end

post '/choices/new' do
  @current_question = params[:question]
  erb :_choices_new, layout: false
end

post '/survey/save' do
  title = params[:title]
  questions = params[:questions]

  user = User.last

  survey = user.surveys.create(title: params[:title])

  questions.each do |question, choices|
    q = survey.questions.create(question: question)
    choices.each do |choice|
      q.choices.create(choice: choice)
    end
  end

  redirect '/main'
end
