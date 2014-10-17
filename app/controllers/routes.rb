get '/' do
  erb :index
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

get '/survey/new' do
  erb :_survey_new, layout: false
end

post '/question/new' do
  @current_survey = params[:title]
  erb :_question_new, layout: false
end

post '/choice/new' do
  @current_question = params[:question]
  erb :_choice_new, layout: false
end
