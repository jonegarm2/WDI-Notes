puts "Hello, I am C-3P0, human-cyborg relations."

print "\nAnd your name is? "
name = gets.chomp

puts

if name == "Obi-Wan Kenobi"
  puts "Oh, marvelous! Simply marvelous! Say hello to R2-D2; he's been looking all over for you!"
else
  puts "It is a pleasure to meet you, #{name}."
  print "I'm terribly sorry for prying,
    but you don't by any chance go by the alias of Obi-Wan Kenobi, do you? "
end
answer = gets.chomp[0].downcase

puts

if answer == "y"
  puts "Oh, marvelous! Simply marvelous! Say hello to R2-D2; he's been looking all over for you!"
elsif answer == "n"
  puts "I've really enjoyed speaking with you, #{name}, 
    but if you'll please excuse me, I have to help my friend find 
    someone named Obi-Wan Kenobi."
  puts "\nWell R2, I suppose we'll just have to keep looking. 
    R2-D2: (Agreeable droid noises)"
  else
    puts "I'm sorry, I didn't hear you correctly. I only respond to \"yes\" or \"no\"..."
    puts "\nWell R2, I suppose we'll just have to keep looking. 
      R2-D2: (Agreeable droid noises)"
puts 'other'
end