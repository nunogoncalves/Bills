# encoding: UTF-8
class TenantPresenter < Presenter

	presents :tenant

	def initialize(view_controller, tenant)
		super(view_controller, tenant)
	end

	def name
		tenant.name
	end

	def entered_on
		I18n.l(tenant.date_in, format: :common)
	end

	def exited_on
		tenant.still_in? ? I18n.l(tenant.date_out, format: :common) : _t("home.people_date_info.already_out")
	end

	def was_there_this_day?(date)
		tenant.was_there_this_day?(date)
	end

	def color_for_date(date)
		was_there_this_day?(date) ? tenant.color : 'white'
	end

end