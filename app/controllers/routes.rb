get '/' do
  erb :index
end

get '/main' do
  user = User.last
  @surveys = user.surveys

  erb :_main, layout: false
end

post '/login' do
  user = User.last
  #user = User.find_by(username: params[:username])
  @surveys = user.surveys

  erb :_main, layout: false
end

post '/survey' do
  @survey = Survey.find(params[:id])
  erb :_survey, layout: false
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

# TODO
post '/choices/prev' do
  # @current_question = params[:question]
  # erb :_choices_new, layout: false
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
