load 'deploy' if respond_to?(:namespace) # cap2 differentiator

set :application, "istrending.com"

# server config
role :app, application
set :deploy_to, "/var/www/#{application}" 
set :use_sudo, false
ssh_options[:forward_agent] = true

# git config
set :git_path_prefix, "git@github.com:stevenwilkin"
set :repository, "#{git_path_prefix}/#{application}.git" 
set :scm, 'git'
set :branch, 'master'
set :scm_verbose, true

# deploying to Passenger so app is restarted by touching tmp/restart.txt
namespace :deploy do
	desc "Restart Application"
	task :restart do
		run "touch #{current_path}/tmp/restart.txt"
	end
end

# ensure data is available for the app after deployment
desc "Get Trend Data"
task :get_trends do
  run "#{current_path}/lib/get_trends.rb"
end

before "deploy:restart", "get_trends"
