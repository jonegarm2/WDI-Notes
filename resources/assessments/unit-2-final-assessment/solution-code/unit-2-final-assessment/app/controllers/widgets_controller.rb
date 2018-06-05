class WidgetsController < ApplicationController

  def index
    @widgets = Widget.all
    @widget = Widget.new
  end

  def create
    widget = Widget.new(params.require(:widget).permit(:description, :quantity))
    widget.save
    redirect_to root_path
  end
  
  def destroy
    widget = Widget.find(params[:id])
    widget.destroy
    redirect_to root_path
  end

end