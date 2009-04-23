#!/usr/bin/env ruby

require 'rubygems'
require 'open-uri'
require 'hpricot'
require 'json'

# `gbv=1` causes finshed html page to be returned instead of a huge amount of javascript
SEARCH	= 'http://images.google.com/images?gbv=1&q='
TRENDS	= 'http://search.twitter.com/trends.json'
RESULTS	= 'trends.json'

# peforms a google image search for `q` and returns the url of the first image returned
def image_search(q)
	q.gsub!(/[\W]/, '+')
	open(SEARCH + q) do |f|
		return nil unless f.status[0] == '200'
		h = Hpricot(f.read)
		h.at('#ImgCont//img')['src']
	end
end

# get the trends & do an image search for each
json = JSON.parse(open(TRENDS).read)

json['trends'].each do |t|
	t['img'] = image_search(t['name'])
end

# save the results for the front-end
File.open(RESULTS, 'w') {|f| f.write(json.to_json)}
