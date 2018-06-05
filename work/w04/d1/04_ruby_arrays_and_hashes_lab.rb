# Ruby Lab: Arrays and Hashes

=begin

Complete the exercises below.

I recommend that you write these functions in VS Code. To execute the code in this file, navigate
to the directory that holds this file and execute the file.

Once you have completed writing these functions YOU SHOULD TEST THEM! Invoke these
methods on sample inputs to test that they return the correct value.

=end


# Exercises


# Exercise 1. ------------------------------------------------------------------------------------

# Write a method named put_arr_elems that logs out each element in an array. You 
# should use the puts method to do this.

# WRITE CODE HERE

# Uncomment the line below to test out the function
# put_arr_elems([1,2,3,4]) # This should log out 1 then 2 then 3 then 4


# Exercise 2. ------------------------------------------------------------------------------------

# Write a method named last that returns the last element in an array.

# WRITE CODE HERE

# Uncomment the line below to test out the function
# last([1,2,3,4]) # returns 4

# Uncomment test below
if (puts_last([1,2,3,4]) != 4)
    raise 'puts_last should return the last element in an array'
end


# Exercise 3. ------------------------------------------------------------------------------------

# Write a method named keys that returns an array with each key in the hash in it.

example_hash = {javascript: 'language mainly used for client-side scripting',
                ruby: 'language popularized due to Ruby on Rails',
                whitespace: 'esoteric programming language that ignores everything but whitespaces'}

# WRITE CODE HERE

# Uncomment the line below to test out the function
# keys example_hash

# if keys(example_hash) != [:javascript, :ruby, :whitespace]
#     raise 'puts_key should return a list of all keys'
# end


# Exercise 4. ------------------------------------------------------------------------------------

# Write a method named puts_value that puts (i.e., logs out) each value in a hash.

# WRITE CODE HERE

# Uncomment the line below to test out the function.
# puts_value example_hash


# Exercise 5. ------------------------------------------------------------------------------------

# Write a method named sum that computes and returns the sum of integers in an array.

# Uncomment the line below to test out the function]
# puts sum([1,2,3]) #=> 6


# Exercise 6. ------------------------------------------------------------------------------------

# Write a function that reverses a string. Name this function reverse_string.
# For example, reverse_string("abc") should return "cba". It should take a string as
# input and return the string in reverse.

# Uncomment the line below to test out the function.
# puts reverse_string("abc") #=> "cba"


# Exercise 7. ------------------------------------------------------------------------------------

# Write a method named charFrequency that when given a string returns a hash where each key is
# a character in a string and each value is the frequency that character
# occurs in the string. For example the string "aabc" should return
# {a: 2, b: 1, c: 1}
# Hint: Use the count method

# Uncomment the line below to test out the function.
# puts charFrequency("aabc") #=> {"a" => 2, "b" => 1, "c" => 1}


# Exercise 8. ------------------------------------------------------------------------------------

# Write a method that takes an array of numbers in. Your method should
# return the third greatest number in the array. You may assume that
# the array has at least three numbers in it.


# Uncomment the line below to test out the function.
# puts third_greatest([5, 3, 7]) == 3 #=> should be true
# puts third_greatest([5, 3, 7, 4]) == 4 #=> should be true
# puts third_greatest([2, 3, 7, 4]) == 3 #=> should be true


# Exercise 9. ------------------------------------------------------------------------------------

# Write a method that takes in two numbers. Return the greatest
# integer that evenly divides both numbers. You may wish to use the
# `%` modulo operation.
#

def greatest_common_factor(number1, number2)
end

# These are tests to check that your code is working. After writing
# your solution, they should all print true.

puts("\nTests for #greatest_commmon_factor")
puts("===============================================")
    puts(
      'greatest_common_factor(3, 9) == 3: ' +
      (greatest_common_factor(3, 9) == 3).to_s
    )
    puts(
      'greatest_common_factor(16, 24) == 8: ' +
      (greatest_common_factor(16, 24) == 8).to_s
    )
    puts(
      'greatest_common_factor(3, 5) == 1: ' +
      (greatest_common_factor(3, 5) == 1).to_s
    )
puts("===============================================")


# Exercise 10. ------------------------------------------------------------------------------------

# Write a method that takes in an integer (greater than one) and
# returns true if it is prime; otherwise return false.
#
# You may want to use the `%` modulo operation. `5 % 2` returns the
# remainder when dividing 5 by 2; therefore, `5 % 2 == 1`. In the case
# of `6 % 2`, since 2 evenly divides 6 with no remainder, `6 % 2 == 0`.
# More generally, if `m` and `n` are integers, `m % n == 0` if and only
# if `n` divides `m` evenly.
#
# You would not be expected to already know about modulo for the
# challenge.

def is_prime?(number)

end

# These are tests to check that your code is working. After writing
# your solution, they should all print true.

puts("\nTests for #is_prime?")
puts("===============================================")
    puts('is_prime?(2) == true: ' + (is_prime?(2) == true).to_s)
    puts('is_prime?(3) == true: ' + (is_prime?(3) == true).to_s)
    puts('is_prime?(4) == false: ' + (is_prime?(4) == false).to_s)
    puts('is_prime?(9) == false: ' + (is_prime?(9) == false).to_s)
puts("===============================================")


# Exercise 11. ------------------------------------------------------------------------------------

# Write a method called longest_palindrome that takes in a string of lowercase letters (no
# uppercase letters, no repeats). Consider the *substrings* of the
# string: consecutive sequences of letters contained inside the string.
# Find the longest such string of letters that is a palindrome.
#
# Note that the entire string may itself be a palindrome.
#
# You may want to use Array's `slice(start_index, length)` method,
# which returns a substring of length `length` starting at index
# `start_index`:
#
#     "abcd".slice(1, 2) == "bc"
#     "abcd".slice(1, 3) == "bcd"
#     "abcd".slice(2, 1) == "c"
#     "abcd".slice(2, 2) == "cd"
#

def longest_palindrome(string)
    
end

# These are tests to check that your code is working. After writing
# your solution, they should all print true.

puts("\nTests for #longest_palindrome")
puts("===============================================")
    puts(
      'longest_palindrome("abcbd") == "bcb": ' +
      (longest_palindrome('abcbd') == 'bcb').to_s
    )
    puts(
      'longest_palindrome("abba") == "abba": ' +
      (longest_palindrome('abba') == 'abba').to_s
    )
    puts(
      'longest_palindrome("abcbdeffe") == "effe": ' +
      (longest_palindrome('abcbdeffe') == 'effe').to_s
    )
puts("===============================================")


# Exercise 12. ------------------------------------------------------------------------------------

# Write a method that takes in a string and an array of indices in the
# string. Produce a new string, which contains letters from the input
# string in the order specified by the indices of the array of indices.

def scramble_string(string, positions)
end

# These are tests to check that your code is working. After writing
# your solution, they should all print true.

puts("\nTests for #scramble_string")
puts("===============================================")
    puts(
      'scramble_string("abcd", [3, 1, 2, 0]) == "dbca": ' +
      (scramble_string("abcd", [3, 1, 2, 0]) == "dbca").to_s
    )
    puts(
      'scramble_string("markov", [5, 3, 1, 4, 2, 0]) == "vkaorm"): ' +
      (scramble_string("markov", [5, 3, 1, 4, 2, 0]) == "vkaorm").to_s
    )
puts("===============================================")


# BONUS PROBLEMS


# Exercise 13. ------------------------------------------------------------------------------------

=begin

Implement a method called merge which accepts two arrays that are sorted in asending order
and returns a single array in which all the elements are sorted. 

For example, 

    merge([1,2,3], [4,5,6]) #=> [1,2,3,4,5,6]
    merge([3,3,5,7], [4,5,6]) #=> [3,3,4,5,6,7]

# Exercise 14. ------------------------------------------------------------------------------------

Exercise 10: Using the merge algorithm you wrote above implement Mergesort. Mergesort is an example of
a sorting algorithm that accepts an array of integers as an argument and returns an array with all integers
sorted in ascending order. Mergesort uses the divide-and-conquer approach to sort an array. Before starting
this problem please read about Mergesort here: https://www.codingeek.com/algorithms/merge-sort-algorithm-explanation-implementation-and-complexity/

For example, 

    mergeSort([6,2,4,5,7,10]) #=> [2,3,4,5,6,7,10]

# Exercise 15. ------------------------------------------------------------------------------------

Exercise 15: Let's consider an array of the numbers 1 to n. If n=5 then the input array would be

                            [1,2,3,4,5]

Write a function that when given an array of integers from 1 to n with one number repeating determines
which number is repeated. 

=end

=begin

Some exercises were taken from here: https://prepwork.appacademy.io/coding-test-1/practice-problems/

=end
