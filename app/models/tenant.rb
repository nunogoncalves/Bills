class Tenant < Person

  attr_accessible :name, :date_in, :date_out, :color, :email

	def still_in?
    date_out.blank? || date_out > DateTime.now
	end

	def was_there_this_day?(day)
  	if day < date_in.to_date
  		return false
  	else
  		if date_out.nil?
  			return true
  		else
  			return day <= date_out.to_date
	  	end
	  end
	end

end