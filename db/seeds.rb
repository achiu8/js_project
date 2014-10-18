user = User.create(username: "user",
                   password: "test"
                  )


5.times do
  survey = user.surveys.create(title: Faker::Commerce.product_name)
  3.times do
    question = survey.questions.create(question: Faker::Lorem.sentence + "?")
    4.times { question.choices.create(choice: Faker::Commerce.color) }
  end
end
