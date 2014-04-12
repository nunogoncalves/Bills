class DashboardPresenter < Presenter

	def tenants
		@tenants ||= Tenant.all.map { |tenant| TenantPresenter.new(h, tenant)}
	end

	def possible_bills_names
		possible_bills.map{|x| x[0]}
	end

	def possible_bills
		@list ||= {"water" => "#2f7ed8", "gas" => "#CC0000", "power" => "#8bbc21"}
	end

end