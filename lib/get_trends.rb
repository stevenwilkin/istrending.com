#!/usr/bin/env ruby

require 'rubygems'
require 'open-uri'
require 'hpricot'
require 'json'

# `gbv=1` causes finshed html page to be returned instead of a huge amount of javascript
SEARCH	= 'http://images.google.com/images?gbv=1&q='
TRENDS	= 'http://api.twitter.com/1/trends.json'
RESULTS	= File.dirname(__FILE__) + '/../var/trends.json'

# peforms a google image search for `q` and returns the url of the first image returned
def image_search(q)
	term = q.gsub(/#/, '').gsub(/[\W]/, '+')
	open(SEARCH + term) do |f|
		return nil unless f.status[0] == '200'
		h = Hpricot(f.read)
		# in the rare case there are no results...
		if (i = h.at('#ImgCont//img'))
		  i['src']
		else
          'http://tbn0.google.com/images?q=tbn:WgkIHy0O9DyKJM:http://www.kreiseder.at/wp-content/2008/07/lolcat404.png'
		end
	end
end

# get the trends & do an image search for each
json = JSON.parse(open(TRENDS).read)

json['trends'].each do |t|
	t['img'] = image_search(t['name'])
end

# save the results for the front-end
File.open(RESULTS, 'w') {|f| f.write(json.to_json)}
