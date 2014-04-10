class HomeController < ApplicationController

	def dashboard
		@dashboard_presenter = DashboardPresenter.new(view_context)
	end

end