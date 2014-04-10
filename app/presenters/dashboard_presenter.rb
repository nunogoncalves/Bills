class DashboardPresenter < Presenter

	def tenants
		@tenants ||= Tenant.all.map { |tenant| TenantPresenter.new(h, tenant)}
	end

end