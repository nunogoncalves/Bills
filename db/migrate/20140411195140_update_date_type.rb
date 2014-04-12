class UpdateDateType < ActiveRecord::Migration
  def up
  	change_column :people, :date_in,  :date
  	change_column :people, :date_out,  :date
  end

  def down
  	change_column :people, :date_in,  :datetime
  	change_column :people, :date_out,  :datetime
  end
end
