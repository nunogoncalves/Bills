class Person < ActiveRecord::Base
  attr_accessible :gender

  as_enum :gender_cd, column_name: :gender
end