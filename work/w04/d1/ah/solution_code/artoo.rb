puts "(beep-boop whrrrrrr bleep)"
puts "Welcome to the R2D2 calculator!"

begin
  puts "\nPlease enter which operator you would like to use ('+', '-', '*', '/')."
  print "Enter 'q' to exit: "
  op = gets.chomp.downcase
  if ['+', '-', '*', '/'].include? op
    print "Enter your first operand: "
    num1 = gets.chomp.to_f
    print "Enter your second operand: "
    num2 = gets.chomp.to_f
    expression = "#{num1} #{op} #{num2}"
    result = eval expression
    puts "\nThe solution to #{expression} is #{result}."
  else
    puts "\n(whheeaaarrrrr! beee-ooohhh) You did not enter a viable operator!"
  end
end until op == "q" 