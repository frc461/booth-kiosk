require 'sinatra'

get '/doc/:doc' do
	send_file File.join('docs', params['doc'])
end
