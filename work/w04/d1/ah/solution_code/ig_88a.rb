def gunfight
  20.times {puts "(zap)"}
  rand(2) == 0
end

while true
  print "\nFreeze! Who are you? "
  inp = gets.chomp
  if inp == "Han Solo"
    puts "\nYou are mine at last, Solo!"
    if gunfight
      puts "Solo is caught! Jabba the Hutt will pay handsomely..."
      break
    else
      puts "I'll get you next time, Solo!"
    end
  elsif inp == "(zap)"
    gunfight
    break
  else
    puts "You must die! (zap zap kaboom)"
  end
end