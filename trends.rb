#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'haml'
require 'json'
require 'date'

get '/' do
  file = File.expand_path(File.dirname(__FILE__)) + '/var/trends.json'
  json = JSON.parse(File.read(file))
  @trends = json['trends']
  @updated_full = json['as_of']
  @updated = DateTime.parse(@updated_full).strftime('%H:%S')
	haml :index
end

get '/css/trends.css' do
  content_type 'text/css', :charset => 'utf-8'
	sass :trends
end
