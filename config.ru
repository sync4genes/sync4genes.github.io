require 'rubygems'
require 'sinatra'
require 'json'
require 'rack/recaptcha'
require 'pony'

use Rack::Recaptcha, :public_key => '6LecUBUUAAAAAHQIWeMjN6W8cyOsSEmdqc-l_Tg0', :private_key => '6LecUBUUAAAAAL_OScUjFrpU2KETzXWmmRUq3MDc'
helpers Rack::Recaptcha::Helpers

require './application'
run Sinatra::Application