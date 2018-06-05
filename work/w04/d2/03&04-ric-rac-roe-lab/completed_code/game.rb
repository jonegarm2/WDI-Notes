class Game

  def initialize
    puts "\n\n\nL e t s   P l a y   R i c - R a c - R o e !\n\n"
    @scores = {x: 0, o: 0, t: 0}
    print "How many wins to play to? "
    @num_wins = gets.chomp.to_i
  end

  def play
    until @scores[:x] == @num_wins || @scores[:o] == @num_wins do
      new_game
      until @winner do
        print_board
        until get_move do
          puts "Bogus move!"
        end
        @board[@move] = @turn
        @turn = @turn == :x ? :o : :x
        @winner = get_winner
      end
      print_winner
      print_score
    end
  end

  def get_move
    puts "\nPlayer #{@turn.to_s.upcase}'s Turn'"
    print "Enter a move (B2, C3, etc): "
    @move = gets.chomp.downcase.to_sym
    @board.has_key?(@move) && @board[@move].nil?
  end

  def get_winner
    win_combos = [
      [:a1, :b1, :c1], [:a2, :b2, :c2], [:a3, :b3, :c3], [:a1, :b2, :c3],
      [:a1, :a2, :a3], [:b1, :b2, :b3], [:c1, :c2, :c3], [:c1, :b2, :a3]
    ]
    winner = nil
    win_combos.each do |combo|
      return @board[combo[0]] if @board[combo[0]] && @board[combo[0]] == @board[combo[1]] && @board[combo[0]] == @board[combo[2]]
    end
    @board.values.include?(nil) ? nil : :t
  end

  def print_score
    puts "\n\nSCORE:"
    puts "Player X: #{@scores[:x]}   Player O: #{@scores[:o]}   Ties: #{@scores[:t]}\n\n"
  end

  def print_board
    puts "\n\n"
    puts "    A   B   C"
    puts "1)  #{xo(:a1)} | #{xo(:b1)} | #{xo(:c1)}  "
    puts "   -----------"
    puts "2)  #{xo(:a2)} | #{xo(:b2)} | #{xo(:c2)}  "
    puts "   -----------"
    puts "3)  #{xo(:a3)} | #{xo(:b3)} | #{xo(:c3)}  "
    puts "\n\n"
  end

  def print_winner
    print_board
    2.times { puts }
    if @winner == :t
        puts "Another TIE!"
        @scores[:t] += 1
    elsif @winner == :x
        puts "Congrats Player X!"
        @scores[:x] += 1
    elsif @winner == :o
        puts "Congrats Player O!"
        @scores[:o] += 1
    end
    puts "\n"
  end

  def xo(cell)
    @board[cell] ? @board[cell].to_s.upcase : ' '
  end

  def new_game
    @board = {
      a1: nil, b1: nil, c1: nil,
      a2: nil, b2: nil, c2: nil,
      a3: nil, b3: nil, c3: nil
    }
    @turn = :x
    @winner = nil
  end

end