#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
	haml :index
end

get '/css/trends.css' do
	header 'Content-Type' => 'text/css; charset=utf-8'
	sass :trends
end
