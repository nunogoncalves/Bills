class DashboardPresenter < Presenter

	def tenants
		@tenants ||= Tenant.all.map { |tenant| TenantPresenter.new(h, tenant)}
	end

	def possible_bills
		@list ||= ["water", "gas", "power"]
	end

end