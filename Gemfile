source "https://rubygems.org"
ruby "2.3.1"

#
# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails"
gem "listen"

# Note: We're using sqllite3 for development and testing
# gem "sqlite3", group: [:development, :test]

gem "pg"

gem "puma"

# Use SCSS for stylesheets
gem "sass-rails"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier"
# Use CoffeeScript for .js.coffee assets and views
gem "coffee-rails"

# Turbolinks makes following links in your web application faster.
# Read more: https://github.com/turbolinks/turbolinks
# Get turbolinks from npm!
# gem 'turbolinks', '>= 5.0.0.beta2'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder"
gem 'redis'

# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use Rails Html Sanitizer for HTML sanitization
gem "rails-html-sanitizer"

gem "react_on_rails", "~> 6.7.1"

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# mini_racer is probably faster than therubyracer
gem "mini_racer"

gem "autoprefixer-rails"

gem "awesome_print"

# jquery as the JavaScript library has been moved under /client and managed by npm.
# It is critical to not include any of the jquery gems when following this pattern or
# else you might have multiple jQuery versions.

# JEFF
gem 'devise'
gem 'aws-sdk', '~> 2'
gem 'paperclip', :git=> 'https://github.com/thoughtbot/paperclip', :ref => '523bd46c768226893f23889079a7aa9c73b57d68'
gem 'delayed_job_active_record'
gem 'annotate'
gem "omniauth-google-oauth2"
gem 'httparty'
gem 'thredded', '~> 0.13.2'
gem 'rails-ujs'

group :development do
  # Access an IRB console on exceptions page and /console in development
  gem "web-console"
end

group :development, :test do
  ################################################################################
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-commands-rspec"

  ################################################################################
  # Manage application processes
  gem "foreman"
  gem "factory_girl_rails"

  ################################################################################
  # Linters and Security
  gem "rubocop", require: false
  gem "ruby-lint", require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278
  gem "scss_lint", require: false
  gem "brakeman", require: false
  gem "bundler-audit", require: false

  ################################################################################
  # Favorite debugging gems
  gem "pry"
  gem "pry-doc"
  gem "pry-rails"
  gem "pry-stack_explorer"
  gem "pry-rescue"
  gem "pry-byebug"

  ################################################################################
  # Color console output
  gem "rainbow"

  # Jeff
  gem 'rb-readline'
end

group :test  do
  gem "coveralls", require: false
  gem "capybara"
  gem "capybara-screenshot"
  gem "capybara-webkit"
  gem "chromedriver-helper"
  gem "database_cleaner"
  gem "generator_spec"
  gem "launchy"
  gem "poltergeist"
  gem "rspec-rails", "~> 3"
  gem "rspec-retry"
  gem "selenium-webdriver", "<3.0.0"
end
