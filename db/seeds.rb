user = User.create(username: Faker::Internet.user_name,
            password: Faker::Internet.password
            )


5.times do
  survey = user.surveys.create(title: Faker::Lorem.sentence)
  3.times do
    question = survey.questions.create(question: Faker::Lorem.sentence)
    4.times { question.choices.create(choice: Faker::Lorem.sentence) }
  end
end
