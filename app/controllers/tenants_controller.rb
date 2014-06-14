class TenantsController < ApplicationController
  def edit
    @tenant = Tenant.find(params[:id])
  end

  def update
    @tenant = Tenant.find(params[:id])
    if @tenant.update_attributes(params[:tenant])
      redirect_to '/'
    else
      render :edit
    end
  end

  def new
    @tenant = Tenant.new
  end

  def create
    @tenant = Tenant.new(params[:tenant])
    if @tenant.save
      redirect_to '/'
    else
      render :new
    end
  end
end