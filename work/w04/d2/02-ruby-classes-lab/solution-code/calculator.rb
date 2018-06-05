class Calculator
  attr_writer :num1, :num2

  def add
    return "Both num1 and num2 must be set first!" unless @num1 && @num2
    "#{@num1} plus #{@num2} equals #{@num1 + @num2}"
  end

  def subtract
    return "Both num1 and num2 must be set first!" unless @num1 && @num2
    "#{@num1} minus #{@num2} equals #{@num1 - @num2}"
  end

  def multiply
    return "Both num1 and num2 must be set first!" unless @num1 && @num2
    "#{@num1} times #{@num2} equals #{@num1 * @num2}"
  end

  def divide
    return "Both num1 and num2 must be set first!" unless @num1 && @num2
    "#{@num1} divided by #{@num2} equals #{@num1 / @num2.to_f}"
  end
end
