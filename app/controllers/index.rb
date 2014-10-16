get '/' do
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
    @question = Question.find(params[:question_id])    
    erb :show
end

post '/surveys' do
    @survey = Survey.new
    @survey.title = params[:title]

    @question = Question.new
    @question.question = params[:question]

    @survey.save
    @survey.reload

    @question.save
    @question.reload   

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