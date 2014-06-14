class DashboardPresenter < Presenter

	def tenants
		@tenants ||= tenants_still_in.map { |tenant| TenantPresenter.new(h, tenant)}
	end

	def possible_bills_names
		possible_bills.map{|x| x[0]}
	end

	def possible_bills
		@list ||= {"water" => "#03BAF6", "gas" => "#CC0000", "power" => "#8bbc21"}
	end

	private

	def tenants_still_in
		Tenant.where("date_out is null or date_out > '2014-05-02'")
	end

end