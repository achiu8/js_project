get '/' do
  @notes = Note.all.order(:created_at)

  erb :index
end

post '/' do
  Note.create(content: params[:content])

  redirect '/'
end

get '/edit/:id' do
  @note = Note.find params[:id]

  erb :edit
end

post '/save/:id' do
  note = Note.find params[:id]
  note.update_attributes(title: params[:title], content: params[:content])
  
  redirect '/'
end

get '/delete/:id' do
  Note.find(params[:id]).destroy

  redirect '/'
end

get '/note/:id' do
  @note = Note.find params[:id]

  erb :note
end
