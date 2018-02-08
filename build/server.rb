require 'sinatra'
require 'json'

get '/loops/:name' do

end

get '/pres' do
  @all = JSON.parse(File.read("loops/all.json"))
  if @all.has_key? 'default'
    redirect '/pres/' + @all['default'].downcase + '/0'
  else
    redirect '/select/no_default'
  end
end

get '/select' do
  erb :selector, :locals => {:no_default => false}
end

get '/select/no_default' do
  erb :selector, :locals => {:no_default => true}
end

get '/pres/:name/:type/?:key?' do
  # @all = JSON.parse(File.read("loops/all.json"))
  # @filename =  @all[params['name'].downcase]['file']
  # @loop = JSON.parse(File.read("loops/#{@filename}"))
  # @loop['presets'][params['type']]
  if params['type'] === 'image-carousel' then
    erb :image_carousel
  elsif params['type'] === 'h' then
    erb :home
  elsif params['type'] === 'fullscreen_pdf' then
    erb :fullscreen_pdf
  elsif params['type'] === 'video' then
    erb :video
  end
  # puts @loop['slides'][params['slide']]['type']
end

get '/loop/:file' do
  content_type :json
  send_file "./loops/#{params['file']}"
end

get '/composer' do
  erb :composer
end
