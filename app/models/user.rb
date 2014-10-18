class User < ActiveRecord::Base
  include BCrypt

  validates :password, length: { minimum: 6 }
  has_many :surveys

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end
end
