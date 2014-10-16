user = User.create(username: Faker::Internet.user_name,
            password: Faker::Internet.password
            )

survey = user.surveys.create(title: Faker::Lorem.sentence)

2.times do
  question = survey.questions.create(question: Faker::Lorem.sentence)
  4.times { question.choices.create(choice: Faker::Lorem.sentence) }
end
