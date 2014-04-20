# encoding: UTF-8
class TenantPresenter < Presenter

	presents :tenant

	def initialize(view_controller, tenant)
		super(view_controller, tenant)
	end

	def id
		tenant.id
	end

	def name
		tenant.name
	end

	def email
		tenant.email
	end

	def entered_on
		# I18n.l(tenant.date_in, format: :common)
		tenant.date_in
	end

	def exited_on
		# tenant.still_in? ? I18n.l(tenant.date_out, format: :common) : _t("home.people_date_info.already_out")
		tenant.still_in? ? tenant.date_out : _t("home.people_date_info.already_out")
	end

	def really_exited_on
		#I18n.l(tenant.date_out, format: :common)
		tenant.date_out
	end

	def was_there_this_day?(date)
		tenant.was_there_this_day?(date)
	end

	def color_for_date(date)
		was_there_this_day?(date) ? tenant.color : 'white'
	end

	def date_in_in_millis
		tenant.date_in.to_datetime > 3.months.ago ? tenant.date_in.to_datetime.to_i * 1000 : 3.months.ago.to_i * 1000
	end

	def date_out_in_millis
		tenant.still_in? ? DateTime.now.to_i * 1000 : tenant.date_out.to_datetime.to_i * 1000
	end

	def color
		tenant.color
	end

end