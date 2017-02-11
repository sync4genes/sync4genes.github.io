require 'rubygems'
require 'sinatra'
require 'json'
require 'rack/recaptcha'
require 'pony'

use Rack::Recaptcha, :public_key => 'YOUR_PUBLIC_KEY_FROM_RECAPTCHA', :private_key => YOUR_PRIVATE_KEY_FROM_RECAPTCHA'
helpers Rack::Recaptcha::Helpers

require './application'
run Sinatra::Application